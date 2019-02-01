import React from 'react';
import Modal from 'react-modal';

export default class AddLink extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            url: '',
            isOpen: false,
            error: ''
        }
    }

    componentWillMount() {
        Modal.setAppElement('body');
    }

    onInputChange(e){
        this.setState({
            url: e.target.value.trim()
        }) 
    }

    onSubmit = (e) => {
        e.preventDefault();
        // const url = this.state.url;
        const { url } = this.state; //to samo co wyżej
            Meteor.call('link.insert', url, (err, res) => {
                if(!err){
                    this.setState({ url: '', isOpen: false, error: ''}) //czyszczenie kiedy nie ma będu
                } else{
                    this.setState({error: err.reason});
                }
            });
    }

    render(){
        return(
            <div>
                <button className="button" onClick={ () => {
                    this.setState({isOpen: true})
                }}>Add link</button>
                <Modal 
                    isOpen={this.state.isOpen} 
                    contentLabel="Add link"
                    onAfterOpen={() => this.refs.url.focus()}
                    onRequestClose={() => this.setState({
                        url: '', 
                        isOpen: false, 
                        error: ''
                    })}
                    className="boxed-view__box"
                    overlayClassName="boxed-view boxed-view__modal"
                >
                        <h1>Add Link</h1>
                        {this.state.error && <p>{this.state.error}</p> }
                        <form className="boxed-view__form"  onSubmit={this.onSubmit.bind(this)}>
                            <input 
                                onChange={this.onInputChange.bind(this)} 
                                type="text" name="url" 
                                ref="url"
                                placeholder="URL" 
                                value={this.state.url}/>
                            <button className="button">Add Link</button>
                            <button type="button" className="button button--secondary" onClick={ () => {
                            this.setState({isOpen: false, url:'', error:''})
                            }}>Close</button>
                        </form>   
                       
                </Modal>
            </div>    
            )
    }
 }



