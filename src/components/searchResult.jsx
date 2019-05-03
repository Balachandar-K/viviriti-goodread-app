import React from "react";
import Pagination from "./pagination";

class SearchResult extends React.Component {

    /**
    * To set the initial state to component
    *
    * @param {object} props
    */
    constructor (props) {
        super(props);
    }

    getLists = () => {
        let li = "";

        li = this.props.searchData.map((value,index) => {
            return <li className="list-item" key={index}>
                <span className="image"><img src={value.best_book[0].image_url[0]} alt="image"></img></span>
                <div className="content">
                    <div className="title">
                        <h4><a href="#">{value.best_book[0].title}</a></h4>
                    </div>
                    <div className="author">
                        <p>{value.best_book[0].author[0].name[0]}</p>
                    </div>
                </div>
            </li>
        });
        return li;
    }

    render() {
        return <div className="search-result">
            {this.props.fetchingData ?
                <div className="loading">Loading...</div>
            :
                <React.Fragment>
                    {Array.isArray(this.props.searchData) && this.props.searchData.length > 0 ?
                        <React.Fragment>
                            <ul className="list-container">
                                {this.getLists()}
                            </ul>
                        <Pagination paginateEnd={this.props.paginateEnd} paginateStart={this.props.paginateStart} total={this.props.total} pageNo={this.props.pageNo} getData={this.props.getData}/>
                        </React.Fragment>
                        :
                        <div className="no-result">No result found</div>
                    }
                </React.Fragment>
            } 
        </div>
    }
}

export default SearchResult;