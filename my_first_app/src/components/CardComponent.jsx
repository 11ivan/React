import React from 'react';

const CardComponent = (props) => {
    function click() {
        this.props.parentMethod();
    }

    return (
        <div className="card" onClick={click}>

            <div className="cardHeader">
                <div className="cardTitle">
                    {props.title}
                </div>
                <div className="cardCreationDate">
                    {props.creationDate}
                </div>
            </div>

            <div className={props.completed ? 'cardBody completed' : 'cardBody'}>
                <div className="cardType">
                    {props.type}
                </div>
                <div className="cardDesc">
                    {props.desc}
                </div>
            </div>
        </div>
    );
}

export default CardComponent;