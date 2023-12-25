import React, {useEffect, useState, useRef, useReducer } from "react";
import './CommentsComponent.css';
import { Form, Button , InputGroup , Card} from "react-bootstrap";
import Cookie from 'js-cookie';

export default function CommentsComponent(props) {
    // Ужастный спагетти код. 
    // Надеюсь что его никто не увидит.

    let [comments, setComments] = useState([]);
    let [CommentIDForChange, setCommentIDForChange] = useState('');
    const [UpdateValue, Update] = useReducer(x=> x+1, 0);
    const CommentRef = useRef();
    const SendRef = useRef();
    const ChangeAndSendRef = useRef();
    const ChangeCommentButtonRef = useRef();



   function fetchComments() {
       let payload = new FormData(); 
       payload.append('__method', 'GetAllComments');
       payload.append('AnquetteID' , props.AnquetteID);

       fetch(
           'http://localhost:80/.backend/index.php',
           {method: 'POST' , body: payload}
       )
          .then(response => response.text())
          .then(result => JSON.parse(result))
          .then((json)=>{
              setComments(json);
          })
   }

    function sendNewComment(){ 
        let payload = new FormData();
        payload.append('__method', 'CreateComment');
        payload.append('AnquetteID', props.AnquetteID);
        payload.append('AuthorName', Cookie.get('name'));
        payload.append('CommentBody', CommentRef.current.value);

        fetch(
            'http://localhost:80/.backend/index.php',
            {method: 'POST', body:payload}
        )
           .then(response => response.text())
           .then(result => console.log(result))
           .catch((error)=> console.error(error))
            CommentRef.current.value = '';
            Update();
    }

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
                'http://localhost:80/.backend/index.php',
                {
                    method: 'POST',
                    body:payload
                }
            )
               .then(response => response.text())
                .then((result) => {
                    console.log(result)
                    Update();
                })
               .catch((error)=> console.error(error))
        }
    }

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


    // Change or Update comment 
    function ChangeComment(){ 
        if(confirm('Вы уверены ?')){
            alert('Комментарий изменён!');
            let  payload = new FormData();
            payload.append('__method', 'UpdateComment');
            payload.append('AnquetteID', props.AnquetteID);
            payload.append('CommentID', CommentIDForChange);
            payload.append('AuthorName', Cookie.get('name'));
            payload.append('AuthorLogin', Cookie.get('login'));
            payload.append('AuthorPassword', Cookie.get('password'));
            payload.append('CommentBody' , CommentRef.current.value );

            fetch(
                'http://localhost:80/.backend/index.php',
                {
                    method: 'POST',
                    body:payload
                }
            )
               .then(response => response.text())
                .then((result) => {
                    console.log(result);
                    Update();
                })
               .catch((error)=> console.error(error));

            ChangeAndSendRef.current.className = "d-none"; 
            SendRef.current.className = "btn btn-success";
            ChangeCommentButtonRef.current.disabled = false;
            CommentRef.current.value = '';
            Update();
        }
    }

    function ShowDeleteButton(AuthorName, CommentID){
        if(Cookie.get('name') === AuthorName){
            return (
                <Button 
                    variant='danger'
                    value={CommentID}
                    onClick={()=>{DeleteComment(CommentID)}}
                >Удалить</Button>
            )
        }
    }

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

    function DisableCommentInputIfNotUserRegistered(){
        if(Cookie.get('name')){
            CommentRef.current.disabled = false;
            SendRef.current.disabled = false;
        }else { 
            CommentRef.current.disabled = true;
            SendRef.current.disabled = true;
        }
    }

    useEffect(() => {
        fetchComments();
        DisableCommentInputIfNotUserRegistered();
    }, [UpdateValue]);

    return (
        <>
            <div className="CommentsComponent">
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


