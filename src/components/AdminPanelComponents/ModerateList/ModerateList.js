import React from 'react';
import './ModerateList.css'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import CommentsComponent from '../../CommentsComponent/CommentsComponent.js';
import Fetch from '../../../helpers/fetch.js'
import Cookie from 'js-cookie'
import ScrollHandler from "../../../helpers/scrollHandler.js"



export default function ModerateList(props){ 



    return(
        <div className='ModerateList'
            onScroll={(e)=>{
                ScrollHandler(e , props.PutNewPourtion)
            }}
        >
            {props.list.map((item)=>(
                <Card key={item.id} className='mb-3'>
                    <Card.Body>
                        <Card.Title
                            className='AnquetteCard_UserName'
                        >
                                {item.name}{' '}{item.mbtitype}
                        </Card.Title>
                        <Card.Text>{item.description}</Card.Text>
                        <CommentsComponent AnquetteID={item.id} hideSwitch={'show'}/>
                        <Button
                            variant='danger' 
                            className='m-1'
                            value={item.id , item.name}
                        onClick={()=>{
                            props.AdminDeleteAnqueete(item.id , item.name);
                        }}
                        > Delete</Button>
                    </Card.Body>
                </Card>
            ))}
        </div>
    )
}

