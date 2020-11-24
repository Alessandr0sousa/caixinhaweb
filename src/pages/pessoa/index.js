import React, { Component } from 'react';
import api from '../../services/api';
// import { Link } from "react-router-dom";

import './style.css';

export default class Pessoa extends Component {
    state = {
        pesaoa: []
    };
    componentDidMount() {
        this.loadPessoa();
    }
    loadPessoa = async () => {
        const { id } = this.props.match.params;
        const response = await api.get(`/pessoa/${id}`);
        this.setState({ pessoa: response.data });
    }
    pagar = async (v) => {
        const { id } = this.props.match.params;
        const response = await api.patch(`/cota/${id}`, `${v}`);
        console.log(response);
    }
    render() {
        return (
            <div className="pessoa-list" >
                {this.state.pessoa && this.state.pessoa.map(pessoa => {
                    const ok = String.fromCharCode(10004);
                    const nok = String.fromCharCode(10008);
                    return (<article key={pessoa.id_cota}>
                        <strong>{pessoa.nome}</strong>
                        <div className="parcelas">
                            {pessoa.parcelas && pessoa.parcelas.map((parcela, index) => (
                                <div key={index} className="parcelas">
                                    <label>P{index + 1} - </label>
                                    <span className={parcela ? "ok" : "nok"} title={`Parcela${index}`} onClick={() => this.pagar( parcela ? `p${index+1}: 0` : `p${index+1}: 1`)}>{parcela ? ok : nok}</span>
                                </div>
                            ))}
                        </div>
                        {/* <Link to={`/cota/${pessoa.id_pes}`}>Novo Pagamento</Link> */}
                    </article>)
                })
                }
            </div>
        );
    }
}

