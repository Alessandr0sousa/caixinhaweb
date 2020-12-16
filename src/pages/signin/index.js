import React, { useState, useEffect } from 'react';
import './styles.css';

function Login() {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');

    useEffect(() => {
        validacao();
    });
    const validacao = async () => {
        const nome = usuario;
        let newLogin = { nome, senha }
        console.log(newLogin);
    }
    return (
        <div id="form">
            <div className="form-group">
                <label className="form-control">Usuario</label>
                <input type="text" name="user" id="user" value={usuario} onChange={e => setUsuario(e.target.value)} />
                <span>{usuario}</span>
            </div>
            <div className="form-group">
                <label className="form-control">Usuario</label>
                <input type="password" name="senha" id="senha" value={senha} onChange={e => setSenha(e.target.value)} />
                <span>{senha}</span>
            </div>
        </div>
    )

}

export default Login;