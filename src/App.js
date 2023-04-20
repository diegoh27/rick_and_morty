import './App.css';
import Cards from './components/Cards/Cards';
import Nav from './components/Nav/Nav';
import About from './components/About/About';
import Detail from './components/detail/Detail'
import Form from './components/Form/Form';
import Favorites from './components/Favorites/Favorites';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'


// let api_key = 'bf3d7a6f6a9d.11842c0a6d417507ab9a';
// let url_base = 'https://be-a-rym.up.railway.app/api/character';


function App() {


let location = useLocation()
let [characters, setCharacters] = useState([]);
let [access, setAcces] = useState(false);
let navigate = useNavigate()

const EMAIL = 'diegolancer27@gmail.com'
const PASSWORD = 'Diego1234'

const login = (userData) => {
   if(userData.email === EMAIL && userData.password === PASSWORD){
       setAcces(true);
       navigate('/home');
   }
}
      useEffect(() => {
      !access && navigate('/');
   
    }, [access]);


   let onSearch = (id) =>  {
      
      axios(`http://localhost:3001/rickandmorty/character/${id}`)
      .then(response => response.data)
      .then((data) => {
         if (data.name ) {
            setCharacters((oldChars) => [...oldChars, data])

         } else {
            alert('¡No hay personajes con este ID!');
         }
      });
   }
   
   let onClose = (id) =>{

      
      const characterFilter = characters.filter( character => 
          character.id !== id
            )
          setCharacters(characterFilter)
         
          
         }
    
   let agregar = () => {
      
   let a=1;
   let b=827;
   let n = (a+Math.floor(Math.random()*b));
     
   axios(`http://localhost:3001/rickandmorty/character/${n}`)
      .then(response => response.data)
      .then((data) => {
         if (data.name) {
            setCharacters((oldChars) => [...oldChars, data])

         } else {
            alert('¡No hay personajes con este ID!');
         }
      });
    }

   return (

      <div className='App'>
        {
         location.pathname !== '/' ?
         <Nav onSearch = {onSearch} agregar = {agregar}/>
         :
         null
        }
         
        
      <Routes>
         
         <Route path = '/' element = {<Form login = {login} EMAIL={EMAIL} PASSWORD={PASSWORD} />}/>
         <Route path = '/home' element = {<Cards characters={characters} onClose = {onClose} /> } />
         <Route path = '/about' element = {<About/>} />
         <Route path = '/detail/:id' element = {<Detail/> } />
         <Route path='/favorites' element = {<Favorites/>}/>
      </Routes>
         

      </div>
   );
}

export default App;
