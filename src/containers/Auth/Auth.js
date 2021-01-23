import React, { Component } from 'react';
import MainDisplay from '../../components/MainDisplay/MainDisplay';
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
      <MainDisplay>
        {form}
      </MainDisplay>
    );
  }
}

export default Auth;