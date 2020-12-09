import React, { Component } from 'react';
import api from '../../services/api';
import uniqid from 'uniqid';
// import { Link } from "react-router-dom";
import './styles.css';

export default class Pagamento extends Component {
    state = {
        pagamento: []
    };
    componentDidMount() {
        this.loadPagamento();
    }
    loadPagamento = async () => {
        const { id } = this.props.match.params;
        const response = await api.get(`/pagamento/${id}`);
        this.setState({ pagamento: response.data });
    }
    mostrar() {
        const groupElement = document.querySelector('div#form_pag');
        if (groupElement.style.display === "none") {
            groupElement.style.display = "block";
        } else {
            groupElement.style.display = "none";
        }
    }
    somar = async () => {
        const total = this.state.pagamento.length > 0 && this.state.pagamento.reduce((acc, obj) => acc + obj[campo], 0);

        return total;
    }
    pagar = async () => {
        const { id } = this.props.match.params;
        const id_pag = uniqid();
        const emprestimo = id;
        const valor_juro = await document.getElementById('juro').value;
        const valor_quitacao = await document.getElementById('quitacao').value;
        if (valor_juro === "" && valor_quitacao === "") {
            return alert("Você precisa preencher pelo menos um valor, para realizar esta operação!");
        } else {
            await api.post(`/pagamento`, { id_pag, emprestimo, valor_juro, valor_quitacao });
            alert("Pagamento adicionado com sucesso!")
            // window.location.reload();
            this.setState(prevState => {
                const newPagamento = [...prevState.pagamento];
                return {
                    ...prevState,
                    pessoa: newPagamento
                }
            });
        }
    }
    render() {
        return (
            <div className="pagamento-info" >
                <article>
                    <div className="tabela">
                        <table>
                            <thead>
                                <tr>
                                    <th>Data</th>
                                    <th>Juro</th>
                                    <th>Quitação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.pagamento && this.state.pagamento.map(pagamento => {
                                    return (
                                        <tr key={pagamento.id_pag}>
                                            <td>{pagamento.data}</td>
                                            <td>{"R$ " + pagamento.valor_juro.toLocaleString('pt-br')}</td>
                                            <td>{"R$ " + pagamento.valor_quitacao.toLocaleString('pt-br')}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td>{"R$ " + this.somar('valor_juro')}</td>
                                    <td>{"R$ " + this.somar('valor_quitacao')}</td>
                                </tr>
                            </tfoot>
                        </table>
                        <div className="click-group">
                            <span className="new" title="Adicionar pagamento" onClick={() => this.mostrar()}>&#10006;</span>
                            <label className="click">Click</label>
                        </div>
                    </div>
                    <div className="form-group" id="form_pag">
                        <label className="form-control">Juros</label>
                        <input type="text" id="juro" className="form-control" step="0.01" min="0.01" placeholder="R$ 100.00" />
                        <label className="form-control">Quitação</label>
                        <input type="text" id="quitacao" className="form-control" step="0.01" min="0.01" placeholder="R$ 100.00" />
                        <button id="envio" className="btn-success" onClick={() => this.pagar()}>Enviar</button>
                    </div>
                </article>
            </div >
        );
    }
}
