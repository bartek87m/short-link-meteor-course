import { Meteor } from 'meteor/meteor';
import React from 'react';
import Clipboard from 'clipboard';
import moment from 'moment';
import PropTypes from 'prop-types';

export default class LinksListItem extends React.Component {
  
    constructor(props){
        super(props);
        this.state = {
            isCopied: false
        }
    }
    

    componentDidMount(){
        this.clipboard = new Clipboard(this.refs.copy); //zmienna lokalna z this
        
        this.clipboard.on('success', () => {
            this.setState({isCopied: true})
            setTimeout(() => {
                this.setState({isCopied: false})
            }, 1000)
        }).on('error', () => {
            alert('Doesn\'t work');
        })
    }

    componentWillUnmount(){
        this.clipboard.destroy();
    }

    renderStats(){

        const visitMessage = this.props.visitedCount === 1 ? 'visit' :'visits';
        let visitedMessage = null;

        if(typeof(this.props.lastVisitedAt) === 'number'){
            visitedMessage = `(visited ${moment(this.props.lastVisitedAt).fromNow()})`;
        
        }

        return <p className="item__message">{this.props.visitedCount} - {visitMessage} {visitedMessage}</p>

    }

    render(){
        return (
            <div className="item">
                <h2>{this.props.url}</h2>
                <p className="item__message">{this.props.shortUrl}</p>
                {this.renderStats()}
                <a className="button button--pill" href={this.props.shortUrl} target="_blank">
                    visit
                </a>
                <button className="button button--pill" ref='copy' data-clipboard-text={this.props.shortUrl}>
                    {this.state.isCopied ? 'Copied' : 'Copy'}
                </button>
                <button className="button button--pill" onClick={() => {
                    Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
                }}>
                    {this.props.visible ? 'Hide' : 'Unhide'}
                </button>
            </div>
        )   
    }
}

LinksListItem.propTypes = {
    _id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    shortUrl: PropTypes.string.isRequired,
    visitedCount: PropTypes.number.isRequired,
    lastVisitedAt: PropTypes.number
}