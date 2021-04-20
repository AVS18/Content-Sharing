const defaultState = {
    login : 'true',
    username : 'none',
    acctype: 'type'
}
var exec = (state = defaultState, action) => {
    const { type, payload } = action;
    switch (type) {
        case "SIGNEDIN":
            return {
                ...state,
                login:true,
                username:payload.username,
                acctype: payload.type
            }
        case "SIGNOUT":
            return {
                ...state,
                login:false,
                username:payload.username,
                acctype: payload.type
            }
        default: {
            return {
                ...state,
                login:false,
                username:"",
                acctype: ""
            }
        }
    }
}

export default exec;