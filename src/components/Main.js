
import '../styles/App.css';
import {Container,Button,Modal,Form} from 'react-bootstrap';
import React,{Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'


class App extends Component{
    constructor(props){
        super(props)
        this.state = {login: false,signup:false, username:"", password:"", name:"", email:"",type:""}
    }
    handleLogin = () =>{
        this.setState({login: !this.state.login})
    }
    handleSign = () =>{
        this.setState({signup:!this.state.signup})   
    }
    handleLoginData = (event) => {
        this.setState({[event.target.name]:event.target.value})
    }
    handleSignupData = (event) => {
        this.setState({[event.target.name]:event.target.value})
    }
    handleUserLogin = async(event) => {
        event.preventDefault();
        this.setState({login:!this.state.login})
        var obj = {
            username:this.state.username,
            password:this.state.password
        }
        const response = await axios.post('http://localhost:5000/api/login', { obj })
        if (response.data.status){
            alert('login success')
            this.props.login({username:this.state.username,type:response.data.type})
            console.log(this.props.username)
            this.props.history.push('/dashboard')
        }
        else{
            alert('login failed')
        }
        this.setState({username:"",password:""})
    }
    handleUserReg = async(event) => {
        event.preventDefault();
        this.setState({signup:!this.state.signup})
        var obj = {
            name:this.state.name,
            email:this.state.email,
            username:this.state.username,
            password:this.state.password,
            type: this.state.type
        }
        console.log(obj)
        const response = await axios.post('http://localhost:5000/api/create', { obj })
        if (response.data.status){
            alert(response.data.message)
        }
        else{
            alert(response.data.message)
        }
        this.setState({username:"",password:""})
    }
    render(){
        return(
            <div className="App">
                <header className="App-header">
                    <Container>
                        <p>Welcome to Resource Sharing System</p>
                        <Button variant="primary" onClick={this.handleLogin}>Login</Button> &emsp;
                        <Button variant="info" onClick={this.handleSign}>Sign Up</Button>

                        <Modal show={this.state.login} onHide={this.handleLogin}>
                            <Modal.Header closeButton>
                                <Modal.Title>Login</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={this.handleUserLogin} method="POST">
                                    <Form.Group controlId="formBasicUsername">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="text" minLength={8} placeholder="Enter Username" value={this.state.username} onChange={this.handleLoginData} name="username" required={true} />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" minLength={8} placeholder="Password" value={this.state.password} onChange={this.handleLoginData}  name="password" required={true} />
                                    </Form.Group>
                                    <Modal.Footer>
                                        <Button variant="primary" type="submit">
                                            Submit
                                        </Button>
                                        <Button variant="secondary" onClick={this.handleLogin}>
                                            Close
                                        </Button>
                                    </Modal.Footer>
                                </Form>
                            </Modal.Body>
                        </Modal>
                        <Modal show={this.state.signup} onHide={this.handleSign} method="POST">
                            <Modal.Header closeButton>
                                <Modal.Title>Register</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={this.handleUserReg}>
                                    <Form.Group controlId="formBasicName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter First Name" value={this.state.name} onChange={this.handleSignupData} name="name" required={true} />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Enter your Email Address" value={this.state.email} onChange={this.handleSignupData}  name="email" required={true} />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicUsername">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="text" minLength={8} placeholder="Enter Username" value={this.state.username} onChange={this.handleSignupData} name="username" required={true} />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" minLength={8} placeholder="Password" value={this.state.password} onChange={this.handleSignupData}  name="password" required={true} />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicType">
                                        <Form.Label>Account Type</Form.Label>
                                        <Form.Control as="select" onChange={this.handleSignupData}  name="type" required={true}>
                                            <option>Select</option>
                                            <option value="creator">creator</option>
                                            <option value="subscriber">subscriber</option>
                                        </Form.Control> 
                                    </Form.Group>
                                    <Modal.Footer>
                                        <Button variant="primary" type="submit">
                                            Submit
                                        </Button>
                                        <Button variant="secondary" onClick={this.handleSign}>
                                            Close
                                        </Button>
                                    </Modal.Footer>
                                </Form>
                            </Modal.Body>
                        </Modal>
                    </Container>
                </header>
            </div>
        )}
}
  
const mapStateToProps = (state) =>
{
  return {active: state.session.login, username: state.session.username, type:state.session.acctype}
}
const mapDispatchToProps = (dispatch) => {
  return(
    bindActionCreators(
        {
            login: (value) => dispatch({type:'SIGNEDIN',payload:value}),
            logout: (value) => dispatch({type: 'SIGNOUT',payload:value})
        },
        dispatch)
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
