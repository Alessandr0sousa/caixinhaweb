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
                {
                    this.state.pessoa && this.state.pessoa.map(pessoa => {
                        return <article key={pessoa.id_pes}>
                            <strong>{pessoa.nome}</strong>
                            <div className="parcelas">
                                {
                                    p = ()=>{
                                        for (let i = 0; i < 13; i++) {
                                            if (pessoa.p+i) {
                                                <span className="ok">{pessoa.p1}&#10004;</span>
                                            } else {
                                                <span className="nok">{pessoa.p2}&#10008;</span>               
                                            }
                                            
                                        }
                                    }
                                }
                            </div>
                            <a href="">Detalhar</a>
                        </article>
                    })
                }
            </div>
        );
    }
}