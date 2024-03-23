import React , {useEffect, useState, useReducer } from 'react';
import './AdminPanel.css';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate} from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import ModerateList from '../ModerateList/ModerateList.js';
import Fetch from '../../../helpers/fetch.js';
import Cookie from 'js-cookie';
export default function AdminPanel(){ 
    const [show, setShow]= useState(false);
    const HandleClose = () => setShow(false);
    const HandleShow = () => setShow(true);
    const [ list , setList ] = useState([]);
    const navigate = useNavigate();
    const [UpdateValue, Update] = useReducer(x=> x+1, 0);



    // Оно работает. По этому не трогаю.
    function PutNewPourtion(){ 
        Fetch(
            "GET",
            undefined, 
            (json)=> {
                function onlyNew(el){return !list.includesObj(el)}
                setList([...list , ...json.filter(onlyNew)]);
            }
        )
    }


    function CheckWhatYouIsAdmin(){
        // ТУТ ДОЛЖЕН БЫТЬ ЗАПРОС НА СЕРВЕР С ЛОГИНОМ И ПАРОЛЕМ АДМИНА. 
        // ЕСЛИ ЧТО-ТО НЕ ТАК ОТПРАВЛЯТЬ НА ЛОГИН СКРИН.
        if(!Cookie.get('Admin')){
            navigate('/AdminPanelLoginScreen');
        }else { 
            const Admindata=JSON.parse(Cookie.get('Admin'));
            Fetch("POST",
                {  
                    __method:'CheckWhatYouIsAdmin',
                    AdminLogin: Admindata.AdminLogin,
                    AdminPassword: Admindata.AdminPassword,
                }, 

                (json)=>{ 
                    if(json.response === false){ 
                        navigate('/AdminPanelLoginScreen');
                    }
                }
            )
        }
    }

    // Удаляет аккаунт и все его данные в кукки.
    function AdminDeleteAnqueete(id , name) { 
        const AdminData=JSON.parse(Cookie.get('Admin'));
        console.log(AdminData)
        Fetch(
            "POST", 
            {
                __method: 'AdminDeleteAnqueete',
                AdminLogin: AdminData.AdminLogin, 
                AdminPassword: AdminData.AdminPassword, 
                UserID: id, 
                UserName: name,
            },
            (json)=>{
                Update();
            })
    }

    useEffect(()=>{
        CheckWhatYouIsAdmin();
        Fetch("GET", undefined,(json)=>{
            setList(json);
            sessionStorage.Users = JSON.stringify(json);
        } )
    }, [UpdateValue]);


    return(
        <div className='AdminPanel'>
            <Button
                onClick={HandleShow}
                variant='light'
                className='MenuButton fixed-top'
            >Menu</Button>
            <Offcanvas show={show} onHide={HandleClose}>
             <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menu</Offcanvas.Title>
                 </Offcanvas.Header>
                     <Stack gap={3} className='d-flex justify-content-center align-items-center'>
                         <Button className='w-75' >Анекты</Button>
                             <Button className='w-75'>Комменты </Button>
                             <Button className='w-75'variant="danger">Выход</Button>
                     </Stack>
                </Offcanvas>
                <Container>
                    <ModerateList 
                        list={list}
                        Update={Update}
                        PutNewPourtion={PutNewPourtion}
                        AdminDeleteAnqueete={AdminDeleteAnqueete}
                    />
                    </Container>
        </div>
    )
}

