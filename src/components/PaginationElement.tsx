import React from 'react';
import { Pagination } from 'react-bootstrap';
import { usePagination } from '../hooks/usePagination';

type PaginationProps = {
  limit: number;
  pageCount: number;
  currentPage: number;
  onChangePage: (page: number) => void
}

const PaginationElement: React.FC<PaginationProps> = ({ limit, pageCount, currentPage, onChangePage }) => {


  let pagesArray = usePagination(pageCount);

  const changePrev = () => {
    if (currentPage > 1) {
      onChangePage(currentPage - 1)
    }
  }
  const changeNext = () => {
    if (currentPage < pageCount) {
      onChangePage(currentPage + 1)
    }
  }

  return (
    <Pagination size='sm' className='pagination justify-content-center pagination-products '>

      <Pagination.Prev onClick={changePrev} disabled={currentPage === 1 ? true : false}>PREV</Pagination.Prev>
      {(currentPage - 3) > 0 && <Pagination.Ellipsis />}


      {pagesArray.map((p: number) =>
        (p > currentPage - 3 && p < currentPage + 3) && <Pagination.Item onClick={() => onChangePage(p)} key={p} active={currentPage === p ? true : false}>{p}</Pagination.Item>
      )}

      {(pageCount - currentPage) > 2 && <Pagination.Ellipsis />}
      <Pagination.Next onClick={changeNext} disabled={currentPage === pageCount}>NEXT</Pagination.Next>
    </Pagination>
  );
}

export default PaginationElement;
