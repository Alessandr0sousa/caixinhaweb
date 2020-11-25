import React, { Component } from 'react';
import api from '../../services/api';
// import { Link } from "react-router-dom";
import './styles.css';

export default class Emprestimo extends Component {
  state = {
    emprestimo: []
  };
  componentDidMount() {
    this.loadEmprestimo();
  }
  loadEmprestimo = async () => {
    const response = await api.get(`/emprestimo`);
    this.setState({ emprestimo: response.data });
    console.log(response.data.pessoa);
  }
  render() {
    return (
      <div className="emprestimo-info" >
        {this.state.emprestimo && this.state.emprestimo.map(emprestimo => {
          return (
          <article key={emprestimo.id_emp}>
            <strong>{emprestimo.pessoa}</strong>
            <div className="parcelas">
              <label>Valor Inicial</label>
              <span>{emprestimo.valor}</span>
            </div>
          </article>);
        })
        }
      </div>
    );
  }
}