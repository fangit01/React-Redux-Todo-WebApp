import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Logout extends Component {
    componentWillMount() {
        localStorage.clear();
        this.props.dispatch({type:'USER_LOGOUT'});        
    }

    render() {
        return (
            <div>
                <h3>logout successfully!</h3>
                <li className="d-inline p-3"><Link to='/'>Click to login again</Link></li>
            </div>
        )
    }
}

export default connect()(Logout);
