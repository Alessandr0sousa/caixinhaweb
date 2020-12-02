import React, { Component } from 'react';
import api from '../../services/api';
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
        console.log(response);
    }
    mostar = async () => {
        const formElement = document.querySelector('div.insert');
        if (formElement.style.display === "none") {
            formElement.style.display = 'block';
        } else {
            formElement.style.display = 'none';
        }
    }
    pagar = async () => {
        const valor_juro = await document.getElementById('juro').value;
        const valor_quitacao = await document.getElementById('quitacao').value;
        await api.post(`/pagamento`, { valor_juro, valor_quitacao });
        // alert( `Juros: ${valor_juro.toLocaleString('pt-br')} e Quitação ${valor_quitacao.toLocaleString('pt-br')}` );
    }
    render() {
        return (
            <div className="pagamento-info" >
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
                    <span className="new" title="Adicionar pagamento" onClick={() => this.mostar()}>&#10006;</span>
                </div>
                <div className="insert">
                    <div className="form-group">
                        <label className=".form-control">Juros</label>
                        <input type="number" id="juro" className=".form-control" step="0.01" min="0.01" placeholder="R$ 100.00" />
                    </div>
                    <div className="form-group">
                        <label className=".form-control">Quitação</label>
                        <input type="number" id="quitacao" className=".form-control" step="0.01" min="0.01" placeholder="R$ 100.00" />
                    </div>
                    <button id="envio" className="btn-success" onClick={() => this.pagar()}>Enviar</button>
                </div>
            </div >
        );
    }
}
