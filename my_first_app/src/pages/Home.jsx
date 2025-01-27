import React from 'react';
//import { TasksList } from './models/TasksList';
import { TaskModel } from '../models/TaskModel';
import CardComponent2 from '../components/CardComponent2';

const uuidV1 = require('uuid/v1');

export default class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tasksList: [],
            showForm: false,
            newTask: new TaskModel(),
            isEdit: false
        };
        this.taskModel = new TaskModel();
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    goToAbout = () => {
        this.props.history.push('/about');
    }

    showForm = () => {
        if (!this.state.showForm) {
            this.setState({ showForm: true });
        } else {
            this.setState({ showForm: false });
        }
    }

    addTodo = (e) => {
        const { newTask } = this.state;
        if (!this.checkFields()) {
            alert('ERROR');
        } else {
            let { tasksList } = this.state;
            let task = new TaskModel();

            task.id = uuidV1();
            task.title = newTask.title;
            task.desc = newTask.desc;
            task.completed = false;
            task.type = newTask.type;
            let date = new Date();
            let stringDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
            task.creationDate = `${stringDate}`;
            tasksList.push(task);

            this.setState({
                tasksList,
                newTask: new TaskModel()
            });

            this.showForm();
        }
    }

    handleFieldChange = (e, field) => {
        const { newTask } = this.state;
        let value = e && e.target && e.target.value ? e.target.value : null;
        if (value !== null) {
            switch (field) {
                case 'title':
                    newTask.title = value;
                    break;
                case 'type':
                    newTask.type = value;
                    break;
                case 'desc':
                    newTask.desc = value;
                    break;

                default: break;
            }
        }
        this.setState({
            newTask
        });
    }

    checkFields = () => {
        return true;
    }


    editTodo = (e, index) => {
        this.isEdit = true;
        const { tasksList } = this.state;
        this.taskModel = tasksList[index];
        this.setState({
            newTask: tasksList[index]
        })
        this.showForm();
    }

    modifyTodo = () => {
        const { newTask } = this.state;
        if (!this.checkFields()) {
            alert('ERROR');
        } else {
            let { tasksList } = this.state;
            let task = new TaskModel();

            task.id = newTask.id;
            task.title = newTask.title;
            task.desc = newTask.desc;
            task.completed = newTask.completed;
            task.type = newTask.type;
            //let date = new Date();
            //let stringDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
            task.creationDate = newTask.creationDate;

            //tasksList.push(task);
            tasksList[tasksList.indexOf(newTask)] = task;

            //Reset taskModel when this its added

            this.setState({
                tasksList,
                newTask: new TaskModel(),
                isEdit: true
            });

            this.showForm();
        }
    }

    deleteTodo = (e, todoId) => {
        let { tasksList } = this.state;

        let filtered = tasksList.filter((element, index, arr) => {
            return element.id !== todoId;
        });

        this.setState({ 'tasksList': filtered });
    }

    render() {
        const { tasksList, showForm, newTask } = this.state;
        return (
            <div className="mainDiv">
                {/* MODAL_FORM */}
                {
                    showForm ?
                        <div className="formContainer">
                            <div className="tableDisplay">
                                <div className="cellDisplay">
                                    <div className="formContent">

                                        <div className="closeButton" onClick={this.showForm}>
                                            X
                                        </div>
                                        <div>
                                            <input type="text" placeholder="Title" defaultValue={newTask.title} onChange={(e) => this.handleFieldChange(e, 'title')}></input>
                                            <input type="text" placeholder="Type" defaultValue={newTask.type} onChange={(e) => this.handleFieldChange(e, 'type')}></input>
                                            <input type="text" placeholder="Desc" defaultValue={newTask.desc} onChange={(e) => this.handleFieldChange(e, 'desc')}></input>
                                        </div>

                                        <div className="buttonsDiv">
                                            <div className="buttonCell">
                                                <div className="cancelButton" onClick={this.showForm}>Cancel</div>
                                            </div>
                                            <div className="buttonCell">
                                                <div className="saveButton" onClick={!this.isEdit ? this.addTodo : this.modifyTodo}>
                                                    {!this.isEdit ? 'Save' : 'Edit'}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="floatButton" onClick={this.showForm}>+</div>
                }{/* END MODAL_FORM */}

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