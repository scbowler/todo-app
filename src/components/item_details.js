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
            </div>
        );
    }
} 

export default ItemDetails;
