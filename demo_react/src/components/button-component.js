import React from 'react';

class ButtonComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasClicked: false };
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    clic = (text) => {
        if (!this.state.hasClicked) {
            this.setState({ hasClicked: true });
            alert(text);
            setTimeout(() => {
                this.setState({ hasClicked: false });
            }, 2000);
        }
    }

    render() {
        return (
            <>
                {!this.state.hasClicked ?
                    <button onClick={this.clic.bind(this, 'hola')}>Click me</button>
                    :
                    <h2>HOLAAA</h2>
                }
            </>
        );
    }
}

export default ButtonComponent;
