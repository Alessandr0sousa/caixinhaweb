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
        console.log(response.data);
    }
    mostrar() {
        const groupElement =  document.querySelector('div#form_pag');
        if (groupElement.style.display === "none") {
            groupElement.style.display = "block";
        } else {
            groupElement.style.display = "none";
        }
    }
    render() {
        return (
            <div className="pagamento-info" >
                <article>
                    <table>
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Valor Juros</th>
                                <th>valor Quitação</th>
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
                </article>
                <div className="toot">
                    <span>Totais</span>
                    <span>{this.state.pagamento.reduce(acc, pag) => acc += pag.valor_juro}</span>
                </div>
                <div className="form-group" id="form_pag">
                    <label className="form-control">Juros</label>
                    <input type="text" className="form-control"/>
                    <label className="form-control">Quitação</label>
                    <input type="text" className="form-control"/>
                    <button className="btn-envio">Enviar</button>
                </div>

            </div >
        );
    }
}
