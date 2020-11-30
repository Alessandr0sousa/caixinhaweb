import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from "react-router-dom";
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
