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
    render() {
        return (
            <div className="pagamento-info" >
                {/* <h3>{response.data}</h3> */}
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
                <span className="new" title="Adicionar pagamento">&#10006;</span>
            </div >
        );
    }
}
