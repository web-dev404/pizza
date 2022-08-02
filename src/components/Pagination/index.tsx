"use strict";

import ReactPaginate from "react-paginate";
import styles from './Pagination.module.scss';
import React from 'react';

type PaginationProps = {
    onChangePage: (page: number) => void,
    currentPage: number
}

const Pagination: React.FC<PaginationProps> = ({onChangePage, currentPage}) => {
    return (
        <div>
            <ReactPaginate className={styles.root}
                           breakLabel="..."
                           nextLabel=">"
                           previousLabel="<"
                           onPageChange={(number) => onChangePage(number.selected + 1)}
                           pageRangeDisplayed={4}
                           pageCount={3}
                           forcePage={currentPage - 1}
            />
        </div>
    )
}

export default Pagination;