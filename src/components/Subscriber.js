
import '../styles/App.css';
import {Card,Button,Modal,Form,Row,Col} from 'react-bootstrap';
import React,{Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import YouTubePlayer from "react-player";


class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {'available':[],modal:false,subscriber:"",uploads:[]}
    }
    componentDidMount = async() =>{
        var obj = {subscribed_by: this.props.username}
        var response = await axios.post('http://localhost:5000/api/list',{obj});
        var subscribers = [response.data.subscribers]
        this.setState({available:subscribers})
        var obj = {username:this.props.username}
        var contents = await axios.post('http://localhost:5000/api/getContent',{obj});
        var uploads = [contents.data.contents]
        this.setState({available:subscribers,uploads:uploads})
    }
    update = async() => {
        var obj = {subscribed_by: this.props.username}
        var response = await axios.post('http://localhost:5000/api/list',{obj});
        var subscribers = [response.data.subscribers]
        var obj = {username:this.props.username}
        var contents = await axios.post('http://localhost:5000/api/getContent',{obj});
        var uploads = [contents.data.contents]
        this.setState({available:subscribers,uploads:uploads})
    }
    handleModal = () => {
        this.setState({modal:!this.state.modal})
    }
    handleSubscriber = (event) => {
        this.setState({subscriber:event.target.value})
    }
    subscribe = async(event) => {
        event.preventDefault();
        this.setState({modal:!this.state.modal})
        var obj = {subscribed_by:this.props.username,subscribed_to:this.state.subscriber}
        var response = await axios.post('http://localhost:5000/api/add',{obj})
        if(response.data.status){
            alert(response.data.message)
        }
        else{
            alert("Try again later")
        }
        this.update();
    }
    reRender = () => {
        this.update();
        this.props.stop();
    }
    render(){
        if (this.props.render)
        {
            this.reRender();
        }
        return(
            <div className="rest">
                <p>Available Content Creators:&emsp;<Button variant="outline-primary" onClick={this.handleModal}>Click Here</Button></p>
                <Modal show={this.state.modal} onHide={this.handleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Available Content Creators</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.subscribe} method="POST">
                            <Form.Label>Account Type</Form.Label>
                                <Form.Control as="select" onChange={this.handleSubscriber}  name="subscriber" required={true}>
                                <option>Select</option>
                                {this.state.available.map((avail) => (
                                        avail.map((objects,index)=>(
                                            <option key={index} value={objects.username}>{objects.username}</option>
                                        ))
                                    ))
                                }
                            </Form.Control> 
                            <Modal.Footer>
                                        <Button variant="primary" type="submit">
                                            Submit
                                        </Button>
                                        <Button variant="secondary" onClick={this.handleModal}>
                                            Close
                                        </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal.Body>
                </Modal>
                        
                <p>Videos Uploaded by Your Stars</p>
                <Row>
                    {this.state.uploads.map((videos)=>(
                        videos.map((obj,index)=> (
                            <Col key={index} sm={4}>
                                <Card style={{ width: 'fitContent', backgroundColor:"transparent" }}>
                                <YouTubePlayer url={obj.link} width="fitContent" ></YouTubePlayer>
                                    <Card.Body>
                                        <Card.Text>
                                        {obj.description}
                                        </Card.Text>
                                        <a href={obj.link} >Open Video</a>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ))}    
                </Row>
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
