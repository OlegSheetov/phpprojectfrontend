
import React from 'react';
import './AnquetteCard.css'
import {Card, Button} from 'react-bootstrap';


export default function AnquetteCard(){ 
    return(
        //props.anquettes.map(el => {
        //  return( 
        //     place here code below;
        //  )
        //})
        <>
         <h1 className='App_Header'>Анкеты</h1>
         <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="" />
              <Card.Body>
                <Card.Title className='AnquetteCard_UserName'>User Name</Card.Title>
                <Card.Text>Lorem ipsum bla bla bla </Card.Text>
                <Button variant="primary" variant='success'>Read</Button>
              </Card.Body>
        </Card>
        </>
    )
}

