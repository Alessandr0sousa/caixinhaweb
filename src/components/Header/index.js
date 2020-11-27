import React, { Component } from 'react';
import api from '../../services/api';

import "./styles.css";

export default class Grupo extends Component {
    state = {
        grupo: [],
    };
    componentDidMount() {
        this.loadGrupo();
    }
    loadGrupo = async () => {
        const response = await api.get(`/grupo`);
        this.setState({ grupo: response.data });
        console.log(response.data);
    }
    render() {
        return (
            <header id="main-header">
                {this.state.grupo && this.state.grupo.map(grupo => {
                    return(
                    <div key={grupo.id_grupo}>
                        { grupo.nome_caixinha }
                    </div> 
                    )
                })}
            </header>
        )
    }
}
