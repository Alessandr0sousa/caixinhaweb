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
                    this.state.pessoa && this.state.pessoa.map(pessoa => (
                        <article key={pessoa.id_pes}>
                            <strong>{pessoa.nome}</strong>
                            <br/>
                            <a href="">Detalhar</a>
                        </article>
                    ))
                }
            </div>
        );
    }
}