import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { useEffect, useState } from "react"
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
    axios.defaults.headers.common['Authorization'] = 'seuTokenDeAcessoNoHUB';
    const [DATA , setDATA ] = useState([]);
    const [id, setId]=useState(1);

    useEffect(()=>{
        const promise = axios.get('https://mock-api.driven.com.br/api/v8/cineflex/movies');
        promise.then( resposta => {
            console.log('DADOS API DO COMPONENTE APP' ,resposta.data);
            setDATA(resposta.data)
        });
        promise.catch((erro)=>console.log(erro));
    
    },[]);

    return (
        <BrowserRouter>
           <NavContainer>CINEFLEX</NavContainer>
           <Routes>
                < Route path='/' element={<HomePage DATA={DATA} setId={setId} />}/>
                < Route path='/seats' element={<SeatsPage  DATA={DATA} />} />
                < Route path = '/sessions' element={<SessionsPage  DATA={DATA} id={id}   />} />
                < Route path='/sucess' element={<SuccessPage DATA={DATA} />} />
            </Routes>
        </BrowserRouter>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
