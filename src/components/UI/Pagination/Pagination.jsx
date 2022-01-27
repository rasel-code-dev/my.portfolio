import React from 'react'

import paginationStyle from './Pagination.module.scss'

const Pagination = (props) => {
  const { className, pages, currentPage, perPageShow, onPageChange, totalProduct } = props
  const pagesArr = []
  for (let i = 1; i <= pages; i++) {
    pagesArr.push(i)
  }
  
  return (
    <div className={[paginationStyle.pagination_list, className].join(" ")}>
      <li className={paginationStyle.pagination_item}  onClick={()=>onPageChange && onPageChange(currentPage - 1)} > <i className="fa fa-chevron-left" /> </li>
      { pagesArr.map(item=>(
          <li
            key={item}
            onClick={(e)=>onPageChange && onPageChange(item)}
            className={[paginationStyle.pagination_item, currentPage === item ? paginationStyle.active : '', perPageShow > totalProduct ? 'hide' : ''  ].join(' ')}
          >{item}</li>
      )) }
      <li className={paginationStyle.pagination_item} onClick={()=>onPageChange && onPageChange(currentPage + 1)} > <i className="fa fa-chevron-right" /></li>
    </div>
  )
}

export default Pagination
