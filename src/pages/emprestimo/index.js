import React, { Component } from 'react';
import api from '../../services/api';
// import { Link } from "react-router-dom";
import './styles.css';

export default class Emprestimo extends Component {
  state = {
    emprestimo: [],
    pagamento: []
  };
  componentDidMount() {
    this.loadEmprestimo();
    // this.loadPagamento();
  }
  loadEmprestimo = async () => {
    const response = await api.get(`/emprestimo`);
    this.setState({ emprestimo: response.data });
    console.log(response.data);
  }
  loadPagamento = async () => {
    const response = await api.get(`/pagamento`);
    this.setState({ pagamento: response.data });
    console.log(response.data);
  }
  render() {
    return (
      <div className="emprestimo-info" >
        {this.state.emprestimo && this.state.emprestimo.map(emprestimo => {
          return (
            <article key={emprestimo.id_emp}>
              <div className="emprestimos">
                <label>Valor Inicial</label>
                <div>
                  <span className="emprestimo-valor">{"R$ "+emprestimo.valor.toLocaleString('pt-br')}</span>
                </div>
              </div>
            </article>);
        })}
      </div>
    );
  }
}