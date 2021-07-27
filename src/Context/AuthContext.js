import { createContext, useReducer, useContext, useEffect } from "react";

const AuthContext = createContext();

const initialState = {
    currentUserName: '',
    currentUserToken: '',
    isLoggedIn: false,
}

const authReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER': return { ...state, currentUserName: action.payload, isLoggedIn: true }

        case 'SET_USER_TOKEN': return { ...state, currentUserToken: action.payload }

        default: return { ...state }
    }
}

const AuthProvider = ({ children }) => {
    const [authState, authDispatch] = useReducer(authReducer, initialState)

    useEffect(() => {
        const user = JSON.parse(localStorage?.getItem('userDetails'))
        user?.name && authDispatch({ type: 'SET_USER', payload: user.name })
        user?.token && authDispatch({ type: 'SET_USER_TOKEN', payload: user.token })
    }, [])

    return (
        <AuthContext.Provider value={{ authState, authDispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext)


export { AuthProvider, useAuth }