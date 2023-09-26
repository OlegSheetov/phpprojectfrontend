import React, { useEffect, useState } from "react";
import "./CommentsComponent.css";
import Card from 'react-bootstrap/Card';
export default function CommentsComponent(props) {
    let [comments, setComments] = useState([]);
    function fetchComments() {
        let payload = new FormData(); 
        payload.append('__method', 'GetComments');
        payload.append('AnquetteID' , props.AnquetteID);

        fetch('http://localhost:80/backend/index.php', {method: 'POST' , body: payload})
            .then(response => response.text())
            .then(result => JSON.parse(result))
            .then(json=>setComments(json))
    }
    useEffect(() => {
        fetchComments();
    }, []);

    return (
        <>
            <div className="CommentsComponent">
                {comments.map((item) => (
                    <Card className='mt-2'  key={item.id}>
                       <Card.Body>
                            <Card.Body>
                                <Card.Title className="AnquetteCard_UserName">
                                    {item.AuthorName}
                                </Card.Title>
                                <Card.Text>{item.commentBody}</Card.Text>
                                <Card.Text>{item.timestamp}</Card.Text>
                            </Card.Body>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </>
    );
}
