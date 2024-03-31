import React, {useRef} from 'react';
import './ModerateList.css'
import Card from 'react-bootstrap/Card'
import CommentsComponent from '../../CommentsComponent/CommentsComponent.js';
import ScrollHandler from "../../../helpers/scrollHandler.js"
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import { pencil , trash  } from '../../../helpers/svg.js'
export default function ModerateList(props){ 
    const NameRef = useRef()
    const DescriptionRef = useRef()

    function  AdminChangeAnquette(){
        console.log('working');


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
                                className='AnquetteCard_UserName'
                                ref={NameRef}
                            >
                                    {item.name}{' '}{item.mbtitype}
                            </Card.Title>
                            <Card.Text
                                ref={DescriptionRef}
                            >{item.description}</Card.Text>
                            <InputGroup>
                                <Button
                                    variant='success' 
                                    title='Change'
                                    onClick={AdminChangeAnquette}
                                >{pencil}</Button>
                                <Button 
                                    variant='danger'
                                    title='Delete'
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

