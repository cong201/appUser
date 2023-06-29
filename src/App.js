import './App.css';
import React, { useState } from 'react';
import Header from './components/Header'
import TableUser from './components/TableUser';
import ModalAddUser from './components/ModalAddUser';
import { ToastContainer, toast } from 'react-toastify';

function App() {


  return (
    <>
      <div>
        <Header />
        <div className='mt-20 flex justify-between mx-40'>
          <span>List User</span>
          <button>Add new User</button>
        </div>

        <TableUser />
        <ModalAddUser />
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
