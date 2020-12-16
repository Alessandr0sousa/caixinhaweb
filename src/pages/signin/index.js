import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './styles.css';

export default function Login() {
    const [login, setLogin] = useState([]);
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');

    useEffect(() => {
        // validacao();
    }, []);
    const validacao = async () => {
        const nome = usuario;
        let newLogin = { nome, senha }
        console.log(newLogin);
        await api.get('/pessoa', newLogin);
    }
    return (
        <div id="form-login">
            <div className="grid">
                <div className="logo">
                    <div>
                        <font>C</font>
                        <div className="title-group2">
                            <span>aixinha</span>
                            <p>Web</p>
                        </div>
                    </div>
                </div>
                <article>
                    <input className="form-control" type="text" name="user" id="user" value={usuario} onChange={e => setUsuario(e.target.value)} placeholder="Usuário" />
                    <input className="form-control" type="password" name="senha" id="senha" value={senha} onChange={e => setSenha(e.target.value)} placeholder="Senha" />
                    <div className="btn" onClick={() => validacao()}>Entrar</div>
                </article>
            </div>
        </div>
    );
}
