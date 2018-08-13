import 'materialize-css/dist/css/materialize.min.css';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AddItem from './add_item';
import TodoList from './todo_list';
import Home from './home';
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

    render(){
        return (
            <div className="container">
                <Route 
                    path="/"
                    exact
                    render={ props => {
                        return <Home getList={this.getListData.bind(this)} add={this.addItem.bind(this)} list={this.state.items} {...props}/> 
                }}/>
            </div>
        );
    }
}

export default App;
