import React, { Component, Fragment } from 'react';
import Input from '../../components/UI/Input/Input';

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
          type: 'input',
          placeholder: 'Password'
        }
      },
    }
  }

  inputChanged (event, formElement) {
    const updatedFormData = {
      ...this.state.formData
    }
    const updatedFormElement = {
      ...updatedFormData[formElement]
    }
    updatedFormElement.value = event.target.value;
    updatedFormData[formElement] = updatedFormElement;
    this.setState({formData: updatedFormData});
    console.log(this.state.formData[formElement].value);
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
               value={formElement.value}
               changed={(event) => {this.inputChanged(event, formElement.id)}}
               key={formElement.id} />
      );
    });

    return (
      <Fragment>
        <form>
          {formElementsList}
        </form>
      </Fragment>
    );
  }
}

export default Auth;