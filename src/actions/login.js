const signedin = (username,type) => {
    return {
        type: "SIGNEDIN",
        payload: username,
        acctype: type
    }
} 

export default signedin;