import React, { Component } from 'react';
import styles from './CentralDataLoader.module.css';
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
      <form className={styles.CentralDataLoader}>
        {formElementsList}
        <Button btnType="Success">Ingresar</Button>
      </form>
    );
  }
}

export default CentralDataLoader;