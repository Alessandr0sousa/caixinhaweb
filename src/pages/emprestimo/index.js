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
    const { id } = this.props.match.params;
    const response = await api.get(`/pagamento/${id}`);
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
                  <span className="emprestimo-valor">{"R$ " + emprestimo.valor.toLocaleString('pt-br')}</span>
                </div>
                <div>
                  <span className="emprestimo-data">{emprestimo.data}</span>
                </div>
                {this.state.pagamento && this.state.pagamento.map(pagamento => {
                  return(
                  <div key={pagamento.id_pag} className="pagamentos">
                    <span className="pagameto-valor">{"R$ " + emprestimo.valor_juro.toLocaleString('pt-br')}</span>
                    <span className="pagameto-valor">{"R$ " + emprestimo.valor_quitacao.toLocaleString('pt-br')}</span>
                  </div>
                )})}
              </div>
            </article>);
        })}
      </div>
    );
  }
}