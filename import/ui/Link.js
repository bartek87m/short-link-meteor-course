import React from 'react';
import { Meteor } from 'meteor/meteor';

import history from '../ui/history'
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksList from './LinksList';
import LinkListFilters from './LinkListFilters';

export default class Linkpage extends React.Component {

    componentWillMount(){
        console.log(Meteor.userId());
        if(!Meteor.userId()){
            history.replace('/login');
            console.log(Meteor.userId());
        };
    };

    render(){
        return (
            <div>
                <PrivateHeader title="Your Links"/>
                <div className="page-content">
                    <LinkListFilters/>
                    <AddLink/> 
                <   LinksList/>
                </div>
              
            </div>          
        )
    };
};