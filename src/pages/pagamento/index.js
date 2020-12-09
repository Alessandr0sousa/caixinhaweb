import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import uniqid from 'uniqid';
import { Link } from "react-router-dom";
import './styles.css';

export default function Pagamento(props) {
    const {id} = props.match.params;
    const [pagamento, setPagamento] = useState([]);
    const [valor_juro, setValorJuro] = useState('');
    const [valor_quitacao, setValorQuitacao] = useState('');

    useEffect(() => {
        loadPagamento();
    }, [])
    const loadPagamento = async () => {
        const response = await api.get(`/pagamento/${id}`);
        setPagamento(response.data);
    }
    function mostrar() {
        const groupElement = document.querySelector('div#form_pag');
        if (groupElement.style.display === "block") {
            groupElement.style.display = "none";
        } else {
            groupElement.style.display = "block";
        }
    }
    const somar = (campo) => {
        const total = pagamento.length > 0 && pagamento.reduce((acc, obj) => acc + obj[campo], 0);
        return total;
    }
    const pagar = async () => {
        const id_pag = uniqid();
        const emprestimo = id;
        const newPagamento = { id_pag, emprestimo, valor_juro, valor_quitacao }
        console.log({ id_pag, emprestimo, valor_juro, valor_quitacao });
        if (valor_juro === "" && valor_quitacao === "") {
            return alert("Você precisa preencher pelo menos um valor, para realizar esta operação!");
        } else {
            await api.post(`/pagamento`, newPagamento);
            alert("Pagamento adicionado com sucesso!")
            setPagamento (prevPagamento => [...prevPagamento, newPagamento])
        }
    }
    return (
        <div className="pagamento-info" >
            <Link to="/" className="voltar"><span>Voltar</span></Link>
            <article>
                <div className="tabela">
                    <table>
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Juro</th>
                                <th>Quitação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pagamento && pagamento.map(pagamento => {
                                return (
                                    <tr key={pagamento.id_pag}>
                                        <td>{pagamento.data}</td>
                                        <td>{"R$ " + pagamento.valor_juro.toLocaleString('pt-br')}</td>
                                        <td>{"R$ " + pagamento.valor_quitacao.toLocaleString('pt-br')}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>Total</td>
                                <td>{"R$ " + somar('valor_juro')}</td>
                                <td>{"R$ " + somar('valor_quitacao')}</td>
                            </tr>
                        </tfoot>
                    </table>
                    <div className="click-group">
                        <span className="new" title="Adicionar pagamento" onClick={() => mostrar()}>&#10006;</span>
                        <label className="click">Click</label>
                    </div>
                </div>
                <div className="form-group" id="form_pag">
                    <label className="form-control">Juros</label>
                    <input type="text" id="juro" className="form-control" value={valor_juro} onChange={e => setValorJuro(e.target.value)} />
                    <label className="form-control">Quitação</label>
                    <input type="text" id="quitacao" className="form-control" value={valor_quitacao} onChange={e => setValorQuitacao(e.target.value)} />
                    <button id="envio" className="btn-success" onClick={() => pagar()}>Enviar</button>
                </div>
            </article>
        </div >
    );

}
