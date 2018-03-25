import React, { Component } from 'react';
import { connect } from 'react-redux';
import './List.css';
import Login from './Login';
import List from './List';


class Homepage extends Component {
    render() {
        return (
            <div>
                {this.props.todos.userInfo.username === undefined ? <Login /> : <List />}
            </div>
        )
    }
}

function mapStateToProps(reduxInitialState) {
    return {
        todos: reduxInitialState
    }

}
export default connect(mapStateToProps)(Homepage);

