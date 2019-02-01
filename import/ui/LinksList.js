import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';
import { Links } from '../api/links';
import LinksListItem from './LinkListItem';

export default class LinksList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            links: []
        };
    };

    componentDidMount(){
        this.linksTracker = Tracker.autorun(() => {
            Meteor.subscribe('linksPublication');//subskrybujemy do linksPblication
            const links = Links.find({
                visible: Session.get('showVisible')
            }).fetch();
            this.setState({links});
        });
    };

    componentWillUnmount(){
        this.linksTracker.stop();
    }
    
    renderLinksListItem() {

        if(this.state.links.length === 0){
            return (
                <div className="item">
                    <p className="item-status-message">
                        No links found
                    </p>
                </div>
            ) 
            
        }else{
             return this.state.links.map((link) => {
//... - spread operator powoduje że każda wartość w link będzie podawana jako osobny props.nazwa
            const shortUrl = Meteor.absoluteUrl(link._id);
            return <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>;
            // return <p key={link._id}>{link.url}</p>
            // console.log(link)
        });
        }

       
    };

    render(){
        return (
            <div>
                <FlipMove maintainContainerHeight={true}>
                    {this.renderLinksListItem()}
                </FlipMove>
            </div>
        );
    }
}