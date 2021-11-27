import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";
import sidebarReducer from "./sidebarReducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are you?', likesCount: 3},
                {id: 2, message: 'It\'s my first post', likesCount: 45},
                {id: 3, message: 'Well done', likesCount: 23},
                {id: 4, message: 'good', likesCount: 16},
            ],
            newPostText: 'it-kamasutra',
        },
        dialogsPage: {
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
            newMessageText: 'new message',
        },
        sidebar: [
            {id: 1, name: 'Profile', path: '/profile'},
            {id: 2, name: 'Messages', path: '/dialogs'},
            // {id: 3, name: 'News', path: '/news'},
            // {id: 4, name: 'Music', path: '/music'},
            // {id: 5, name: 'Settings', path: '/settings'}
        ],
    },
    _rerenderAllTree() {
        console.log('changed')
    },
    getState() {
        return this._state
    },
    subscribe(observer) {
        this._rerenderAllTree = observer
    },
    dispatch(action) {
       this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
       this._state.profilePage = profileReducer(this._state.profilePage, action)
       this._state.sidebar = sidebarReducer(this._state.sidebar, action)
       this._rerenderAllTree(this._state)
    },
}

export default store;

window.store = store;