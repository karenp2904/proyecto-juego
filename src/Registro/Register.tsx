
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import UserForm from './UserForm.tsx';


const Register = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
       <UserForm /> 
        </>
    );
};

export default Register;

