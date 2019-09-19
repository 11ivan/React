import React from 'react';
//import { TasksList } from './models/TasksList';
import { TaskModel } from './models/TaskModel';
import CardComponent2 from './components/CardComponent2';

const uuidV1 = require('uuid/v1');

export default class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tasksList: [],
            showForm: false,
        };
        this.taskModel = new TaskModel();
        this.taskTitle = 'qewasd';
        this.isEdit = false;
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    goToAbout = () => {
        this.props.history.push('/about');
    }

    addAutoToDo = () => {
        let { tasksList } = this.state;
        let task = new TaskModel();

        task.id = uuidV1();
        task.title = 'demo';
        task.desc = 'This is a new auto created Task';
        task.completed = false;
        task.type = 'BAT';
        let date = new Date();
        //task.creationDate = `${date.getFullYear()} - ${date.getMonth() + 1} - ${date.getDate()}`;
        let stringDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        task.creationDate = `${stringDate}`;
        tasksList.push(task);

        this.setState({ tasksList });
    }

    showForm = () => {
        if (!this.state.showForm) {
            this.setState({ showForm: true });
        } else {
            this.setState({ showForm: false });
        }
    }

    addTodo = (e) => {
        if (!this.checkFields()) {
            alert('ERROR');
        } else {
            let { tasksList } = this.state;
            let task = new TaskModel();

            task.id = uuidV1();
            task.title = this.taskModel.title;
            task.desc = this.taskModel.desc;
            task.completed = false;
            task.type = this.taskModel.type;
            let date = new Date();
            let stringDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
            task.creationDate = `${stringDate}`;
            tasksList.push(task);

            //Reset taskModel when this its added
            this.taskModel = new TaskModel();

            this.setState({ tasksList });

            this.showForm();
        }
    }

    handleFieldChange = (e, field) => {
        let value = e && e.target && e.target.value ? e.target.value : null;
        switch (field) {
            case 'title':
                this.taskModel.title = value;
                break;
            case 'type':
                this.taskModel.type = value;
                break;
            case 'desc':
                this.taskModel.desc = value;
                break;

            default: break;
        }
    }

    checkFields = () => {
        return true;
    }

    editTodo = (e, todoId) => {
        this.isEdit = true;
        this.showForm();
    }

    deleteTodo = (e, todoId) => {
        let { tasksList } = this.state;

        var filtered = tasksList.filter((element, index, arr) => {
            return element.id !== todoId;
        });

        this.setState({ 'tasksList': filtered });
    }

    render() {
        const { tasksList } = this.state;
        const { showForm } = this.state;
        return (
            <div className="mainDiv">
                {/* FORM */}
                {
                    showForm ?
                        <div className="formContainer">
                            <div className="tableDisplay">
                                <div className="cellDisplay">
                                    <div className="formContent">

                                        <div className="closeButton" onClick={this.showForm}>
                                            X
                                        </div>

                                        {!this.isEdit ?
                                            <div>
                                                <input type="text" placeholder="Title" onChange={(e) => this.handleFieldChange(e, 'title')}></input>
                                                <input type="text" placeholder="Type" onChange={(e) => this.handleFieldChange(e, 'type')}></input>
                                                <input type="text" placeholder="Desc" onChange={(e) => this.handleFieldChange(e, 'desc')}></input>
                                            </div>
                                            :
                                            <div>
                                                <input type="text" placeholder="Title" ></input>
                                                <input type="text" placeholder="Type" ></input>
                                                <input type="text" placeholder="Desc" ></input>
                                            </div>
                                        }

                                        <div className="buttonsDiv">
                                            <div className="buttonCell">
                                                <div className="cancelButton" onClick={this.showForm}>Cancel</div>
                                            </div>
                                            <div className="buttonCell">
                                                {!this.isEdit ?
                                                    <div className="saveButton" onClick={this.addTodo}>Save</div>
                                                    :
                                                    <div className="saveButton" onClick={this.editTodo}>Edit</div>
                                                }
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="floatButton" onClick={this.showForm}>+</div>
                }{/* END FORM */}

                <div className="header" onClick={this.goToAbout}>
                    Header
                </div>
                <div className="listContainer">
                    {tasksList.length > 0 &&
                        tasksList.map((task, index) =>
                            <CardComponent2 key={task.id} taskId={task.id} index={index} title={task.title}
                                completed={task.completed} type={task.type} creationDate={task.creationDate}
                                desc={task.desc} editFunction={this.editTodo} deleteFunction={this.deleteTodo}>{

                                }</CardComponent2>
                        )
                    }
                </div>
            </div >
        );
    }
}