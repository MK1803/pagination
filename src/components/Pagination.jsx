import React from 'react'

function Pagination({ countriesPerPage, totlaCountries, paginate, currentPage }) {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totlaCountries / countriesPerPage); i++) {
        pageNumbers.push(i)
    }


    return (
        <>
            <ul className='pagination'>
                {
                    pageNumbers.map(number => (
                        <li className="page-item" key={number}>

                            <a href="!#" className={currentPage == number ? "page-link active" : "page-link"} onClick={() => paginate(number)}> {number} </a>
                        </li>
                    ))
                }
            </ul>

        </>
    )
}

export default Pagination