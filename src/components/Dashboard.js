
import '../styles/App.css';
import {Container,Button} from 'react-bootstrap';
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Subscriber from './Subscriber'
import Creator from './Creator'
import '../styles/dashboard.css'

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {}
          
    }
    handlelogout = () => {
        this.props.logout({username:"",type:""})
        this.props.history.push('/')
    }
    check = () => {
        if(!this.props.active)
        this.props.history.push('/')
    }
    render(){
        this.check()
        return(
            <div className="start">
                <div className="dash-left">
                        <p>Welcome, {this.props.username}.</p>
                </div>
                <div className="dash-right">
                        <p><Button variant="outline-info" onClick={this.handlelogout}>Logout</Button></p>
                </div>
                <br /><br />
                {this.props.type=="subscriber" && <Subscriber /> }
                {this.props.type=="creator" && <Creator />}
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
