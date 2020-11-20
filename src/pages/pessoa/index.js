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
    pagar = async () => {
        const { id } = this.props.match.params;
        const response = await api.put(`/pessoa/${id}`);
        console.log(response);
    }
    render() {
        return (
            <div className="pessoa-list" >
                {this.state.pessoa && this.state.pessoa.map(pessoa => {
                    const ok = String.fromCharCode(10004);
                    const nok = String.fromCharCode(10008);
                    return (<article key={pessoa.id_pes}>
                        <strong>{pessoa.nome}</strong>
                        <div className="parcelas">
                            <label>P1 - </label>
                            <span className={pessoa.p1 ? "ok" : "nok"} title='Pracela 1' onClick={() => this.pagar(pessoa.p1 ? 1 : 0)}>{pessoa.p1 ? ok : nok}  </span>
                            <label>P2 - </label>
                            <span className={pessoa.p2 ? "ok" : "nok"} title='Pracela 2' onClick={() => this.pagar(pessoa.p2 ? 1 : 0)}>{pessoa.p2 ? ok : nok}  </span>
                            <label>P3 - </label>
                            <span className={pessoa.p3 ? "ok" : "nok"} title='Pracela 3' onClick={() => this.pagar(pessoa.p3 ? 1 : 0)}>{pessoa.p3 ? ok : nok}  </span>
                            <label>P4 - </label>
                            <span className={pessoa.p4 ? "ok" : "nok"} title='Pracela 4' onClick={() => this.pagar(pessoa.p4 ? 1 : 0)}>{pessoa.p4 ? ok : nok}  </span>
                            <label>P5 - </label>
                            <span className={pessoa.p5 ? "ok" : "nok"} title='Pracela 5' onClick={() => this.pagar(pessoa.p5 ? 1 : 0)}>{pessoa.p5 ? ok : nok}  </span>
                            <label>P6 - </label>
                            <span className={pessoa.p6 ? "ok" : "nok"} title='Pracela 6' onClick={() => this.pagar(pessoa.p6 ? 1 : 0)}>{pessoa.p6 ? ok : nok}  </span>
                            <label>P7 - </label>
                            <span className={pessoa.p7 ? "ok" : "nok"} title='Pracela 7' onClick={() => this.pagar(pessoa.p7 ? 1 : 0)}>{pessoa.p7 ? ok : nok}  </span>
                            <label>P8 - </label>
                            <span className={pessoa.p8 ? "ok" : "nok"} title='Pracela 8' onClick={() => this.pagar(pessoa.p8 ? 1 : 0)}>{pessoa.p8 ? ok : nok}  </span>
                            <label>P9 - </label>
                            <span className={pessoa.p9 ? "ok" : "nok"} title='Pracela 9' onClick={() => this.pagar(pessoa.p9 ? 1 : 0)}>{pessoa.p9 ? ok : nok}  </span>
                            <label>P10 - </label>
                            <span className={pessoa.p10 ? "ok" : "nok"} title='Pracela 10' onClick={() => this.pagar(pessoa.p10 ? 1 : 0)}>{pessoa.p10 ? ok : nok}  </span>
                            <label>P11 - </label>
                            <span className={pessoa.p11 ? "ok" : "nok"} title='Pracela 11' onClick={() => this.pagar(pessoa.p11 ? 1 : 0)}>{pessoa.p11 ? ok : nok}  </span>
                            <label>P12 - </label>
                            <span className={pessoa.p12 ? "ok" : "nok"} title='Pracela 12' onClick={() => this.pagar(pessoa.p12 ? 1 : 0)}>{pessoa.p12 ? ok : nok}  </span>
                        </div>
                        {/* <Link to={`/cota/${pessoa.id_pes}`}>Novo Pagamento</Link> */}
                    </article>)
                })
                }
            </div>
        );
    }
}