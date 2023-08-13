
import React from 'react';
import {useParams , Link} from 'react-router-dom';
import './AnquetteDetailed.css'
import Container from 'react-bootstrap/Container'


export default function AnquetteDetailed(props){ 
    const {key} = useParams();
    const currentUser = props.getUser(key);

    return(
        <>
            <Container className='AnquetteDetailed'>
                <Link to={-1} className='Link'>&#8592; Back</Link>
                <h1>{currentUser.name}</h1>
                <p>{currentUser.description}</p>
            </Container>
        </>
    )
}

