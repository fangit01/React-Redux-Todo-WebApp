var initial_state = {
    tasks: [],
    completedTasks: [],
    userInfo: {}
};


var rootReducers = (state = initial_state, action) => {
    switch (action.type) {

        case 'INITIAL_FETCHING_DATA_FROM_SERVER':
            return {
                ...state,
                tasks: [...action.payload[0]],
                completedTasks: [...action.payload[1]]
            }

        case 'USER_LOGOUT':
            return {
                ...state,
                userInfo: {}
            }

        case 'USER_SUCCESS_LOGIN':
            return {
                ...state,
                userInfo: { ...state.userInfo, ...action.payload }
            }

        case 'ADD_ITEM':
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            }

        case 'REMOVE_ITEM':
            var filtertasksArray = state.tasks.filter(item => { return item._id !== action.payload })

            return {
                ...state,
                tasks: filtertasksArray
            }


        case 'MOVE_ITEM_TO_COMPLETED':
            var filtertasksArray1 = state.tasks.filter(item => {
                return item._id !== action.payload.id
            });
            return {
                ...state,
                tasks: filtertasksArray1,
                completedTasks: [...state.completedTasks, action.payload.res.data]
            }

        case 'MOVE_BACK_TO_TODO':
            var filtertasksArray3 = state.completedTasks.filter(item => {
                return item._id !== action.payload.id
            });
            return {
                ...state,
                completedTasks: filtertasksArray3,
                tasks: [...state.tasks, action.payload.res.data]
            }


        case 'REMOVE_ITEM_FROM_COMPLETED':
            var filtertasksArray2 = state.completedTasks.filter(item => { return item._id !== action.payload })
            return {
                ...state,
                completedTasks: filtertasksArray2
            }

        default:
            return state;
    }
}

export default rootReducers;


