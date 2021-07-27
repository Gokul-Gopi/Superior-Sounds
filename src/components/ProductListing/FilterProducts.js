import React from 'react'
import { useProduct } from '../../Context/ProductContext'
import './FilterProducts.css'

const FilterProducts = () => {
    const { state, dispatch } = useProduct();


    const sortByPrice = (typeOfSort) => {
        dispatch({ type: 'SORT_BY_PRICE', payload: typeOfSort })
    }

    const sortByOtherFilters = (typeOfSort) => {
        dispatch({ type: 'OTHER_FILTERS', payload: typeOfSort })
    }

    const clearFilters = () => {
        dispatch({ type: 'CLEAR_FILTERS' })
        let radioBtns = document.querySelectorAll('.radioBtn')
        let radioBtnsArr = Array.from(radioBtns);
        radioBtnsArr.map(btn => btn.checked = false)
    }

    return (
        <aside className='filter-products'>

            <div className="filter-products_type">
                <span>Sort by price</span>

                <div>
                    <label htmlFor="priceSort">Low to high</label>
                    <input className='radioBtn' type="radio" name='priceSort' onChange={() => sortByPrice('lowToHigh')} />
                </div>

                <div>
                    <label htmlFor="priceSort">High to low</label>
                    <input className='radioBtn' type="radio" name='priceSort' onChange={() => sortByPrice('highToLow')} />
                </div>
            </div>

            <div className="filter-products_type">
                <span>Other filters</span>

                <div>
                    <label htmlFor=''>Include out of stock</label>
                    <input type="checkbox" name='' checked={state.otherFilters.wholeStock} onChange={() => sortByOtherFilters('wholeStock')} />
                </div>

                <div>
                    <label htmlFor="">Best Sellers</label>
                    <input type="checkbox" name='' checked={state.otherFilters.bestSellers} onChange={() => sortByOtherFilters('bestSellers')} />
                </div>

                <div>
                    <label htmlFor="">Fast Delivery</label>
                    <input type="checkbox" name='' checked={state.otherFilters.fastDelivery} onChange={() => sortByOtherFilters('fastDelivery')} />
                </div>

                <div className='slider-container'>
                    <label htmlFor="">Price</label>
                    <input className='sliderFilter' type="range" max='40000' min='8000' step='5000' default='10000' />
                </div>
            </div>

            <button className='clear-filters-btn' onClick={() => clearFilters()}>Clear all</button>
        </aside>
    )
}

export default FilterProducts
