import React , { useState, useEffect} from "react";
import back from '../../icons8-undo-50.png'
import "./AnquetteDetailed.css";
import { useParams, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import CommentsComponent from '../../components/CommentsComponent/CommentsComponent';
import Cookie from 'js-cookie';
import Button from 'react-bootstrap/Button';

export default function AnquetteDetailed(props) {
    const { key } = useParams();
    let [user , setUser] = useState({})



    function getUser(id){ 
        //  Если в сессионном хранилище нет данных , то используй проп. 
        //  Такой вот план Б.
        if (sessionStorage.Users == undefined){
            let users = props.users;
            return users.find((el) => el.id == id)
        }else { 
            let users = JSON.parse(sessionStorage.Users);
            return users.find((el) => el.id == id)
        }

    }


    useEffect(()=>{
        setUser(getUser(key));
    },[])

        return (
            <>
                <Container className="AnquetteDetailed">
                    <Link to={-1} className="Link">
                        <img src={back} alt="back" />
                    </Link>
                    <h1>{user.name}</h1>
                    <h4>[{user.mbtitype}]</h4>
                    <p>{user.description}</p>
                    <CommentsComponent 
                        AnquetteID={key} 
                    />
            </Container>
        </>
    );
}
