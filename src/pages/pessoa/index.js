import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link } from "react-router-dom";

import './style.css';

export default function Pessoa(props) {
    const { id } = props.match.params;

    const [pessoa, setPessoa] = useState([]);
    useEffect(() => {
        loadPessoa();
    }, [])
    const loadPessoa = async () => {
        const response = await api.get(`/pessoa/${id}`);
        setPessoa(response.data);
    }
    const pagar = async (parcela, v) => {
        await api.patch(`/cota/${id}`, { parcela, v });
        setPessoa(prevPessoa => {
            const newPessoa = [...prevPessoa];
            newPessoa[0].parcelas[parcela - 1] = v;
            return newPessoa
            
        });
    }
    return (
        <div className="pessoa-info" >
            <Link to="/"><span>&#10140;</span></Link>
            {pessoa && pessoa.map(pessoa => {
                const ok = String.fromCharCode(10004);
                const nok = String.fromCharCode(10008);
                return (
                    <article key={pessoa.id_cota}>
                        <strong>{pessoa.nome}</strong>
                        <div className="grid-container">
                            {pessoa.parcelas && pessoa.parcelas.map((parcela, index) => (
                                < div key={index} className="parcelas" >
                                    <label>P{index + 1} - </label>
                                    <span className={parcela ? "ok" : "nok"} title={`Parcela${index}`} onClick={() => pagar(index + 1, parcela ? 0 : 1)}>{parcela ? ok : nok}</span>
                                </div>
                            ))}
                        </div>
                        <div className="detatalhar">
                            <Link className="btn-emp" to={`/emprestimo/${pessoa.id_pes}`}>Emprestimos</Link>
                        </div>
                    </article>
                )
            })
            }
        </div >
    );
}

