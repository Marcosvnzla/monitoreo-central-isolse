import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import styles from './CentralDataLoader.module.css';
import * as actions from '../../store/actions/index';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

const formSchema = Yup.object().shape({
});

class CentralDataLoader extends Component {

  state = {
    formData: {
      nombre: {
        type: 'input',
        name: 'nombre',
        value: '',
        placeholder: 'Nombre de las instalaciones'
      },
      brand: {
        value: '',
        name: 'marca',
        type: 'input',
        placeholder: 'Marca'
      },
      devices: {
        value: '',
        name: 'dispositivos',
        type: 'number',
        placeholder: 'Número de dispositivos'
      },
      model: {
        value: '',
        name: 'Modelo',
        type: 'input',
        placeholder: 'Modelo'
      },
      location: {
        value: '',
        name: 'dirección',
        type: 'input',
        placeholder: 'Dirección completa'
      },
    }
  }

  loadFormData = (values) => {
    console.log(values);
    this.props.onLoad(this.props.token, this.props.uid, values);
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
               placeholder={formElement.config.placeholder} />
      );
    });

    return (
      <Formik 
              onSubmit={values => this.loadFormData(values)}
              initialValues={initialValues}
               >
        <Form className={styles.CentralDataLoader}>
          {formElementsList}
          <Button btnType="Success">Ingresar</Button>
        </Form>
      </Formik>
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