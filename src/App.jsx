import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Countries from './components/Countries.jsx'
import Pagination from './components/Pagination'


function App() {
    const [countries, setCountries] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [countriesPerPage] = useState(15)

    useEffect(() => {
        const getCountries = async () => {
            setLoading(true)
            const res = await axios.get('https://restcountries.com/v3.1/all')
            setCountries(res.data)
            setLoading(false)
        }
        getCountries()
    }, [])

    const lastCountryIndex = currentPage * countriesPerPage
    const firstCpountryIndex = lastCountryIndex - countriesPerPage
    const currentCountry = countries.slice(firstCpountryIndex, lastCountryIndex)
    const paginate = pageNumber => setCurrentPage(pageNumber)


    const nextPage = () => {
        if (currentPage > Math.ceil(countries.length / countriesPerPage - 1)) {
            setCurrentPage(0)
        }
        setCurrentPage(prev => prev + 1)
    }

    const prevPage = () => {    
        setCurrentPage(prev => prev - 1)
        if (currentPage <= 1) {
            setCurrentPage(Math.ceil(countries.length / countriesPerPage))
        }
    }

    return (
        <>
            <div className="container mt-5">
                <h1 className="text-primary">
                    Countries
                </h1>
                <Countries countries={currentCountry} loading={loading} />
                <Pagination countriesPerPage={countriesPerPage} totlaCountries={countries.length} paginate={paginate} currentPage={currentPage} />

                <button className="btn btn-primary" onClick={prevPage}>Prev</button>
                <span className="m-4">{currentPage}</span>
                <button className="btn btn-primary" onClick={nextPage}>Next</button>
            </div>
        </>
    )
}

export default App