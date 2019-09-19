import React from 'react';

export default class CardComponent2 extends React.Component {

    /*constructor(props) {
        super(props);
    }*/

    edit = (e) => {
        this.props.editFunction(e, this.props.taskId);
    }

    delete = (e) => {
        this.props.deleteFunction(e, this.props.taskId);
    }


    render() {
        return (
            <div className="card">

                <div className="cardHeader">
                    <div className="cardTitle">
                        {this.props.title}
                    </div>
                    <div className="cardCreationDate">
                        {this.props.creationDate}
                    </div>
                </div>

                <div className={this.props.completed ? 'cardBody completed' : 'cardBody'}>
                    <div className="cardType">
                        {this.props.type}
                    </div>
                    <div className="cardDesc">
                        {this.props.desc}
                    </div>
                </div>
                <div><i class="material-icons" onClick={(e) => this.edit(e)}>edit</i></div>
                <div><i class="material-icons" onClick={(e) => this.delete(e)}>delete</i></div>
            </div>

        );
    }
}