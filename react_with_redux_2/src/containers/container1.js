import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login, logOut } from '../redux/login/login_actions';
import Auth from '../utils/auth';

const auth = new Auth();

class Container1 extends React.Component {
    render() {
        const user_text = 'text 1';
        return (
            <div>
                <button onClick={() => auth.login()}>Login</button> <br />
                <button onClick={() => this.props.login}>Mock Log In</button>
                <button onClick={() => this.props.logOut}>Mock Log Out</button>
                <div>{this.props.itsLogged}</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('STATE: ', state);
    return {
        itsLogged: state.itsLogged,
    }
}

const mapDispathToProps = (dispatch) => {
    return bindActionCreators({
        login,
        logOut,
    }, dispatch)
};

export default connect(mapStateToProps, mapDispathToProps)(Container1);