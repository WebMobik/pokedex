import React, {Component} from 'react';

import './search-list.css'

export default class SearchList extends Component {

    state = {
        term: ""
    }

    onSearchChange = e => {
        const term = e.target.value;
        this.setState({ term });
        this.props.onSearchChange(term);
    };

    render() {
        return (
            <input
                placeholder="Search you'r pokemon..."
                className="inputSearch"
                value={this.state.term}
                onChange={this.onSearchChange}
            />
        )
    }
}
