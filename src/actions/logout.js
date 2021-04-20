const signout= (username,type) => {
    return {
        type : "SIGNOUT",
        payload: username,
        acctype: type
    }
}
export default signout;