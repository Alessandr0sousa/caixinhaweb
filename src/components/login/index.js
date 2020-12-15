import React, { useState, useEffect } from 'react';
import './styles.css';

function Login() {
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');

    useEffect(()=>{
        vaidação();
    });


}