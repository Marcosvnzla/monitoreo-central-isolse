import React, { Component } from 'react';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import styles from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import ImageContainer from '../../components/ImageContainer/ImageContainer';
import logo from '../../assets/images/bigLogo_img.png';
import Spinner from '../../components/UI/Spinner/Spinner';
import lineBreaker from '../../assets/images/line_breaker.png';
import * as actions from '../../store/actions/index';

const formSchema = Yup.object().shape({
  email: Yup.string().email('email invalido'),
  password: Yup.string().min(6, '6 caracteres como mínimo')
});

class Auth extends Component {

  state = {
    formInitialValues: {
      email: '',
      password: ''
    },
    formData: {
      email: {
        type: 'email',
        name: 'email',
        placeholder: 'Email',
        label: 'Email',
        value: ''
      },
      password: {
        type: 'password',
        name: 'password',
        placeholder: 'Contraseña',
        label: 'Contraseña',
        value: ''
      }
    }
  }

  login = (values) => {
    const email = values.email;
    const password = values.password;
    this.props.onLogin(email, password);
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
        <Input name={formElement.config.name}
               type={formElement.config.type}
               key={formElement.id}
               placeholder={formElement.config.placeholder} />
      );
    });

    let errMessage = '';
    console.log(this.props.errorMessage);
    switch (this.props.errorMessage) {
      case 'INVALID_EMAIL':
        errMessage = 'Email o contraseña incorrectos'; 
        break;

      case 'INVALID_PASSWORD':
        errMessage = 'Email o contraseña incorrectos'; 
        break;

      case 'MISSING_PASSWORD':
        errMessage = 'Por favor introduzca contraseña'; 
        break;

      default:
        break;
    }

    return (
      <motion.div 
        className={styles.Auth}
        initial={{opacity: 1}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
      >
        <Formik 
                validationSchema={formSchema}
                onSubmit={values => this.login(values)}
                initialValues={this.state.formInitialValues}>
          <Form>
            <ImageContainer imageImport={logo} />
            {formElementsList}
            {this.props.isLoading ? <Spinner/> : <Button typeOfButton="submit" btnType="Success">Ingresar</Button>}
            <p style={{color: '#940f00'}}>{errMessage}</p>
          </Form>
        </Formik>
        <div className={styles.lineBreakerContainer}>
          <ImageContainer imageImport={lineBreaker} moreStyles={{height: '400px'}}/>
        </div>
        <div className={styles.extraInfo}>
          <h1>Extra</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eleifend non libero non cursus. Vivamus eu lectus interdum, maximus eros a, tincidunt elit. Etiam turpis magna, mollis sit amet tortor ut, ultricies ornare magna.</p>
        </div>
      </motion.div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    isLoading: state.loading,
    errorMessage: state.errorMessage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (email, password) => dispatch(actions.authInit(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);