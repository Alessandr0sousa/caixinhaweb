import React, { Component } from 'react';
import api from '../../services/api';

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
                    const ok = &#10004;
                    const nok = &#10008;
                    return (<article id={pessoa.id_pes} key={pessoa.id_pes}>
                        <strong>{pessoa.nome}</strong>
                        <div className="parcelas">
                            <span className={pessoa.p1 ? "ok" : "nok"}>{pessoa.p1}{pessoa.p1 ? ok : nok}  </span>
                            <span className={pessoa.p2 ? "ok" : "nok"}>{pessoa.p2}{pessoa.p2 ? ok : nok}  </span>
                            <span className={pessoa.p3 ? "ok" : "nok"}>{pessoa.p3}{pessoa.p3 ? ok : nok}  </span>
                            <span className={pessoa.p4 ? "ok" : "nok"}>{pessoa.p4}{pessoa.p4 ? ok : nok}  </span>
                            <span className={pessoa.p5 ? "ok" : "nok"}>{pessoa.p5}{pessoa.p5 ? ok : nok}  </span>
                            <span className={pessoa.p6 ? "ok" : "nok"}>{pessoa.p6}{pessoa.p6 ? ok : nok}  </span>
                            <span className={pessoa.p7 ? "ok" : "nok"}>{pessoa.p7}{pessoa.p7 ? ok : nok}  </span>
                            <span className={pessoa.p8 ? "ok" : "nok"}>{pessoa.p8}{pessoa.p8 ? ok : nok}  </span>
                            <span className={pessoa.p9 ? "ok" : "nok"}>{pessoa.p9}{pessoa.p9 ? ok : nok}  </span>
                            <span className={pessoa.p10 ? "ok" : "nok"}>{pessoa.p10}{pessoa.p10 ? ok : nok}  </span>
                            <span className={pessoa.p11 ? "ok" : "nok"}>{pessoa.p11}{pessoa.p11 ? ok : nok}  </span>
                            <span className={pessoa.p12 ? "ok" : "nok"}>{pessoa.p12}{pessoa.p12 ? ok : nok}  </span>
                        </div>
                        <a href="">Detalhar</a>
                    </article>)
                })
                }
            </div>
        );
    }
}