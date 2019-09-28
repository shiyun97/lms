import React, { Component } from "react";
import { MDBEdgeHeader, MDBContainer, MDBRow, MDBCol, MDBJumbotron, MDBAnimation } from "mdbreact";
import { observer, inject } from 'mobx-react'
import { Redirect } from "react-router-dom";
import axios from "axios";

@inject('dataStore')
@observer
class AdminLoginPage extends Component {

  state = {
    loggedInStatus: false,
    email: "",
    password: "",
    message: ""
  }

  handleChangeEmail = event => this.setState({ email: event.target.value });
  handleChangePassword = event => this.setState({ password: event.target.value });

  checkLogIn = () => {
    event.preventDefault();

    axios
      .post("http://localhost:3001/login", {
        user: {
          email: this.state.email,
          password: this.state.password
        }
      })
      .then(result => {
        this.setState({
          message: result.statusText
        });
        if (this.state.message === "Created") {
          this.props.dataStore.setSignInStatus(true, this.state.email, this.state.password, "admin")
          this.setState({ loggedInStatus: true })
        }
        else {
          console.log("Invalid email/password.")
        }
      })
      .catch(error => {
        console.error("error in axios " + error);
      });
  }

  render() {
    if (this.state.loggedInStatus === true) {
      return <Redirect to={this.props.dataStore.getPath} />
    }
    return (
      <>
        <MDBEdgeHeader color="indigo darken-3" className="loginPage" />
        <MDBAnimation type="zoomIn" duration="500ms">
          <MDBContainer>
            <MDBRow>
              <MDBCol md="8" className="mt-3 mx-auto">
                <MDBJumbotron>
                  <h1 className="text-center" style={{ fontWeight: "bold" }}>
                    MODREG
                </h1>
                  <h3 className="text-center">
                    Administration Login
                </h3>
                  <ul className="list-unstyled example-components-list">
                    <form onSubmit={this.checkLogIn}>
                      <br />
                      <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                        Email
                </label>
                      <input type="email" onChange={this.handleChangeEmail} id="defaultFormRegisterEmailEx" className="form-control" />
                      <br />
                      <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
                        Password
                </label>
                      <input type="password" onChange={this.handleChangePassword} id="defaultFormRegisterPasswordEx" className="form-control" />
                      <div className="text-center mt-4">
                        <button className="btn btn-indigo">
                          Login
                        </button>
                        <br />
                        <br />
                      </div>
                    </form>
                  </ul>
                </MDBJumbotron>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBAnimation>
      </>
    );
  }
}

export default AdminLoginPage;
