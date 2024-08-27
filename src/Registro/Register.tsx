
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import UserForm from './UserForm.tsx';
import './Register.css';

const Register = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
         <div className="registro-container">
            <UserForm /> 
         </div>
        </>
    );
};

export default Register;

