import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
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
          placeholder: 'Password'
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

  login = () => {
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
               label={formElement.id}
               value={formElement.config.value}
               changed={(event) => {this.inputChanged(event, formElement.id)}}
               key={formElement.id}
               elementConfig={formElement.config.elementConfig} />
      );
    });

    return (
      <Fragment>
        <form>
          {formElementsList}
        </form>
          <Button btnType="Success" clicked={this.login}>Ingresar</Button>
      </Fragment>
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