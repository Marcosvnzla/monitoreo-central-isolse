import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styles from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import ImageContainer from '../../components/ImageContainer/ImageContainer';
import logo from '../../assets/images/bigLogo_img.png';
import lineBreaker from '../../assets/images/line_breaker.png';
import * as actions from '../../store/actions/index';

class Auth extends Component {
  state = {
    formData: {
      email: {
        elementType: 'input',
        value: '',
        elementConfig: {
          name: 'email',
          type: 'input',
          placeholder: 'Email'
        }
      },
      password: {
        elementType: 'input',
        value: '',
        elementConfig: {
          name: 'password',
          type: 'password',
          placeholder: 'Contraseña'
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

  login = (event) => {
    event.preventDefault();
    const email = this.state.formData.email.value;
    const password = this.state.formData.password.value;
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
        <Input elementType={formElement.config.elementType}
               value={formElement.config.value}
               changed={(event) => {this.inputChanged(event, formElement.id)}}
               key={formElement.id}
               elementConfig={formElement.config.elementConfig} />
      );
    });

    return (
      <div className={styles.Auth}>
        <form onSubmit={(event) => {this.login(event)}}>
          <ImageContainer imageImport={logo}/>
          {formElementsList}
          <Button btnType="Success">Ingresar</Button>
        </form>
        <ImageContainer imageImport={lineBreaker} moreStyles={{height: '400px'}}/>
        <div className={styles.extraInfo}>
          <h1>Extra</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eleifend non libero non cursus. Vivamus eu lectus interdum, maximus eros a, tincidunt elit. Etiam turpis magna, mollis sit amet tortor ut, ultricies ornare magna.</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (email, password) => dispatch(actions.authInit(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);