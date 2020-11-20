import React, { Component } from 'react';
import api from '../../services/api';
// import { Link } from "react-router-dom";
// import './styles.css';
import { Modal, Button } from 'react-materialize';

const trigger = <Button>Open Modal</Button>;

export default class Cota extends Component {
  state = {
    cota: []
  };
  loadCota = async () => {
    const { id } = this.props.match.params;
    const response = await api.get(`/cota/${id}`);
    this.setState({ cota: response.data });
  }
  componentDidMount() {
    this.loadCota();
  }
  render() {
    return (
      <Modal header="Modal Header" trigger={trigger}></Modal>
    );
  }
}