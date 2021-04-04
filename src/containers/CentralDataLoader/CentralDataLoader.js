import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import styles from './CentralDataLoader.module.css';
import * as actions from '../../store/actions/index';
import PopUp from '../../components/UI/popUp/popUp';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

const formSchema = Yup.object().shape({
  nombre: Yup.string(),
  brand: Yup.string(),
  devices: Yup.string(),
  model: Yup.string(),
  location: Yup.string()
});

class CentralDataLoader extends Component {

  state = {
    formData: {
      name: {
        value: '',
        name: 'name',
        type: 'input',
        placeholder: 'Nombre de las instalaciones',
        label: 'Nombre'
      },
      brand: {
        value: '',
        name: 'brand',
        type: 'input',
        placeholder: 'Marca',
        label: 'Marca'
      },
      devices: {
        value: '',
        name: 'devices',
        type: 'number',
        placeholder: 'Número de dispositivos',
        label: 'Cantidad'
      },
      model: {
        value: '',
        name: 'model',
        type: 'input',
        placeholder: 'Modelo',
        label: 'Modelo'
      },
      location: {
        value: '',
        name: 'location',
        type: 'input',
        placeholder: 'Dirección completa',
        label: 'Dirección'
      },
    }
  }

  loadFormData = (values) => {
    this.props.onLoad(this.props.token, this.props.uid, values, this.props.currentCentral);
  }
  
  render () {
    const formArray = [];
    const initialValues = {};
    for (let key in this.state.formData) {
      formArray.push({
        id: key,
        config: this.state.formData[key]
      });

      initialValues[key] = this.state.formData[key].value;
    }

    const formElementsList = formArray.map(formElement => {
      return (
        <Input name={formElement.config.name}
               type={formElement.config.type}
               key={formElement.id}
               label={formElement.config.label}
               placeholder={formElement.config.placeholder} />
      );
    });

    const popUpMessages = this.props.popUpMessages.map((message, index) => {
      return (
        <PopUp key={index} message={message} />
      );
    })

    return (
      <Formik 
              onSubmit={values => this.loadFormData(values)}
              validationSchema={formSchema}
              initialValues={initialValues}
               >
        <Form className={styles.CentralDataLoader}>
          <h1 className={styles.title}>Cargar datos a: {this.props.currentCentral.toUpperCase()}</h1>
          {popUpMessages} 
          {formElementsList}
          <Button typeOfButton="submit" btnType="Success">Ingresar</Button>
        </Form>
      </Formik>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    uid: state.userId,
    currentCentral: state.currentCentral,
    popUpMessages: state.popUpMessages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad: (token, uid, formData, currentCentral) => dispatch(actions.loadInit(token, uid, formData, currentCentral))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CentralDataLoader);