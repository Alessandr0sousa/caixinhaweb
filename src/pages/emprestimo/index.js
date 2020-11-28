import React, { Component } from 'react';
import api from '../../services/api';
// import { Link } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import './styles.css';

export default class Emprestimo extends Component {
  state = {
    emprestimo: [],
    pagamento: []
  };
  componentDidMount() {
    this.loadEmprestimo();
    this.loadPagamento();
  }
  loadEmprestimo = async () => {
    const { id } = this.props.match.params;
    const response = await api.get(`/emprestimo/${id}`);
    this.setState({ emprestimo: response.data });
    console.log(response.data);
  }
  loadPagamento = async () => {
    const { id } = this.props.match.params;
    const response = await api.get(`/pagamento/${id}`);
    this.setState({ pagamento: response.data });
    console.log({ id });
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
                {this.state.pagamento && this.state.pagamento.map((pagamento, index) => {
                  return (
                    <div key={index} className="pagamentos">
                      <Accordion key={index}>
                        <Card>
                          <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey={index}>
                              Click me!
                          </Accordion.Toggle>
                          </Card.Header>
                          <Accordion.Collapse eventKey={index}>
                            <span className="pagamento-valor">{"R$ " + pagamento.valor_juro.toLocaleString('pt-br')}</span>
                            <span className="pagamento-valor">{"R$ " + pagamento.valor_quitacao.toLocaleString('pt-br')}</span>
                          </Accordion.Collapse>
                        </Card>
                      </Accordion>
                    </div>
                  )
                })}
              </div>
            </article>);
        })}
      </div>
    );
  }
}
