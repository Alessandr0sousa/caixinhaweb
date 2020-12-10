import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link } from "react-router-dom";
import uniqid from 'uniqid';
import './styles.css';

export default function Emprestimo(props) {
  const id = props.id;
  const [emprestimo, setEmprestimo] = useState([]);
  const [valor, setValor] = useState([]);

  useEffect(() => {
    loadEmprestimo();
  }, [])
  const loadEmprestimo = async () => {
    const response = await api.get(`/emprestimo/${id}`);
    setEmprestimo(response.data);
    console.log(response.data);
  }
  const salvar = async () => {
    const id_emp = uniqid();
    const pessoa = id;
    const newEmprestimo = { valor, id_emp, pessoa };
    if (valor === "") {
      return alert("Você precisa informar o valor do emprestimo!");
    } else {
      await api.post(`/emprestimo`, newEmprestimo);
      alert("Rempréstimo Realizado com sucesso!");
      setEmprestimo(prevEmprestimo => [...prevEmprestimo, newEmprestimo])
    }
  }
  function mostrar() {
    const groupElement = document.querySelector('div#register');
    if (groupElement.style.display === "block") {
      groupElement.style.display = "none";
    } else {
      groupElement.style.display = "block";
    }
  }
  return (
    <div className="emprestimo-info" >
      <div>
        <div className="add_emprestimo">
          <h4>Emprestimos </h4>
          <div className="click-group">
            <span className="new" title="Novo empréstimo" onClick={() => mostrar()}>&#10006;</span>
            <label className="click">Click</label>
          </div>
        </div>
        <div className="form-group" id="register">
          <label className="form-control">Valor</label>
          <input type="text" className="form-control" id="emprestimo-valor" placeholder="R$ 100,00" value={valor} onChange={e => setValor(e.target.value)} />
          <button id="envio" className="btn-success" onClick={() => salvar()}>Enviar</button>
        </div>
      </div>
      {emprestimo && emprestimo.map(emprestimo => {
        return (
          <div key={emprestimo.id_emp}>
            <article>
              <div className="emprestimos">
                <label>Valor emprestado</label>
                <div>
                  <span className="emprestimo-valor">{"R$ " + emprestimo.valor.toLocaleString('pt-br')}</span>
                </div>
                <div className="emprestimos-group">
                  <span className="emprestimo-data">{emprestimo.data}</span>
                </div>
              </div>
              <div className="total">
                <label className="emprestimo-label">Total juros</label>
                <span className="emprestimo-valor">{"R$ " + emprestimo.total_juro.toLocaleString('pt-br')}</span>
              </div>
              <div className="debito">
                <label className="emprestimo-label">Débito</label>
                <span className="emprestimo-valor">{"R$ " + emprestimo.valor_atual.toLocaleString('pt-br')}</span>
              </div>
              <Link className="btn-pag" to={`/pagamento/${emprestimo.id_emp}`}>Pagamentos</Link>
            </article>
          </div>)
      })}
    </div>
  );
}
