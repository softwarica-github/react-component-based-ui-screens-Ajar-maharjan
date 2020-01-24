import React from 'react';


import Axios from 'axios'
import {Redirect} from 'react-router-dom'
import {
	Form, Button
} from 'react-bootstrap';
class Registration extends React.Component{
	constructor(){
		super()

		this.state = {
			username: '',
			password: '',
			validationMessageUsername: '',
			validationMessage:'',
			redirect: false
		}
	}

	usernameChangeHandler = (event) =>{
		this.setState({username: event.target.value})
		if(event.target.value.length < 4){
			this.setState({validationMessageUsername:"Username must be more than 4 character"});
		}else{
			this.setState({validationMessageUsername: 'Username is available'});
		}
	}


	passwordChangeHandler = (event) =>{
		this.setState({password: event.target.value})

		if(event.target.value.length < 10){
			this.setState({validationMessage: 'Password must be more than 5 character'});
		}else{
			this.setState({validationMessage: 'This password is valid'});	
		}
	}

	SubmitHandler = (event) =>{
		event.preventDefault()

		console.log(this.state)

		var headers = {
			'Content-Type':'application/json'
		}

		var data = {
			username: this.state.username,
			password: this.state.password
		}
		Axios.post('http://localhost:3004/registration', data, headers)
		.then((res) => {
			console.log(res.data.status);
			if(res.status === 201){
				this.setState({redirect:true})
			}

		})
		.catch((err) => {

		})
	}

	render(){
		if(this.state.redirect){
			return(
				<Redirect to='/login' />
				)
		}

		return(
			<Form onSubmit={this.SubmitHandler}>
			  <Form.Group controlId="formBasicEmail" >
			    <Form.Label>Email address</Form.Label>
			    <Form.Control type="text" placeholder="Enter email" value={this.state.username} onChange={this.usernameChangeHandler} />
			    <Form.Text className="text-muted">
			      We will never share your email with anyone else.
			    </Form.Text>
			    <p>{this.state.validationMessageUsername}</p>
			  </Form.Group>

			  <Form.Group controlId="formBasicPassword">
			    <Form.Label>Password</Form.Label>
			    <Form.Control type="password" placeholder="Enter Password" value={this.state.password} onChange={this.passwordChangeHandler} />
			    <Form.Text className="text-muted">
			      We will never share your email with anyone else.
			    </Form.Text>
			    <p>{this.state.validationMessage}</p>
			  </Form.Group>

			 

			    <Button variant="primary" type="submit">
			    Submit
			  </Button>
			  </Form>)
		}
		
	
}

export default Registration
