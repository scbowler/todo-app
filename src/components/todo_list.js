import React, { Component } from 'react';

class TodoList extends Component {
    render(){
        const listElements = this.props.list.map( item => {
            return <li className="collection-item" key={item._id}>{item.title}</li>;
        });

        return (
            <ul className="collection">
                {listElements}
            </ul>
        );
    }
}

export default TodoList;
