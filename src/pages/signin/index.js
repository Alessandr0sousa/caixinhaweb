import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './styles.css';

export default function Login() {
    const [login, setLogin] = useState([]);
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');

    useEffect(() => {
        // validacao();
    },[]);
    const validacao = async () => {
        const nome = usuario;
        let newLogin = { nome, senha }
        console.log(newLogin);
        await api.get('/pessoa', newLogin);
    }
    return (
        <div id="form-login">
            <div className="form-group">
                <label className="form-control">Usuario</label>
                <input type="text" name="user" id="user" value={usuario} onChange={e => setUsuario(e.target.value)} />
            </div>
            <div className="form-group">
                <label className="form-control">Senha</label>
                <input type="password" name="senha" id="senha" value={senha} onChange={e => setSenha(e.target.value)} />
            </div>
            <div className="btn" onClick={() => validacao()}>Login</div>
        </div>
    );
}
 