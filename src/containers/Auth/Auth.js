import React, { Component, Fragment } from 'react';
import Input from '../../components/UI/Input/Input';

class Auth extends Component {
  state = {
    formData: {
      email: {
        value: ''
      },
      password: {
        value: ''
      },
    }
  }

  inputChanged (event) {
    console.log(event.target.value);
  }

  render () {
    let form = (
      <form>
        <Input elementType="input" label="email" value={this.state.formData.email.value} changed={this.inputChanged} /> 
        <Input elementType="input" label="password" value={this.state.formData.password.value} changed={this.inputChanged} />
      </form>
    );

    return (
      <Fragment>
        <div>
          {form}
        </div>
      </Fragment>
    );
  }
}

export default Auth;