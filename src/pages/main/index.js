import React, { Component } from 'react';
import api from '../../services/api';
import uniqid from 'uniqid';
import { Link } from "react-router-dom";

import './style.css';

export default class Main extends Component {
    state = {
        pessoa: []
    };
    componentDidMount() {
        this.loadPessoa();
    }
    loadPessoa = async () => {
        const response = await api.get('/pessoa');
        this.setState({ pessoa: response.data });
    }
    mostrar() {
        const groupElement = document.querySelector('div#register');
        if (groupElement.style.display === "none") {
            groupElement.style.display = "block";
        } else {
            groupElement.style.display = "none";
        }
    }
    salvar = async () => {
        const id_pes = uniqid();
        const nome = await document.getElementById('pessoa-nome').value;
        const telefone = await document.getElementById('pessoa-email').value;
        const email = await document.getElementById('pessoa-telefone').value;
        const ativo = 1;
        if (nome === "" || telefone === "" ) {
            return alert("Você precisa preencher pelo menos o nome e o telefone, para realizar esta operação!");
        } else {
            await api.post(`/pessoa`, { id_pes, nome, telefone, email, ativo });
            alert("Pagamento adicionado com sucesso!")
            window.location.reload();
        }
    }
    render() {
        // console.log(uniqid());
        return (
            <div className="pessoa-list" >
                <div>
                    <div className="add_contato">
                        <h2>Cotistas da caixinha 2021</h2>
                        <div className="click-group">
                            <span className="new" title="Adicionar pagamento" onClick={() => this.mostrar()}>&#10006;</span>
                            <label className="click">Click</label>
                        </div>
                    </div>
                    <div className="form-group" id="register">
                        <label className="form-control">Nome</label>
                        <input type="text" className="form-control" id="pessoa-nome" placeholder="Nome" />
                        <label className="form-control">E-mail</label>
                        <input type="email" className="form-control" id="pessoa-email" placeholder="email@seuemail.com" />
                        <label className="form-control">Telefone</label>
                        <input type="tel" className="form-control" id="pessoa-telefone" placeholder="(xx) xxxxx-xxxx" />
                        <button id="envio" className="btn-success" onClick={() => this.salvar()}>Enviar</button>
                    </div>
                </div>
                {this.state.pessoa && this.state.pessoa.map(pessoa => {
                    return (<article key={pessoa.id_pes}>
                        <strong>{pessoa.nome}</strong>
                        <div className="parcelas">
                            <label>Acumulado: </label>
                            {"R$ " + (pessoa.p1 + pessoa.p2 + pessoa.p3 + pessoa.p4 + pessoa.p5 + pessoa.p6 + pessoa.p7 + pessoa.p8 + pessoa.p9 + pessoa.p10 + pessoa.p11 + pessoa.p12).toLocaleString('pt-br')}
                        </div>
                        <Link to={`/pessoa/${pessoa.id_cota}`}>Detalhar</Link>
                    </article>);
                })
                }
            </div>
        );
    }
}