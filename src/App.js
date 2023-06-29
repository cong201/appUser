import './App.css';
import React from 'react';
import Header from './components/Header'
import TableUser from './components/TableUser';
import ModalAddUser from './components/ModalAddUser';
import { ToastContainer, toast } from 'react-toastify';

function App() {

  return (
    <>
      <div>
        <Header />

        <TableUser />

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
