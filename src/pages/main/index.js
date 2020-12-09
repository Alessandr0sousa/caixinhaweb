import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import uniqid from 'uniqid';
import uniq from 'uniqid';
import { Link } from "react-router-dom";

import './style.css';

export default function Main() {
    const [pessoa, setPessoa] = useState([]);
    const [nome, setNome] = useState('');
    const [telefone, setTelafone] = useState('');
    const [email, setEmail] = useState('');
    const [grupo, setGrupo] = useState('');

    useEffect(() => {
        loadPessoa();
        loadGrupo();
    }, [])
    const loadPessoa = async () => {
        const response = await api.get('/pessoa');
        setPessoa(response.data);
    }
    const loadGrupo = async () => {
        const response = await api.get('/grupo');
        setGrupo(response.data);
    }
    function mostrar() {
        const groupElement = document.querySelector('div#register');
        if (groupElement.style.display === "block") {
            groupElement.style.display = "none";
        } else {
            groupElement.style.display = "block";
        }
    }
    const salvar = async () => {
        const id_cota = uniq();
        const id_pes = uniqid();
        const ativo = 1;
        const grupo = 1;
        const pessoa = id_pes;
        let newPessoa = { id_pes, nome, telefone, email, ativo }
        console.log({ id_cota, pessoa, grupo });
        if (nome === "" || telefone === "") {
            return alert("Você precisa preencher pelo menos o nome e o telefone, para realizar esta operação!");
        } else {
            await api.post(`/pessoa`, newPessoa);
            await api.post(`/cota`, { id_cota, pessoa, grupo });
            alert("Cotista adicionado com sucesso!")
           setPessoa(prevPessoa => [...prevPessoa, newPessoa])
        }
    }
    return (
        <div className="pessoa-list" >
            <div>
                <div className="add_contato">
                    <h2>Cotistas de 2021</h2>
                    <div className="click-group">
                        <span className="new" title="Adicionar pagamento" onClick={() => mostrar()}>&#10006;</span>
                        <label className="click">Click</label>
                    </div>
                </div>
                <div className="form-group" id="register">
                    <label className="form-control">Nome</label>
                    <input type="text" className="form-control" id="pessoa-nome" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} autoComplete="off"/>
                    <label className="form-control">Telefone</label>
                    <input type="tel" className="form-control" id="pessoa-telefone" placeholder="(xx) xxxxx-xxxx" value={telefone} onChange={e => setTelafone(e.target.value)}/>
                    <label className="form-control">E-mail</label>
                    <input type="email" className="form-control" id="pessoa-email" placeholder="email@seuemail.com" value={email} onChange={e => setEmail(e.target.value)}/>
                    <label className="form-control">Grupo</label>
                    <select className="form-control">
                        {grupo && grupo.map(grupo=>(<option key={grupo.id_grupo} value={grupo.id_grupo}>{grupo.nome_caixinha}</option>))
                        }
                    </select>
                    <button id="envio" className="btn-success" onClick={() => salvar()}>Enviar</button>
                </div>
            </div>
            <div className="listagem">
                {pessoa && pessoa.map(pessoa => {
                    return (<article key={pessoa.id_pes}>
                        <strong>{pessoa.nome}</strong>
                        <div className="parcelas">
                            <label>Acumulado: </label>
                            {"R$ " + (pessoa.p1 + pessoa.p2 + pessoa.p3 + pessoa.p4 + pessoa.p5 + pessoa.p6 + pessoa.p7 + pessoa.p8 + pessoa.p9 + pessoa.p10 + pessoa.p11 + pessoa.p12).toLocaleString('pt-br')}
                        </div>
                        <Link to={`/pessoa/${pessoa.id_cota}`} className="detalhes">Detalhar</Link>
                    </article>);
                })
                }
            </div>
        </div>
    );
}