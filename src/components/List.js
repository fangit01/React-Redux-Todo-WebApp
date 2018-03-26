import React, { Component } from 'react';
import { connect } from 'react-redux';
import './List.css';
import { removeItem, initialFetchingFromServer, addItem, moveItemToCompleted, removeItemFromCompleted, moveBackToTodo } from '../actions/allActions'
import { bindActionCreators } from 'redux';


class List extends Component {
    state = {
        inputvalue: '',
        closeTips:'no'
    }

    componentWillMount = () => {
        this.props.initialFetchingFromServer(this.props.todos.userInfo.username, this.props.todos.userInfo.token);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addItem(this.props.todos.userInfo.username, this.props.todos.userInfo.token, this.state.inputvalue);
        this.setState({ inputvalue: '' })
    }

    handleChange = (e) => {
        this.setState({ inputvalue: e.target.value })
    }


    render() {
        return (
            <div>
                <h3>{this.props.todos.userInfo.username}'s Todo List</h3>

                { localStorage.getItem('closeTips') === 'yes' || this.state.closeTips === 'yes'? null:
                 <div className="alert alert-warning" role="alert">
                 Tips: Yuo can click on the item text to mark it completed / move back to todo list.
                 <button onClick={()=>{localStorage.setItem('closeTips','yes');this.setState({closeTips:'yes'})}} type="button" className="close" aria-label="Close">
                     <span aria-hidden="true"> &times;</span>
                 </button>
             </div>
                }
               
                {this.props.todos.tasks.length !== 0 ?
                    <ul className="list-group">
                        {this.props.todos.tasks.map((item, index) => {
                            return (
                                <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <span style={{ cursor: "pointer" }} onClick={() => this.props.moveItemToCompleted(this.props.todos.userInfo.username, this.props.todos.userInfo.token, item._id)}>{index + 1}: {item.name}</span>
                                    <span style={{ cursor: "pointer" }} className="badge badge-danger badge-pill" onClick={() => this.props.removeItem(this.props.todos.userInfo.username, this.props.todos.userInfo.token, item._id)}>X</span>
                                </li>)
                        })}
                    </ul> : <div className="alert alert-light" role="alert" style={{ textAlign: 'left' }}>No item in the completed list.</div>
                }

                <div style={{ marginTop: "1rem" }}>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" name="item" value={this.state.inputvalue} onChange={this.handleChange} />
                        <button type="submit" className="btn btn-success btn-sm">Add</button>
                    </form>
                </div>




                <h3 className="mt-5 mb-3">Completed:</h3>
                {this.props.todos.completedTasks.length !== 0 ?
                    <div>
                        <ul className="list-group">
                            {this.props.todos.completedTasks.map((item, index) => {
                                return (
                                    <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                                        <span style={{ cursor: "pointer" }} onClick={() => this.props.moveBackToTodo(this.props.todos.userInfo.username, this.props.todos.userInfo.token, item._id)}><i className="fa fa-check-circle-o fa-lg" aria-hidden="true"></i> {index + 1}: {item.name}</span>
                                        <span style={{ cursor: "pointer" }} className="badge badge-danger badge-pill" onClick={() => this.props.removeItemFromCompleted(this.props.todos.userInfo.username, this.props.todos.userInfo.token, item._id)}>X</span>
                                    </li>)
                            })}
                        </ul>
                    </div> : <div className="alert alert-light" role="alert" style={{ textAlign: 'left' }}>No item in the completed list.</div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        todos: state
    }

}


function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        initialFetchingFromServer,//import from allActions.js
        removeItem,
        addItem,
        moveItemToCompleted,
        removeItemFromCompleted,
        moveBackToTodo

    }, dispatch);
}

//must have function matchDispatchToProps(dispatch) if we want to use redux /async, otherwise we can use this.props.dispatch({}) to dispatch action. 

export default connect(mapStateToProps, matchDispatchToProps)(List);

