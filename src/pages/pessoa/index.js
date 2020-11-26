import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from "react-router-dom";

import './style.css';

export default class Pessoa extends Component {
    state = {
        pessoa: []
    };
    componentDidMount() {
        this.loadPessoa();
    }
    loadPessoa = async () => {
        const { id } = this.props.match.params;
        const response = await api.get(`/pessoa/${id}`);
        this.setState({ pessoa: response.data });
    }
    pagar = async (parcela, v) => {
        const { id } = this.props.match.params;
        await api.patch(`/cota/${id}`, { parcela, v });
        // alert("Parcela atualizada com sucesso!");
        // window.location.reload();
        // const newPessoa = [...this.state.pessoa];
        // newPessoa[0].parcelas[parcela - 1] = v;

        // this.setState({pessoa: newPessoa});
        this.setState(prevState => {
            const newPessoa = [...prevState.pessoa];
            newPessoa[0].parcelas[parcela - 1] = v;
            
            return {
                ...prevState,
                pessoa: newPessoa
            }
        });

    }
    render() {
        return (
            <div className="pessoa-info" >
                <Link to="/">Voltar</Link>
                {this.state.pessoa && this.state.pessoa.map(pessoa => {
                    const ok = String.fromCharCode(10004);
                    const nok = String.fromCharCode(10008);
                    return (
                        <article key={pessoa.id_cota}>
                            <strong>{pessoa.nome}</strong>
                            <div className="grid-container">
                                {pessoa.parcelas && pessoa.parcelas.map((parcela, index) => (
                                    < div key={index} className="parcelas" >
                                        <label>P{index + 1} - </label>
                                        <span className={parcela ? "ok" : "nok"} title={`Parcela${index}`} onClick={() => this.pagar(index + 1, parcela ? 0 : 1)}>{parcela ? ok : nok}</span>
                                    </div>
                                ))}
                            </div>
                        </article>
                    )
                })
                }
            </div >
        );
    }
}

