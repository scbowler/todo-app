import 'materialize-css/dist/css/materialize.min.css';
import React, { Component } from 'react';
import AddItem from './add_item';
import TodoList from './todo_list';
import listData from '../data/todo';
import axios from 'axios';

const BASE_URL = 'http://api.reactprototypes.com';
const API_KEY = '?key=c618_demouser';

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            items: []
        };
    }

    componentDidMount(){
        this.getListData();
    }

    async addItem(item){
        try {
            await axios.post(`${BASE_URL}/todos${API_KEY}`, item);

            this.getListData();
        } catch(err){
            console.log('Something went wrong!:', err.message);
        }
        
    }

    async getListData(){
        const resp = await axios.get(`${BASE_URL}/todos${API_KEY}`);

        this.setState({
            items: resp.data.todos
        });
    }

    // getListData(){
    //     // This is where you would call the server for your data

    //     // http://api.reactprototypes.com/todos?key=c418_demouser
    //     axios.get(`${BASE_URL}/todos${API_KEY}`).then((resp) => {
            
    //         this.setState({
    //             items: resp.data.todos
    //         });

    //     }).catch((err) => {
    //         console.log('There was an error!:', err.message);
    //     });
    // }

    render(){
        return (
            <div className="container">
                <h1 className="center">To Do List</h1>
                <AddItem add={this.addItem.bind(this)}/>
                <TodoList list={this.state.items}/>
            </div>
        );
    }
}

export default App;
