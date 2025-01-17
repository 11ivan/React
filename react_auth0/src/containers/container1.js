import React from 'react';
import * as ACTIONS from '../store/actions/actions';
import { connect } from 'react-redux';
import Auth from '../utils/auth';


const auth = new Auth();

class Container1 extends React.Component {
    render() {
        const user_text = 'text 1';
        return (
            <div>
                <button onClick={() => auth.login()}>Login</button><br />

                <button onClick={() => console.log(this.props.stateprop1 + ' AND ' + this.props.user_text)}>Get State</button>
                <button onClick={() => this.props.action1()}>Dispatch Action 1</button>
                <button onClick={() => this.props.action2()}>Dispatch Action 2</button>
                <button onClick={() => this.props.action_creator1()}>Dispatch Action 1</button>
                <button onClick={() => this.props.action_creator2()}>Dispatch Action 2</button>
                <button onClick={() => this.props.action_creator3(user_text)}>Dispatch Action 3</button>

                {this.props.user_text ?
                    <h1>{this.props.user_text}</h1>
                    :
                    null
                }

            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        stateprop1: state.reducer1.stateprop1,
        user_text: state.user_reducer.user_text
    }
}

function mapDispatchToProps(dispatch) {
    return {
        action1: () => dispatch(ACTIONS.SUCCESS),
        action2: () => dispatch(ACTIONS.FAILURE),
        action_creator1: () => dispatch(ACTIONS.success()),
        action_creator2: () => dispatch(ACTIONS.failure()),
        action_creator3: (text) => dispatch(ACTIONS.user_input(text)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Container1);