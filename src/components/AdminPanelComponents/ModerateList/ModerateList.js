import React from 'react';
import './ModerateList.css'
import Card from 'react-bootstrap/Card'
import CommentsComponent from '../../CommentsComponent/CommentsComponent.js';
import ScrollHandler from "../../../helpers/scrollHandler.js"
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import { pencil , trash  } from '../../../helpers/svg.js'
import fetch from '../../../helpers/fetch.js'
import Cookie from 'js-cookie'

export default function ModerateList(props){ 

    function MakeContentEditable(e){
        e.target.contentEditable = true
    }

    function  SendChangedAnquette(e , AnquetteID){ 
         const Title = e.currentTarget.parentElement.parentElement.childNodes[0].firstChild.textContent
         const Description = e.currentTarget.parentElement.parentElement.childNodes[1].textContent
         const Admindata = JSON.parse(Cookie.get('Admin'))

        fetch(
		        "POST", 
                {
		    __method: "AdminChangeAnquette", 
                    AnquetteID: AnquetteID, 
                    AdminLogin: Admindata.Login, 
                    AdminPassword: Admindata.password, 
                    NewName: Title, 
                    NewDescription: Description, 
                 },
                (json)=>{
                    console.log(json)
                }
            );
    }

    return(
        <div className='ModerateList'
            onScroll={(e)=>{
                ScrollHandler(e , props.PutNewPourtion)
            }}
        >
            {props.list.map((item)=>(
                <Card  key={item.id} className='mb-3'>
                    <Card.Body>
                        <Card.Title
                            className='
                                AnquetteCard_UserName
                                d-inline-flex
                                w-100
                            '
                        >
                                <div
                                    onClick={MakeContentEditable}
                                    className='m-2'
                                >{item.name}</div>
                                <div
                                    className='m-2'
                                >[{item.mbtitype}]</div>
                        </Card.Title>
                        <Card.Text
                            onClick={MakeContentEditable}
                        >{item.description}</Card.Text>
                        <InputGroup>
                            <Button
                                variant='success' 
                                title='Change'
                                onClick={SendChangedAnquette}
                            >{pencil}</Button>
                            <Button 
                                variant='danger'
                                title='Delete'
                                onClick={props.AdminDeleteAnquette}
                            >{trash}</Button>
                        </InputGroup>

                        <CommentsComponent 
                            AnquetteID={item.id}   
                            hideSwitch={'show'}
                        />
                    </Card.Body>
                </Card>
            ))}
        </div>
    )
}

