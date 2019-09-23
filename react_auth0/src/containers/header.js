import React from 'react';
import { Link } from "react-router-dom";

class Header extends React.Component {

    state = {
        nums:
            [
                { id: 1 },
                { id: 2 },
                { id: 3 }
            ]
    };

    render() {
        return (
            <div>
                <Link to="/" style={{ padding: '5px' }}>
                    Home
                </Link>

                {this.state.nums.map(num =>
                    <Link key={num.id} to={{ pathname: '/component/' + num.id }} style={{ padding: '5px' }}>
                        Component {num.id}
                    </Link>
                )}

                {/* <Link to="/component1" style={{ padding: '5px' }}>
                    Component 1
                </Link>
                <Link to="/component2" style={{ padding: '5px' }}>
                    Component 2
                </Link>

                <Link to="/component3" style={{ padding: '5px' }}>
                    Component 3
                </Link> */}

            </div>
        )
    }
}

export default Header;