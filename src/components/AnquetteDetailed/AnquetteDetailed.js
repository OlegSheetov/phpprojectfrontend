import React , {useState , useEffect , useRef} from "react";
import "./AnquetteDetailed.css";
import { useParams, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Form, Button , InputGroup , Card} from "react-bootstrap";
import CommentsComponent from '../../components/CommentsComponent/CommentsComponent';
import Cookie from 'js-cookie';

export default function AnquetteDetailed(props) {
    const { key } = useParams();
    const currentUser = props.getUser(key);

    const CommentRef = useRef();

    function sendNewComment(){ 
        let payload = new FormData();
        payload.append('__method', 'CreateComment');
        payload.append('AnquetteID', key);
        payload.append('AuthorName', Cookie.get('name'));
        payload.append('commentBody', CommentRef.current.value);

        fetch('http://localhost:80/backend/index.php', {method: 'POST', body:payload})
            .catch((error)=> console.error(error))
        CommentRef.current.value = '';
    }

    return (
        <>
            <Container className="AnquetteDetailed">
                <Link to={-1} className="Link">
                    &#8592; Back
                </Link>
                <h1>{currentUser.name}</h1>
                <p>{currentUser.description}</p>
                <div className="Comments">
                    <Form>
                            <Form.Text>Комментарии:</Form.Text>
                        <InputGroup>
                            <Form.Control
                                type="textarea"
                                placeholder="Оставьте свой комметарий."
                                ref={CommentRef}
                            />
                            <Button variant="success" onClick={sendNewComment}>Отправить</Button>
                        </InputGroup>
                    </Form>
                    <CommentsComponent AnquetteID={key}/>
                </div>
            </Container>
        </>
    );
}
