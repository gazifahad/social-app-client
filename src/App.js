import React from 'react';
import { Route, Routes , Navigate} from 'react-router-dom'
import { Container } from '@material-ui/core';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import OtherRoute from './components/OtherRoute/OtherRoute';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
    const user=JSON.parse(localStorage.getItem('profile'));
    
    return (
       <Container maxWidth='xl'>
           <Navbar/>
           
            <Routes>
          <Route path='/' element={ <Navigate to="posts" /> }>
            
          </Route>
          <Route path='posts' element={<Home/>}/>
          <Route path='posts/search' element={<Home/>}/>
          <Route path='posts/:id' element={<PostDetails/>}/>
         
          <Route path='/auth' element={ <Auth/>}>
          </Route>
          <Route path='*' element={<OtherRoute/>}>
          </Route>
          </Routes>
       </Container>
    );
};

export default App;