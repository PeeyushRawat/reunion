import React, { Fragment, useEffect, useState } from 'react'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import Dropdown from 'react-bootstrap/Dropdown';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import MetaData from './layouts/MetaData'
import Product from './product/product'
import Loader from './layouts/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { getProducts, getCities } from '../actions/productActions'
import { useAlert } from 'react-alert'
import { useParams } from 'react-router-dom'

const Home = () => {

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 1000000])
    const [category, setCategory] = useState('')
    const [city, setCity] = useState('')
    const [rating, setRating] = useState(0)
    const [startDate, setStartDate] = useState(new Date());

    const categories = [
                "Single-Family Home",
                "Condominium",
                "Apartment",
                "Townhouse",
                "Duplex",
                "Triplex",
                "Multi-Family Building",
                "Mobile Home",
                "Vacant Land",
                "Commercial Property",
                "Industrial Property",
                "Retail Space"        
    ]

 
    const alert = useAlert();
    const dispatch = useDispatch();

    const { keyword } = useParams();

    const { loading, products, error, productsCount, resPerPage } = useSelector(state => state.products)

    const { cities } = useSelector(state => state.allCities)

    useEffect(() => {

        if(error) {
            alert.error(error)
        }

        dispatch(getCities());
        dispatch(getProducts(keyword, currentPage, price, category, rating, city, startDate));
        
        
    }, [dispatch, alert, error, keyword, currentPage, price, category, rating, city, startDate])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    let count = productsCount;

    return (
        <Fragment>
            {loading? <Loader /> : (
                <Fragment>
                    <MetaData title={'Buy Best Product Online'}/>
                    <h1 id="products_heading">Latest Products</h1>

                    <section id="products" className="container mt-5">
                        <div className="row">

                            
                                <Fragment>
                                    <div className='col-6 col-md-3 mt-5 mb-5'>
                                        <div className='px-5'>
                                            <Slider range
                                                marks={{
                                                    1 : `Rs 1`,
                                                    1000000 : `Rs 1000000`
                                                }}
                                                min={1}
                                                max={1000000}
                                                defaultValue={[1, 1000000]}
                                                tipFormater={value => `$${value}`}
                                                tipProps={{
                                                    placement: "top",
                                                    visible: true
                                                }}
                                                value={price}
                                                pushable={true}
                                                onChange={price => setPrice(price)}
                                            />

                                            <hr className='my-5' />

                                            <div className='mt-5'>
                                                <h4 className='mb-3'>
                                                    Property Type
                                                </h4>
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                        Type
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu className='pl-0'>
                                                        {categories.map(category => (
                                                            <Dropdown.Item 
                                                                style={{
                                                                    cursor: 'pointer',
                                                                    listStyleType: 'none',
                                                                }}
                                                                key={category}
                                                                onClick={() => setCategory(category)}
                                                            >
                                                                {category}
                                                            </Dropdown.Item>
                                                        ))}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                            
                                            <hr className='my-5' />
                                            
                                            <div className='mt-5'>
                                                <h4 className='mb-3'>
                                                    Available Cities
                                                </h4>
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                        Cities
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu className='pl-0'>
                                                        {cities.map(city => (
                                                            <Dropdown.Item 
                                                                style={{
                                                                    cursor: 'pointer',
                                                                    listStyleType: 'none',
                                                                }}
                                                                key={city}
                                                                onClick={() => setCity(city)}
                                                            >
                                                                {city}
                                                            </Dropdown.Item>
                                                        ))}
                                                    </Dropdown.Menu>
                                                </Dropdown>

                                            </div><hr className='my-3' />
                                            
                                            <div className='mt-5'>
                                                <h4 className='mb-3 mr-3'>
                                                    Available from
                                                </h4>
                                                
                                                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
  
                                                

                                            </div>
                                            
                                            <hr className='my-3' />
                                            
                                            <div className='mt-5'>
                                                <h4 className='mb-3'>
                                                    Ratings
                                                </h4>

                                                <ul className='pl-0'>
                                                    {[5, 4, 3, 2, 1].map(star =>(
                                                        <li 
                                                            style={{
                                                                cursor: 'pointer',
                                                                listStyleType: 'none',
                                                            }}
                                                            key={star}
                                                            onClick={() => setRating(star)}
                                                        >
                                                            <div className='rating-outer'>
                                                                <div className='rating-inner'
                                                                    style={{
                                                                        width: `${star * 20}%`
                                                                    }}
                                                                >

                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>

                                            </div>

                                        </div>
                                    </div>

                                    <div className='col-6 col-md-9'>
                                        <div className='row'>
                                            {products && products.map(product => (
                                                <Product key={product._id} product={product} col={4}/>
                                            ))}
                                        </div>
                                    </div>
                                </Fragment>
                            
                        </div>
                    </section>
                    
                    {resPerPage < count && (
                        <div className = "d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount = {productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText = {'Next'}
                                prevPageText = {'Prev'}
                                firstPageText = {'First'}
                                lastPageText = {'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    )}
                    

                </Fragment>

            )}
            
        </Fragment>
  )
}

export default Home
