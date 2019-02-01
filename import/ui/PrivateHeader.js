import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';

const PrivateHeader = (props) => {

    const onLogout = () => {
        Accounts.logout();
        history.push('/login')
    }

    return(
        <div className="header">
            <div className="header__content">
                <h1 className="header__text">{props.title}</h1>
                <button className="button button--logout" onClick={onLogout.bind(this)}>Logout</button>
            </div>
        </div>
     
    )
}

PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired
}

export default PrivateHeader;