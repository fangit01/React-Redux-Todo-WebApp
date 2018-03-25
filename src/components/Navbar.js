import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Narbar extends Component {
    render() {
        return (
            <nav>
                <ul style={{ paddingLeft: '0px' }}>
                    <li className="d-inline p-3"><Link to='/'><i className="fa fa-home fa-lg" aria-hidden="true"></i> HOME</Link></li>

                    {/* conditionally render login or logout */}
                    {this.props.todos.userInfo.username !== undefined ?
                        // <li className="d-inline p-3"><Link to='/login'><i class="fa fa-user-circle-o fa-lg" aria-hidden="true"></i> Login</Link></li> :
                        <li className="d-inline p-3"><Link to='/logout'><i className="fa fa-sign-out fa-lg" aria-hidden="true"></i> LOGOUT</Link></li> : null
                    }


                    {/* logout function is in the app.js */}
                    <li className="d-inline p-3"><Link to={{
                        pathname: '/about',
                        hash: '#search',
                        search: '?order=123'
                    }}><i className="fa fa-info-circle fa-lg" aria-hidden="true"></i> ABOUT</Link></li>
                </ul>

            </nav>
        )
    }
}


function mapStateToProps(reduxInitialState) {
    return {
        todos: reduxInitialState
    }
}

export default connect(mapStateToProps)(Narbar);
