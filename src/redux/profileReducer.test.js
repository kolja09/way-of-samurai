import profileReducer, {addPost} from "./profileReducer";

let state = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 3},
        {id: 2, message: 'It\'s my first post', likesCount: 45},
        {id: 3, message: 'Well done', likesCount: 23},
        {id: 4, message: 'good', likesCount: 16},
    ]
};

it('length of posts should be incremented', () => {
    let action = addPost('it')
   let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(5)
});

it('message of new post should be correct', () => {
    let action = addPost('it')
    let newState = profileReducer(state, action)
    expect(newState.posts[4].message).toBe('it')
});

it('message of new post should be correct', () => {
    let action = addPost(0)
    let newState = profileReducer(state, action)
    expect(newState.posts[4].likesCount).toBe(0)
});

