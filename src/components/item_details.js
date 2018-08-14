import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

class ItemDetails extends Component {
    state = {
        itemDetails: null
    }

    async componentDidMount(){
        const { item_id } = this.props.match.params;
        const { BASE_URL, API_KEY } = config.api;

        // http://api.reactprototypes.com/todos/a67sacg7ufv7tsa?key=apiKey
        const resp = await axios.get(`${BASE_URL}/todos/${item_id + API_KEY}`);

        this.setState({
            itemDetails: resp.data.todo
        });
    }

    async handleDelete(){
        await this.props.delete(this.state.itemDetails._id);

        this.props.history.push('/');
    }

    async handleToggleComplete(){
        const todoItem = await this.props.toggleComplete(this.state.itemDetails._id);

        console.log('Item Details Toggle Complete Resp:', todoItem);

        this.setState({
            itemDetails: todoItem
        })
    }

    render(){
        const { itemDetails } = this.state;

        console.log('Item Details:', itemDetails);

        if(!itemDetails){
            return <h1 className="grey-text">Loading...</h1>;
        }

        return (
            <div>
                <h1 className="center">Item Details</h1>
                <div className="row">
                    <div className="col s12 right-align">
                        <Link to="/" className="btn purple darken-2">Back to List</Link>
                    </div>
                </div>
                <h4><em>Title:</em> {itemDetails.title}</h4>
                <h5>
                    {
                        itemDetails.complete
                            ? 'Item Complete'
                            : 'Item is not yet complete'
                    }
                </h5>
                <div className="row">
                    <div className="col s6 center">
                        <button onClick={this.handleToggleComplete.bind(this)} className="btn blue darken-2">Toggle Complete</button>
                    </div>
                    <div className="col s6 center">
                        <button onClick={this.handleDelete.bind(this)} className="btn red darken-2">Delete</button>
                    </div>
                </div>
            </div>
        );
    }
} 

export default ItemDetails;
