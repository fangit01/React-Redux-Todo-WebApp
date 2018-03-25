import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Login extends Component {
    state = {
        usernameInputField: '',
        passwordInputField: '',
        loginStatus: '',
        resDataMessage: null
    }

    usernameInputChange = (e) => {
        this.setState({ usernameInputField: e.target.value })
    }

    passwordInputChange = (e) => {
        this.setState({ passwordInputField: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ usernameInputField: '', passwordInputField: '', loginStatus: 'logging now...' });
        setTimeout(() => { if (this.state.loginStatus === "logging now...") { this.setState({ resDataMessage: 'error, connection timeout. please try again later.' }) } }, 5000);
        axios.post(`http://localhost:5000/login/`, { username: this.state.usernameInputField, password: this.state.passwordInputField })
            .then((res) => {
                // localStorage.setItem('user', res.data.username);
                // localStorage.setItem('token', res.data.token);
                // localStorage.setItem('tokenExpireTime', res.data.tokenExpiresIn);
                if (res.data.message === "Welcome back!") {
                    this.setState({ loginStatus: 'success' });
                    this.props.dispatch({
                        type: 'USER_SUCCESS_LOGIN',
                        payload: res.data
                    })
                } else {
                    this.setState({ loginStatus: 'error', resDataMessage: res.data.message })
                }

            })
    }

    render() {
        return (
            <form style={{ width: "300px", margin: "auto" }} onSubmit={(e) => { this.handleSubmit(e) }}>
                <div className="form-group">
                    {/* <label>Username</label> */}
                    <input name="username" value={this.state.usernameInputField} onChange={(e) => this.usernameInputChange(e)} autoComplete="" className="form-control" aria-describedby="emailHelp" placeholder="username" />
                    <small id="emailHelp" className="form-text text-muted">This web app is for demo purpose only. <br/>Please use the provided demo accounts to login.</small>
                </div>
                <div className="form-group">
                    {/* <label>Password</label> */}
                    <input type="password" value={this.state.passwordInputField} onChange={(e) => this.passwordInputChange(e)} name="password" autoComplete="new-password" className="form-control" placeholder="password" />
                </div>
                {this.state.loginStatus === 'logging now...' ? <button type="submit" className="btn btn-success ml-4 mr-4">Logging now...<i className="fa fa-spinner fa-pulse fa-fw"></i></button>
                    : <button type="submit" className="btn btn-success ml-4 mr-4">Login</button>}
                <p>{this.state.resDataMessage}</p>
            </form>
        )
    }
}

export default connect()(Login);
