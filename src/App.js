
import React from 'react';
import Header from './components/Header'
import TableUser from './components/TableUser';
import Home from './components/Home';
import Login from './components/Login';
import ModalAddUser from './components/ModalAddUser';
import { ToastContainer, toast } from 'react-toastify';
import { Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <div>
        <Header />
        <Routes>
          <Route path='/' element=<Home /> />
          <Route path='/listusers' element=<TableUser /> />
          <Route path='/login' element=<Login /> />
        </Routes>


        {/* <TableUser /> */}

      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
