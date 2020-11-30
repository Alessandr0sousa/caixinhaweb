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
                {this.state.pagamento && this.state.pagamento.map(pagamento => {
                    return (
                        <article key={pagamento.id_pag} className="pagamentos">
                            <div>
                                <label className="rotulo">Juros</label>
                                <span className="pagamento-valor">{"R$ " + pagamento.valor_juro.toLocaleString('pt-br')}</span>
                            </div>
                            <div>
                                <label className="rotulo">Quitação</label>
                                <span className="pagamento-valor">{"R$ " + pagamento.valor_quitacao.toLocaleString('pt-br')}</span>
                            </div>
                            <div>
                                <label className="rotulo">Data</label>
                                <span className="pagamento-data">{"R$ " + pagamento.data.toLocaleString('pt-br')}</span>
                            </div>
                        </article>
                    )
                })}
            </div >
        );
    }
}
