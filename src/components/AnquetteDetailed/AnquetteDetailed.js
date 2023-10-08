import React , {useMemo, useState, useEffect} from "react";
import "./AnquetteDetailed.css";
import { useParams, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import CommentsComponent from '../../components/CommentsComponent/CommentsComponent';
import Cookie from 'js-cookie';



export default function AnquetteDetailed(props) {
    const { key } = useParams();
    let [user , setUser] = useState({})

    useEffect(()=>{
        setUser(props.getUser(key))
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
