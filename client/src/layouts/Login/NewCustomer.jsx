import React, { Component } from "react";
import axios from "axios";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import logo from "assets/img/logo.png";
import Footer from "../Footer/Footer";

class NewCustomer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      error: '',
      showPassword: false
    };

    this.provinces = ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon Territory"];
    this.amounts = ['0', '< 25$', '< 50$', '< 100$', '< 150$', '150$ +'];
  }

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  handleInputChange = (event, state) => {
    this.setState({
      [state]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const {
      firstname,
      lastname,
      email,
      password,
      streetaddress,
      city,
      postal,
      province,
      phone,
      amount
    } = this.state;

    const api = '/customer/new';
    const customer = {
      firstname,
      lastname,
      email,
      password,
      streetaddress,
      city,
      postal,
      province,
      phone,
      amount
    }

    axios({
      method: 'post',
      url: api,
      data: customer
    })
    .then(function(response) {
      console.log(response);
    }.bind(this));
  }

  render() {
    const provinces = 
      this.provinces.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ));
    const amounts = 
      this.amounts.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ));
    return (
      <form onSubmit={this.handleSubmit} style={{ marginTop: '30px'}}>
        <GridContainer>
          <GridItem xs={1} sm={2} md={3}>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <div className='login-logo'>
              <img src={logo} alt={'LOGO'} style={{width:'200px'}} />
            </div>
            <Card>
              <CardHeader color="warning">
                <h4>New Customer</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  
                  <GridItem xs={12} sm={6} md={6}>
                    <CustomInput
                      labelText="First Name"
                      id="firstname"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type:"text",
                        value: this.state.firstname,
                        onChange: (e) => this.handleInputChange(e, 'firstname'),
                        required: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                    <CustomInput
                      labelText="Last Name"
                      id="lastname"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type:"text",
                        value: this.state.lastname,
                        onChange: (e) => this.handleInputChange(e, 'lastname'),
                        required: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                    <CustomInput
                      labelText="Email"
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type:"email",
                        autoComplete:"false",
                        value: this.state.email,
                        onChange: (e) => this.handleInputChange(e, 'email'),
                        required: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                    <CustomInput
                      labelText="Password"
                      id="password"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type:this.state.showPassword ? "text" : "password",
                        value: this.state.password,
                        onChange: (e) => this.handleInputChange(e, 'password'),
                        required: true,
                        endAdornment:
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={this.handleClickShowPassword}
                              onMouseDown={this.handleMouseDownPassword}
                            >
                              {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                    <CustomInput
                      labelText="Street Address"
                      id="streetaddress"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type:"text",
                        value: this.state.streetaddress,
                        onChange: (e) => this.handleInputChange(e, 'streetaddress'),
                        required: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                    <CustomInput
                      labelText="City"
                      id="city"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type:"text",
                        value: this.state.city,
                        onChange: (e) => this.handleInputChange(e, 'city'),
                        required: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                    <CustomInput
                      labelText="Postal Code"
                      id="postal"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type:"text",
                        value: this.state.postal,
                        onChange: (e) => this.handleInputChange(e, 'postal'),
                        required: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                    <TextField
                      id="province"
                      select
                      label="Province"
                      value={this.state.province || "Quebec"}
                      onChange={(e) => this.handleInputChange(e, 'province')}
                      margin="normal"
                      fullWidth
                      className="select-input"
                    >
                      {provinces}
                    </TextField>
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                    <CustomInput
                      labelText="Phone"
                      id="phone"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type:"tel",
                        value: this.state.phone,
                        onChange: (e) => this.handleInputChange(e, 'phone'),
                        required: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                    <TextField
                      id="amount-per-week"
                      select
                      label="Amount spent on meat per week"
                      value={this.state.amount || "< 25$"}
                      onChange={(e) => this.handleInputChange(e, 'amount')}
                      margin="normal"
                      fullWidth
                      className="select-input"
                    >
                      {amounts}
                    </TextField>
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="info" className='add-button create' onClick={this.props.toggleLoginAndNewCustomer}>
                  Have an account?
                </Button>
                <Button color="warning" className='add-button create'  type='submit'>
                  Submit
                </Button>
              </CardFooter>
            </Card>
            </GridItem>
            <GridItem xs={1} sm={2} md={4}>
          </GridItem>
        </GridContainer>
        <div className={'forgot-password-message'}>{this.state.message}</div>
        <div className={'forgot-password-error'}>{this.state.error}</div>
        <Footer />
      </form>
    );
  }
}

export default NewCustomer;
