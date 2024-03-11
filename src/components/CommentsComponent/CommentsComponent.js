import React, {useEffect, useState, useRef, useReducer } from "react";
import './CommentsComponent.css';
import { Form, Button , InputGroup , Card} from "react-bootstrap";
import Cookie from 'js-cookie';
import Fetch from '../../helpers/fetch.js'

export default function CommentsComponent(props) {
    // Ужастный код. Надеюсь что его никто не увидит.

    let [comments, setComments] = useState([]);
    let [CommentIDForChange, setCommentIDForChange] = useState('');
    const [UpdateValue, Update] = useReducer(x=> x+1, 0);
    const CommentRef = useRef();
    const SendRef = useRef();
    const ChangeAndSendRef = useRef();
    const ChangeCommentButtonRef = useRef();


    // Извлекает комментарии к определенной анкете. 
       function fetchComments() {
           Fetch('POST', 
               { __method: 'GetAllComments', AnquetteID: props.AnquetteID },
                (json)=>{ setComments(json) }
               )
       }
    
    // Отправляет новый коммент к текущей анкете. 
    // Просто упаковывает все данные и отправляет их на сервер.
    function sendNewComment(){ 
            Fetch('POST',
                { __method: 'CreateComment',
                    AnquetteID: props.AnquetteID,
                    AuthorName: Cookie.get('name'),
                    CommentBody: CommentRef.current.value
                },
                (json)=>{
                    setComments(json)
                }
            )
            CommentRef.current.value = '';
            Update();
    }

    //Просто удаляет коммент.
    //Принимает ID комментария. Такой прием нужен для использования функции в JSX 
    //коде . 
    //
    //
    //Понимаю что не так красиво как могло бы быть , но оно по крайней мере работает. 
    //А если работает то не трогай. 
    //
    //P.S: Уже питался рефактрорить, и уже ломал.
    function DeleteComment(CommentID){
        if(confirm('Вы уверены ?')){
            alert('Удалено.');
                   let payload = new FormData();
                   payload.append('__method', 'DeleteComment');
                   payload.append('AnquetteID' , props.AnquetteID);
                   payload.append('CommentID', CommentID );
                   payload.append('AuthorLogin', Cookie.get('login'));
                   payload.append('AuthorName' , Cookie.get('name'));
                   payload.append('AuthorPassword' , Cookie.get('password'));

                   fetch(
                       'http://localhost:80/backend/index.php',
                       {
                           method: 'POST',
                           body:payload
                       }
                   )
                      .then(response => response.text())
                       .then((result) => {
                           Update();
                       })
                      .catch((error)=> console.error(error))

                }
    }


    // Функция хелпер , которая вписывает значения комментария в поле ввода 
    // для его изменения. 
    function SetCurrentCommentToInput(
        CurrentCommentBody,
        CommentID
    ){ 
        setCommentIDForChange(CommentID);
        ChangeCommentButtonRef.current.disabled = true;
        CommentRef.current.value = CurrentCommentBody;
        ChangeAndSendRef.current.className = "btn btn-warning"; 
        SendRef.current.className = "d-none";
    }


    // Изменеяет комментарий 
    // А в конце переключает кнопки для изменения комментария.  
    function ChangeComment(){ 
        if(confirm('Вы уверены ?')){
            alert('Комментарий изменён!');
            //      let  payload = new FormData();
            //      payload.append('__method', 'UpdateComment');
            //      payload.append('AnquetteID', props.AnquetteID);
            //      payload.append('CommentID', CommentIDForChange);
            //      payload.append('AuthorName', Cookie.get('name'));
            //      payload.append('AuthorLogin', Cookie.get('login'));
            //      payload.append('AuthorPassword', Cookie.get('password'));
            //      payload.append('CommentBody' , CommentRef.current.value );

            //      fetch(
            //          'http://localhost:80/backend/index.php',
            //          {
            //              method: 'POST',
            //              body:payload
            //          }
            //      )
            //         .then(response => response.text())
            //          .then((result) => {
            //              console.log(result);
            //              Update();
            //          })
            //         .catch((error)=> console.error(error));

            Fetch("POST", { 
                __method: 'UpdateComment', 
                AnquetteID: props.AnquetteID,
                CommentID: CommentIDForChange, 
                AuthorName: Cookie.get('name'),
                AuthorLogin: Cookie.get('login'),
                AurthoPassword: Cookie.get('password'),
                CommentBody: CommentRef.current.value
            })

            ChangeAndSendRef.current.className = "d-none"; 
            SendRef.current.className = "btn btn-success";
            ChangeCommentButtonRef.current.disabled = false;
            CommentRef.current.value = '';
            Update();
        }
    }

    // Включает кнопку удаления комментария
    function ShowDeleteButton(AuthorName, CommentID){
        if(Cookie.get('name') === AuthorName || Cookie.get('Admin')){
            return (
                <Button 
                    variant='danger'
                    value={CommentID}
                    onClick={()=>{DeleteComment(CommentID)}}
                >Удалить</Button>
            )
        }
    }

    // Включает кнопку изменения комментария.
    function ShowChangeCommentButton(
        AuthorName,
        CurrentCommentBody,
        CommentID
    ){
        if(Cookie.get('name') === AuthorName){
            return (
                <Button 
                    variant='success'
                    value={
                        CurrentCommentBody,
                        CommentID
                    }
                    ref={ChangeCommentButtonRef}
                    onClick={(e)=>{
                        SetCurrentCommentToInput(
                            CurrentCommentBody,
                            CommentID
                        );
                    }
                }
                >Изменить</Button>
            )
        }
    }

    // Отключает поле для ввода комментария и кнопку отправить. 
    function DisableCommentInputIfNotUserRegistered(){
        if(props.hideSwitch != 'hide'){
            if(Cookie.get('name')){
                CommentRef.current.disabled = false;
                SendRef.current.disabled = false;
            }else { 
                CommentRef.current.disabled = true;
                SendRef.current.disabled = true;
            }
        }
    }

    function HideCommentInputField(hideSwitch) { 
        if(hideSwitch === 'hide'){ 
            return ''
        }else { 
            return (
                    <Form>
                        <Form.Text>Комментарии:</Form.Text>
                        <InputGroup>
                            <Form.Control
                                as="textarea"
                                placeholder="Оставьте свой комметарий."
                                ref={CommentRef}
                                disabled={true}
                            />
                            <Button
                                variant="success"
                                onClick={sendNewComment}
                                ref={SendRef}
                            >
                                Отправить
                            </Button>
                            <Button
                                variant="warning"
                                onClick={ChangeComment}
                                ref={ChangeAndSendRef}
                                className='d-none'
                            >
                                Изменить и отправить
                            </Button>
                        </InputGroup>
                    </Form>
            )
        }
    }

    useEffect(() => {
        fetchComments();

        DisableCommentInputIfNotUserRegistered();
    }, [UpdateValue]);

    return (
        <>
            <div className="CommentsComponent">
                {HideCommentInputField(props.hideSwitch)}
                {comments.map((item) => (
                    <Card className='mt-2'  key={item.CommentID}>
                            <Card.Body>
                                <Card.Title className="AnquetteCard_UserName">
                                    {item.AuthorName}{' '}[{item.mbtitype}]
                                </Card.Title>
                                <Card.Text>{item.commentBody}</Card.Text>
                                <Card.Text className='text-muted'>
                                    {item.timestamp}
                                </Card.Text>
                                <InputGroup>
                                    {ShowDeleteButton(item.AuthorName, item.CommentID)}
                                    {ShowChangeCommentButton(
                                        item.AuthorName,
                                        item.commentBody,
                                        item.CommentID
                                    )}
                                </InputGroup>
                            </Card.Body>
                    </Card>
                ))}
            </div>
        </>
    );
}


