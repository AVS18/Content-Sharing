
import '../styles/App.css';
import {Container,Button,Modal,Form} from 'react-bootstrap';
import React,{Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Subscriber from './Subscriber'

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {mc:false,link:"",description:"",render:false}
    }
    handleContentData = (event) => {
        this.setState({[event.target.name]:event.target.value})
    }
    handleContentModal = () => {
        this.setState({mc:!this.state.mc})
    }
    addContent = async(event) => {
        event.preventDefault();
        var obj = {username:this.props.username,link:this.state.link,description:this.state.description}
        this.setState({mc:!this.state.mc,render:true,link:"",description:""})
        var response = await axios.post('http://localhost:5000/api/createContent',{obj})
        alert(response.data.message)
    }
    stopRender = () =>
    {
        this.setState({render:false})
    }
    render(){
        return(
            <div className="rest">
                <p>Add Content: &emsp;<Button variant="outline-primary" onClick={this.handleContentModal}>Click Here</Button></p>
                <Modal show={this.state.mc} onHide={this.handleContentModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Content</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.addContent} method="POST">
                            <Form.Label controlId="link">Link</Form.Label>
                            <Form.Control type="url" placeholder="Enter Youtube URL" value={this.state.link} onChange={this.handleContentData}  name="link" required={true} />
                            <Form.Label controlId="link">Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter Short Description" value={this.state.description} onChange={this.handleContentData}  name="description" required={true} />
                            <Modal.Footer>
                                        <Button variant="primary" type="submit">
                                            Submit
                                        </Button>
                                        <Button variant="secondary" onClick={this.handleContentModal}>
                                            Close
                                        </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal.Body>
                </Modal>
                <Subscriber render={this.state.render} stop={this.stopRender}/>
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

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
