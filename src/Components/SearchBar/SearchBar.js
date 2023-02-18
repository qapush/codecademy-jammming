import React from "react";
import styles from './SearchBar.css';

export default class SearchBar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            term: null
        }
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    search() {
        
        if(this.state.term) {
            this.props.onSearch(this.state.term)
            this.setState({ term: null })
            console.log('assaa')
        }
    }

    handleTermChange(e){
        this.setState({term: e.target.value})
    }

    render(){
        return(
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
                <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        )
    }
}