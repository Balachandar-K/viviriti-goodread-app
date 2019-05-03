import React from 'react';
import './App.css';
import SearchResult from './components/searchResult';
import Axios from 'axios';
import {parseString} from "xml2js";

class App extends React.Component {

  /**
   * To set the initial state to component
   * 
   * @param {object} props 
   */
  constructor(props) {
    super(props);

    this.state = {searchKeyword : "",pageNo : 1, searchData : [],fetchingData : false,paginateStart : 1, paginateEnd : 1,total : 0}
  }

  setSearchInput = (evt) => {
    this.setState({
      searchKeyword : evt.target.value
    })
  }

  setData (response) {
    this.setState({
      searchData : response
    })
  }

  getData = (pageNo) => {
    if(!this.state.fetchingData) {
      let url = `https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index.xml?key=Wgj8v9pQjWIJXiR33gPw&q=${encodeURI(this.state.searchKeyword)}&page=${pageNo}`;

      debugger;
      this.setState({
        fetchingData :true,
        pageNo : pageNo
      })
      Axios.get(url)
        .then((response) => {
          parseString(response.data, (err, result) => {
            this.setState({
              fetchingData: false,
              paginateEnd: result.GoodreadsResponse.search[0]["results-end"][0],
              paginateStart: result.GoodreadsResponse.search[0]["results-start"][0],
              total: result.GoodreadsResponse.search[0]["total-results"][0]
            })
            this.setData(result.GoodreadsResponse.search[0].results[0].work);
          });
        })
        .catch((error) => {
          this.setState({
            fetchingData: false
          })
          this.setData([]);
        });
    }
  }

  /**
   * Renders the html into the browser
   */
  render() {
    return (
      <div className="container">
        <header>
          <h2>
            Goodreads
          </h2>
          <div className="search-bar">
            <input type="text" onChange={this.setSearchInput} value={this.state.searchKeyword} placeholder="Search books you need..."/>
            <button onClick={() => this.getData(1)}>Search</button>
          </div>
        </header>
        < SearchResult searchData={this.state.searchData} fetchingData={this.state.fetchingData} paginateEnd={this.state.paginateEnd}
          paginateStart={this.state.paginateStart} total={this.state.total} pageNo={this.state.pageNo} getData={this.getData}/>
      </div>
    )
  }
}

export default App;
