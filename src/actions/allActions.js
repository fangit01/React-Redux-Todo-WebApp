import axios from 'axios';
// export const loginReturnInfo = (userInfo)=>{
//     return {
//         type:'USER_SUCCESS_LOGIN',
//         payload:userInfo

//     }
// }
// dispatch inline(using this.props.dispatch) in the login.js


export const logout = () => {
    return {
        type: 'USER_LOGOUT'

    }
}

export const addItem = (username, token, task) => {
    return dispatch => {
        if(task===""){
            dispatch({
                type:'DONT_DO_ANYTHING'
            })
        }else{
        axios.post(`http://localhost:5000/todos/users/${username}/tasks/new`, { taskname: task },
            {
                headers: { 'x-access-token': token }
            }).then(res => {
                if(res.status === 200) {
                    dispatch({
                        type: 'ADD_ITEM',
                        payload: res.data
                    })
                }
               
            })
    }}
};



export const initialFetchingFromServer = (username, token) => {
    return dispatch => {
        axios.get(`http://localhost:5000/todos/users/${username}`,
            {
                headers: { 'x-access-token': token }
            })
            .then(response => {
                dispatch({
                    type: "INITIAL_FETCHING_DATA_FROM_SERVER",
                    payload: response.data
                });
            });
    }
};


export const removeItem = (username, token, id) => {
    return dispatch => {
        axios.delete(`http://localhost:5000/todos/users/${username}/tasks/${id}/`,
            {
                headers: { 'x-access-token': token }
            }).then(res => {
                dispatch({
                    type: 'REMOVE_ITEM',
                    payload: id
                })
            })
    }
};

export const removeItemFromCompleted = (username, token, id) => {
    return dispatch => {
        axios.delete(`http://localhost:5000/todos/users/${username}/tasks/completed/${id}/`,
            {
                headers: { 'x-access-token': token }
            }).then(res => {
                dispatch({
                    type: 'REMOVE_ITEM_FROM_COMPLETED',
                    payload: id
                })
            })
    }
};

export const moveItemToCompleted = (username, token, id) => {
    return dispatch => {
        axios.post(`http://localhost:5000/todos/users/${username}/tasks/${id}/movetocompleted`,
            {
                headers: { 'x-access-token': token }
            }).then(res => {
                
                
                if(res.status === 200 && res.data!==''){
                    dispatch({
                        type: 'MOVE_ITEM_TO_COMPLETED',
                        payload: { res, id }
                    })
                }
            })
    }
};


export const moveBackToTodo = (username, token, id) => {
    return dispatch => {
        axios.post(`http://localhost:5000/todos/users/${username}/tasks/${id}/movebacktotodo`,
            {
                headers: { 'x-access-token': token }
            }).then(res => {
                console.log(res);
                if(res.status === 200 && res.data!==''){
                    dispatch({
                        type: 'MOVE_BACK_TO_TODO',
                        payload: { res, id }
                    })
                }
            })
    }
};




