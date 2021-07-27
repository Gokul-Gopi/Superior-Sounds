import { createContext, useContext, useReducer } from "react";

const ModalContext = createContext()

const initialState = {
    signUp: false,
    login: false,
    logout: false,
}


const modalReducer = (state, action) => {
    switch (action.type) {
        case 'SIGN_UP': return { ...state, signUp: !state.signUp }
        case 'LOGIN': return { ...state, login: !state.login }
        case 'LOGOUT': return { ...state, logout: !state.logout }
        default: return { ...state }
    }
}

const ModalProvider = ({ children }) => {
    const [modalState, modalDispatch] = useReducer(modalReducer, initialState)

    return (
        <ModalContext.Provider value={{ modalState, modalDispatch }}>
            {children}
        </ModalContext.Provider>
    )
}

const useModal = () => useContext(ModalContext)

export { ModalProvider, useModal }