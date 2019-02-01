import React from 'react';
import { Tracker } from 'meteor/tracker';

import { Session } from 'meteor/session';


export default class LinkListFilters extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            showVisible: true,
        }
    }

    componentDidMount(){
        this.linksTracker = Tracker.autorun(() => {
            const showVisible = Session.get('showVisible');
            this.setState({showVisible});
        });
    }

    componentWillUnmount(){
        this.linksTracker.stop();
    }

    render(){
        return(
            <div>
                <label className="checkbox">
                    <input className="checkbox__box" type="checkbox" checked={!this.state.showVisible} onChange={(e) => {
                
                        Session.set('showVisible', !e.target.checked);
                    }}/>
                    show hidden links
                </label>
            </div>
        )
    }
    
}