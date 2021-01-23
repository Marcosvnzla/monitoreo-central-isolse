import React, { Component, Fragment } from 'react';
import Input from '../../components/UI/Input/Input';

class Auth extends Component {
  render () {
    let form = (
      <form>
        <Input elementType="input" label="email"></Input> 
        <Input elementType="input" label="password"></Input> 
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