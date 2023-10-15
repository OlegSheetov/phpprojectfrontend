import React , {useMemo, useState, useEffect, useContext} from "react";
import "./AnquetteDetailed.css";
import { useParams, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import CommentsComponent from '../../components/CommentsComponent/CommentsComponent';
import Cookie from 'js-cookie';
import UsersContext from '../../App.js';

export default function AnquetteDetailed(props) {
    const { key } = useParams();
    let users = useContext(UsersContext);
    let [user , setUser] = useState({})

    // Ошибка в том что при перезагрузке страницы компонент теряет users и выдает ошибку 
    // Решение - использовать React-context или Redux , но проще первое.

    function getUser(id){ 
        return users.find((el) => el.id == id)
    }
    useEffect(()=>{
        setUser(getUser(key))
    },[])

        return (
            <>
                <Container className="AnquetteDetailed">
                    <Link to={-1} className="Link">
                        &#8592; Back
                    </Link>
                    <h1>{user.name}</h1>
                    <p>{user.description}</p>
                    <CommentsComponent AnquetteID={key}/>
            </Container>
        </>
    );
}
