import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from "react-router-dom";
import uniqid from 'uniqid';
import './styles.css';

export default class Emprestimo extends Component {
  state = {
    emprestimo: [],
    pagamento: []
  };
  componentDidMount() {
    this.loadEmprestimo();

  }
  loadEmprestimo = async () => {
    const { id } = this.props.match.params;
    const response = await api.get(`/emprestimo/${id}`);
    this.setState({ emprestimo: response.data });
    console.log(response.data);
  }
  loadPagamento = async (id) => {
    const response = await api.get(`/pagamento/${id}`);
    this.setState({ pagamento: response.data });
    console.log(response);
  }
  salvar = async () => {
    const { id } = this.props.match.params;
    const id_emp = uniqid();
    const pessoa = id;
    const valor = document.querySelector('input#emprestimo-valor').value;
    console.log({valor,id_emp, pessoa});
    if (valor === "") {
      return alert("Você precisa informar o valor do emprestimo!");
  } else {
      await api.post(`/emprestimo`, { valor,id_emp, pessoa });
      alert("Rempréstimo Realizado com sucesso!");
      window.location.reload();
  }
  }
  mostrar() {
    const groupElement = document.querySelector('div#register');
    if (groupElement.style.display === "none") {
      groupElement.style.display = "block";
    } else {
      groupElement.style.display = "none";
    }
  }
  render() {
    return (
      <div className="emprestimo-info" >
        <div>
          <div className="add_emprestimo">
            <h2>Emprestimos </h2>
            <div className="click-group">
              <span className="new" title="Novo empréstimo" onClick={() => this.mostrar()}>&#10006;</span>
              <label className="click">Click</label>
            </div>
          </div>
          <div className="form-group" id="register">
            <label className="form-control">Valor</label>
            <input type="text" className="form-control" id="emprestimo-valor" placeholder="R$ 100,00" />
            <button id="envio" className="btn-success" onClick={() => this.salvar()}>Enviar</button>
          </div>
        </div>
        {this.state.emprestimo && this.state.emprestimo.map(emprestimo => {
          return (
            <article key={emprestimo.id_emp}>
              <div className="emprestimos">
                <label>Valor emprestado</label>
                <div>
                  <span className="emprestimo-valor">{"R$ " + emprestimo.valor.toLocaleString('pt-br')}</span>
                </div>
                <div className="emprestimos-group">
                  <span className="emprestimo-data">{emprestimo.data}</span>
                  <Link className="btn-pag" to={`/pagamento/${emprestimo.id_emp}`}>Pagamentos</Link>
                </div>
              </div>
            </article>);
        })}
      </div>
    );
  }
}
