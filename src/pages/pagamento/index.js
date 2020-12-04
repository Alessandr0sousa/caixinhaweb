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
        this.somar();
    }
    loadPagamento = async () => {
        const response = await api.get(`/pagamento`);
        this.setState({ pagamento: response.data });
    }
    mostrar() {
        const groupElement =  document.querySelector('div#form_pag');
        if (groupElement.style.display === "none") {
            groupElement.style.display = "block";
        } else {
            groupElement.style.display = "none";
        }
    }
    somar = async () => {
        const pagamento = this.state.pagamento && this.state.pagamento;

        const total = pagamento.map(pagamento =>
            pagamento.reduce((acc, pag) => {
                return (acc + pag.valor_juro);
            })
        )
        console.log("Total: " + total)
    }
    pagar = async () => {
        const { id } = this.props.match.params;
        const id_pag = uniqid();
        const valor_juro = await document.getElementById('juro').value;
        const valor_quitacao = await document.getElementById('quitacao').value;
        await api.post(`/pagamento`, { id_pag, id, valor_juro, valor_quitacao });
        // alert( `Juros: ${valor_juro.toLocaleString('pt-br')} e Quitação ${valor_quitacao.toLocaleString('pt-br')}` );
        console.log({ id_pag, id, valor_juro, valor_quitacao });
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
