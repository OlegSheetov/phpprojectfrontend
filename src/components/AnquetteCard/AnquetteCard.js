import React , { useEffect , useState } from 'react';
import './AnquetteCard.css'
import {Card, Button, Stack} from 'react-bootstrap';
import {Link} from 'react-router-dom';
export default function AnquetteCard(props){ 

    return(
        <div className='AnquetteCard'>
             <h1 className='AnquetteCard_header'>Анкеты</h1>
             <div className='AnquetteCard_List'> 
                 {props.users.map((item)=>(
                     <Link to={`/${item.id}`} className='link' key={item.id}>
                 <Card className='AnquetteCard_card'>
                      <Card.Body>
                            <Card.Title className='AnquetteCard_UserName'>{item.name}</Card.Title>
                            <Card.Text>{item.description}</Card.Text>
                      </Card.Body>
                      </Card>
                 </Link>
             ))}
            </div>
        </div>
    )
}

