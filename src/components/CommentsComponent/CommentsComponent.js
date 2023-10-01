import React, {useEffect, useState, useRef, memo} from "react";
import "./CommentsComponent.css";
import { Form, Button , InputGroup , Card} from "react-bootstrap";
import Cookie from 'js-cookie';


function CommentsComponent(props) {
    let [comments, setComments] = useState([]);
    const CommentRef = useRef();


    function fetchComments() {
        let payload = new FormData(); 
        let result = [];
        payload.append('__method', 'GetComments');
        payload.append('AnquetteID' , props.AnquetteID);

        fetch('http://localhost:80/backend/index.php', {method: 'POST' , body: payload})
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
            'http://localhost:80/backend/index.php',
            {method: 'POST', body:payload}
        )
           .then(response => response.text())
           .then(result => console.log(result))
            .catch((error)=> console.error(error))
            CommentRef.current.value = '';
            fetchComments();
    }
    // Не доделано . Не знаю как взять id коммента
    function DeleteComment(){
        if(confirm('Вы уверены ?')){
            alert('Deleted');
            let payload = new FormData();
            payload.append('__method', 'DeleteComment');
            payload.append('AnquetteID' , props.AnquetteID);
            payload.append('AuthorName' , Cookie.get('name'));
            payload.append('CommentID', item.id );
            console.log(item.id);

        }
    }

    function ShowDeleteButton(AuthorName){ 
        if(Cookie.get('name') === AuthorName){
            return(
                <Button variant='danger'onClick={DeleteComment}>Delete</Button>
            )
        }
    }

    useEffect(() => {
        console.log('Component mounted')
         fetchComments();
    }, []);

    return (
        <>
            <div className="CommentsComponent">
                    <Form>
                        <Form.Text>Комментарии:</Form.Text>
                        <InputGroup>
                            <Form.Control
                                type="textarea"
                                placeholder="Оставьте свой комметарий."
                                ref={CommentRef}
                            />
                            <Button
                                variant="success"
                                onClick={sendNewComment}
                            >
                                Отправить
                            </Button>
                        </InputGroup>
                    </Form>
                {comments.map((item) => (
                    <Card className='mt-2'  key={item.id}>
                            <Card.Body>
                                <Card.Title className="AnquetteCard_UserName">
                                    {item.AuthorName}
                                </Card.Title>
                                <Card.Text>{item.commentBody}</Card.Text>
                                <Card.Text className='text-muted'>
                                    {item.timestamp}
                                </Card.Text>
                                {ShowDeleteButton(item.AuthorName)}
                            </Card.Body>
                    </Card>
                ))}
            </div>
        </>
    );
}


export default memo(CommentsComponent);
