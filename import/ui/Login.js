import React from 'react'
import { Link } from 'react-router-dom'
import { Meteor } from 'meteor/meteor';
import history from '../ui/history';

export default class Login extends React.Component {

    constructor(props) {//mamy dostęp do wszystkich propsów
        super(props) //wywoływanie konstruktora klasy z której dziedziczymy React.Component i przekazujemy mu propsy aby dostał wszystko co potrzebuje
        this.state = {
          error: ''
        };
      };

    componentDidMount(){
        if(Meteor.userId()){
        history.replace('/link');
        };
    };
    
    onSubmit(e){
        e.preventDefault();

        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();
    
        Meteor.loginWithPassword({email}, password, (err) => {
            if(err){
               this.setState({error: err.reason}); 
            }else{
                this.setState({error: ''});
            }
            
        });
    };

    render(){
        return (
            <div className="boxed-view">
              <div className="boxed-view__box">
                <h1 ref="h1">Join to Short Link</h1>

                {this.state.error ? <p>{this.state.error}</p> : undefined}

                <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate> 
                <input type="email" ref="email" name="email" placeholder="Email"></input>
                <input type="password" ref="password" name="password" placeholder="Password"></input>
                <button className="button">Login</button>
                </form>

                <Link to="/signup">Have an accoun?t</Link>
              </div>                
            </div>

        )
    };
};