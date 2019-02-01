import React from 'react';
import { Link } from 'react-router-dom'
import { Accounts } from 'meteor/accounts-base'
import history from '../ui/history';

export default class Signup extends React.Component {

  constructor(props) {//mamy dostęp do wszystkich propsów
    super(props) //wywoływanie konstruktora klasy z której dziedziczymy React.Component i przekazujemy mu propsy aby dostał wszystko co potrzebuje
    this.state = {
      error: ''
    }
  }

  componentDidMount(){
    console.log('Entered public Page');
    if(Meteor.userId()){
      history.replace('/link');
    }
  }

  onSubmit(e){
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    console.log(this.refs.h1.value);
    Accounts.createUser({email, password}, (err) => {
      if(err){
        this.setState({error: err.reason}); 
      }else{
         this.setState({error: ''});
     }
    });

    if(password.length < 3){
      this.setState({error:"Password must have at least 3 chracters"}); 
    }
  }

  render(){
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1 ref="h1">Join to Short Link</h1>

            {this.state.error ? <p>{this.state.error}</p> : undefined}

            <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate> 
              <input type="email" ref="email" name="email" placeholder="Email"></input>
              <input type="password" ref="password" name="password" placeholder="Password"></input>
              <button className="button">Create Account</button>
            </form>

            <Link to="/Login">Already have an account</Link>
            
        </div>
      </div>
       
    )
  };
};

