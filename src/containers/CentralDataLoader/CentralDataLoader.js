import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './CentralDataLoader.module.css';
import * as actions from '../../store/actions/index';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

class CentralDataLoader extends Component {

  state = {
    formData: {
      nombre: {
        elementType: 'input',
        value: '',
        elementConfig: {
          name: 'nombre',
          type: 'input',
          placeholder: 'Nombre de las instalaciones'
        }
      },
      brand: {
        elementType: 'input',
        value: '',
        elementConfig: {
          name: 'marca',
          type: 'input',
          placeholder: 'Marca'
        }
      },
      devices: {
        elementType: 'input',
        value: '',
        elementConfig: {
          name: 'dispositivos',
          type: 'number',
          placeholder: 'Número de dispositivos'
        }
      },
      model: {
        elementType: 'input',
        value: '',
        elementConfig: {
          name: 'Modelo',
          type: 'input',
          placeholder: 'Modelo'
        }
      },
      location: {
        elementType: 'input',
        value: '',
        elementConfig: {
          name: 'dirección',
          type: 'input',
          placeholder: 'Dirección completa'
        }
      },
    }
  }

  inputChanged = (event, formElement) => {
    const updatedFormData = {
      ...this.state.formData
    }
    const updatedFormElement = {
      ...updatedFormData[formElement]
    }
    updatedFormElement.value = event.target.value;
    updatedFormData[formElement] = updatedFormElement;
    this.setState({formData: updatedFormData});
  }

  loadFormData = (event) => {
    event.preventDefault();
    this.props.onLoad(this.props.token, this.props.uid, this.state.formData);
  }
  
  render () {
    const formArray = [];
    for (let key in this.state.formData) {
      formArray.push({
        id: key,
        config: this.state.formData[key]
      });
    }

    const formElementsList = formArray.map(formElement => {
      return (
        <Input elementType={formElement.config.elementType}
               value={formElement.config.value}
               changed={(event) => {this.inputChanged(event, formElement.id)}}
               key={formElement.id}
               elementConfig={formElement.config.elementConfig} />
      );
    });

    return (
      <form onSubmit={(event) => {this.loadFormData(event)}} className={styles.CentralDataLoader}>
        {formElementsList}
        <Button btnType="Success">Ingresar</Button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    uid: state.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad: (token, uid, formData) => dispatch(actions.loadInit(token, uid, formData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CentralDataLoader);