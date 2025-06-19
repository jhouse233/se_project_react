import { createContext } from 'react'

export const UserContext = createContext();

export function CurrentUserContext({ 
    children, 
    currentUser, 
    handleLogin, 
    handleRegister, 
    handleLogout
 }) {
    return (
        <UserContext.Provider value={{
            currentUser, 
            handleLogin, 
            handleRegister,
            handleLogout
        }}>
            {children}
        </UserContext.Provider>
    )
}
