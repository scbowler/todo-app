import React, { Component } from 'react';
import listData from '../data/todo';

class TodoList extends Component {
    render(){
        console.log('List Data:', listData);
        const listElements = listData.map( (item, index) => {
            return <li key={item._id}>{item.title}</li>;
        });

        return (
            <div>
                <h1>This will be the list</h1>
                <ul>
                    {listElements}
                </ul>
            </div>
        );
    }
}

export default TodoList;
