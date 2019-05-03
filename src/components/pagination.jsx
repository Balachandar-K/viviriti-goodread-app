import React from "react";

class Pagination extends React.Component {
    constructor(props) {
        super(props);
    }

    generatePagination = () => {
        let currentPage = this.props.pageNo;
        let totalPage = parseInt(this.props.total);
        let endPage = totalPage/20;
        endPage = (endPage % 1 != 0) ? Math.round(endPage) +1 : endPage;
        let li = [];
        let startIndex = (currentPage < 9) ? 1 : (currentPage > endPage - 9) ? endPage - 9 : 
            currentPage-5;
        let loopValue = (endPage <= 9) ? endPage : 9+startIndex

        for (let i = Math.abs(startIndex); i <= loopValue; i++) {
            li.push(<li className={currentPage === i && "active-page"} onClick={() => this.props.getData(i)}>{i}</li>)
        }
        if (startIndex !== 1) {
            li.unshift(<li className={currentPage === 1 && "active-page"}  onClick={() => this.props.getData(1)}>1</li>, <li>...</li>)
        }
        if (endPage > 9 && !(startIndex >= endPage-9)) {
            li.push(<li>...</li>, <li className={currentPage === endPage && "active-page"} onClick={() => this.props.getData(endPage)}>{endPage}</li>)
        }
        return li;
    }

    render() {
        return <React.Fragment>
                {this.props.total > 20 &&
                    <div className="pagination">
                        <ul>
                            {this.generatePagination()}
                        </ul>
                    </div>
                }
            </React.Fragment>
    }
}

export default Pagination;