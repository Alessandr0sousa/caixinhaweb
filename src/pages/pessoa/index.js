import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from "react-router-dom";

export default class Pessoa extends Component {
    state = {
        pessoa: {},
    };
    async componentDidMount() {
        const { id } = this.props.match.params;
        const response = await api.get(`/pessoa/${id}`);

        this.setState({ pessoa: response.data });
        console.log(response);
    }
    render() {
        const { pessoa } = this.state;
        // const ok = String.fromCharCode(10004);
        // const nok = String.fromCharCode(10008);
        return (
            <div className="pessoa-info" key={pessoa.id_pes}>
                <h2>{pessoa.nome}</h2>
                <Link to={`/pessoa/${pessoa.id_pes}`}>Pagamentos</Link>
            </div>
        )
    }
}