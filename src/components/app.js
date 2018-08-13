import 'materialize-css/dist/css/materialize.min.css';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './home';
import ItemDetails from './item_details';
import NotFound from './404';
import axios from 'axios';
import config from '../config';

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            items: []
        };
    }

    async addItem(item){
        const { BASE_URL, API_KEY } = config.api;

        try {
            await axios.post(`${BASE_URL}/todos${API_KEY}`, item);

            this.getListData();
        } catch(err){
            console.log('Something went wrong!:', err.message);
        }
        
    }

    async deleteItem(id){
        const { BASE_URL, API_KEY } = config.api;

        try {
            const resp = await axios.delete(`${BASE_URL}/todos/${id + API_KEY}`);

            console.log('Delete Resp:', resp);
        } catch(err){
            console.log('Delete Error:', err.message);
        }
    }

    async getListData(){
        const { BASE_URL, API_KEY } = config.api;

        const resp = await axios.get(`${BASE_URL}/todos${API_KEY}`);

        this.setState({
            items: resp.data.todos
        });
    }

    render(){
        return (
            <div className="container">
                <Switch>
                    <Route
                        path="/"
                        exact
                        render={props => {
                            return <Home getList={this.getListData.bind(this)} add={this.addItem.bind(this)} list={this.state.items} {...props} />
                        }} 
                    />
                    <Route 
                        path="/item-details/:item_id"
                        render={ routeProps => {
                            return <ItemDetails delete={this.deleteItem.bind(this)} {...routeProps}/>
                        }}
                    />
                    <Route component={NotFound}/>
                </Switch>
            </div>
        );
    }
}

export default App;
