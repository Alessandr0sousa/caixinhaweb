import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from "react-router-dom";

import './style.css';

export default class Main extends Component {
    state = {
        pesaoa: []
    };

    componentDidMount() {
        this.loadPessoa();
    }
    loadPessoa = async () => {
        const response = await api.get('/pessoa');
        this.setState({ pessoa: response.data });
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
                            <span className={pessoa.p1 ? "ok" : "nok"}>{pessoa.p1 ? ok : nok}  </span>
                            <label>P2 - </label>
                            <span className={pessoa.p2 ? "ok" : "nok"}>{pessoa.p2 ? ok : nok}  </span>
                            <label>P3 - </label>
                            <span className={pessoa.p3 ? "ok" : "nok"}>{pessoa.p3 ? ok : nok}  </span>
                            <label>P4 - </label>
                            <span className={pessoa.p4 ? "ok" : "nok"}>{pessoa.p4 ? ok : nok}  </span>
                            <label>P5 - </label>
                            <span className={pessoa.p5 ? "ok" : "nok"}>{pessoa.p5 ? ok : nok}  </span>
                            <label>P6 - </label>
                            <span className={pessoa.p6 ? "ok" : "nok"}>{pessoa.p6 ? ok : nok}  </span>
                            <label>P7 - </label>
                            <span className={pessoa.p7 ? "ok" : "nok"}>{pessoa.p7 ? ok : nok}  </span>
                            <label>P8 - </label>
                            <span className={pessoa.p8 ? "ok" : "nok"}>{pessoa.p8 ? ok : nok}  </span>
                            <label>P9 - </label>
                            <span className={pessoa.p9 ? "ok" : "nok"}>{pessoa.p9 ? ok : nok}  </span>
                            <label>P10 - </label>
                            <span className={pessoa.p10 ? "ok" : "nok"}>{pessoa.p10 ? ok : nok}  </span>
                            <label>P11 - </label>
                            <span className={pessoa.p11 ? "ok" : "nok"}>{pessoa.p11 ? ok : nok}  </span>
                            <label>P12 - </label>
                            <span className={pessoa.p12 ? "ok" : "nok"}>{pessoa.p12 ? ok : nok}  </span>
                        </div>
                        <Link to={`/pessoa/${pessoa.id_pes}`}>Detalhar</Link>
                    </article>)
                })
                }
            </div>
        );
    }
}