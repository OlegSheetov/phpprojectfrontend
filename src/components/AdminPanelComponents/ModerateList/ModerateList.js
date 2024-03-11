import React from 'react';
import './ModerateList.css'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import CommentsComponent from '../../CommentsComponent/CommentsComponent.js';
import Fetch from '../../../helpers/fetch.js'
import Cookie from 'js-cookie'



export default function ModerateList(props){ 

    // Удаляет аккаунт и все его данные в кукки.
    function AdminDeleteAnqueete(id , name) { 
        const AdminData = JSON.parse(Cookie.get('Admin'));
        Fetch(
            "POST", 
            {
                __method: 'AdminDeleteAnqueete',
                AdminLogin: AdminData.login, 
                AdminPassword: AdminData.password, 
                UserID: id, 
                UserName: name,
            },
            ()=>{
                Update();
            })
    }

    return(
        <div className='ModerateList'>
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
                            ClassName='m-1'
                        > Delete</Button>
                    </Card.Body>
                </Card>
            ))}
        </div>
    )
}

