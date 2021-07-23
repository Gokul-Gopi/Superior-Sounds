import { createContext, useContext, useReducer } from "react";
import { initialState, reducer } from './Reducer-InitState'

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <ProductContext.Provider value={{ state, dispatch }}>
            {children}
        </ProductContext.Provider>
    )
}

const useProduct = () => useContext(ProductContext)

export { ProductProvider, ProductContext, useProduct }