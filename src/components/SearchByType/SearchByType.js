import React , { useRef , useState, useEffect} from 'react';
import './SearchByType.css'
import {Link} from 'react-router-dom';
import {Card, Button, Stack} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import AnquetteCard from '../../components/AnquetteCard/AnquetteCard.js'
export default function SearchByType(props){ 
    const [SortedUsers, setSortedUsers] = useState(props.users);
    const MBTIRef = useRef('');

    
    /**
     * GetUsersByType.
     *   Сортирует пользователей по типу и выводит на экран.
     */
    function GetUsersByType(){
        setSortedUsers(props.users.filter((el)=>el.mbtitype == MBTIRef.current.value ));
    }


    return(
        <div className='SearchByType mt-5'>
            <Container>
                <Form.Group className="mb-3 ">
                    <Stack direction='horizontal' gap={3}>
                        <Form.Select
                            aria-label='Ваш MBTI тип'
                            ref={MBTIRef}
                            required
                        >
                            <option value="INTJ">INTJ "Стратег"</option>
                            <option value="INTP">INTP "Ученый"</option>
                            <option value="ENTJ">ENTJ "Коммандир"</option>
                            <option value="ENTP">ENTP "Полемист"</option>
                            <option value="INFJ">INFJ "Активист"</option>
                            <option value="INFP">INFP "Посредник"</option>
                            <option value="ENFJ">ENFJ "Тренер"</option>
                            <option value="ENFP">ENFP "Борец"</option>
                            <option value="ISTJ">ISTJ "Администратор"</option>
                            <option value="ISFJ">ISFJ "Защитник"</option>
                            <option value="ESTJ">ESTJ "Менеджер"</option>
                            <option value="ESFJ">ESFJ "Консул"</option>
                            <option value="ISTP">ISTP "Виртуоз"</option>
                            <option value="ISFP">ISFP "Артист"</option>
                            <option value="ESTP">ESTP "Делец"</option>
                            <option value="ESFP">ESFP "Развлекатель"</option>
                        </Form.Select>
                        <Button 
                            variant='success'
                            onClick={GetUsersByType}
                        >Поиск</Button>
                    </Stack>
                        <Form.Label className="text-muted">
                            <a 
                                href="https://www.16personalities.com/ru"
                                target="_blank"
                            >Пройти тест бесплатно</a>
                        </Form.Label>
                </Form.Group>
                
                <AnquetteCard users={SortedUsers} />
                
            </Container>
        </div>
    )
}

