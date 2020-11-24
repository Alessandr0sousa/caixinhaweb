import React, { Component } from 'react';
import api from '../../services/api';
import uniqid from 'uniqid';
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
        console.log(uniqid());
        return (
            <div className="pessoa-info" >
                {this.state.pessoa && this.state.pessoa.map(pessoa => {
                    return (<article key={pessoa.id_pes}>
                        <strong>{pessoa.nome}</strong>
                        <div className="parcelas">
                            <label>Acumulado: </label>
                            {pessoa.p1 + pessoa.p2 + pessoa.p3 + pessoa.p4 + pessoa.p5 + pessoa.p6 + pessoa.p7 + pessoa.p8 + pessoa.p9 + pessoa.p10 + pessoa.p11 + pessoa.p12}
                        </div>
                        <Link to={`/pessoa/${pessoa.id_cota}`}>Detalhar</Link>
                    </article>);
                })
                }
            </div>
        );
    }
}