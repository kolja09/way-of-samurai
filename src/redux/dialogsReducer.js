const ADD_MESSAGE = 'messages/ADD-MESSAGE';

let initialState = {
    dialogs: [
        {id: 1, name: 'Andrey'},
        {id: 2, name: 'Oleg'},
        {id: 3, name: 'Mykola'},
        {id: 4, name: 'Anna'},
        {id: 5, name: 'Olena'}
    ],
    messages: [
        {id: 1, message: 'Hello'},
        {id: 2, message: 'How are your?'},
        {id: 3, message: 'Well done!!!'},
    ],
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let text = action.newMessageText
            return  {
                ...state,
                messages:[...state.messages, {id:4, message: text}]
            }
        default:
            return state
    }
}

export const addMessage = (newMessageText) => ({type: ADD_MESSAGE, newMessageText});

export default dialogsReducer