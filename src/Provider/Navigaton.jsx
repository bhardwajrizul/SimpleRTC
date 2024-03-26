import PropTypes from "prop-types";
import { createContext, useState, useEffect } from "react";

const NavigationContext = createContext();

function NavigationProvider({children}) {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
    
    useEffect(() => {
        window.addEventListener('popstate', () => {
            console.log('popstate', ' currentPath: ', window.location.pathname);
            setCurrentPath(window.location.pathname);
        })
    
        return () => {
            window.removeEventListener('popstate', () => {
                setCurrentPath(window.location.pathname);
            })
        }
    })

    const navigate = (to) => {
        window.history.pushState({}, '', to);
        setCurrentPath(to);
    }

    return (
        <NavigationContext.Provider value={{currentPath, navigate}}>
            {children}
        </NavigationContext.Provider>
    )
}

export {NavigationProvider}
export default NavigationContext;

NavigationProvider.prototype = {
    children: PropTypes.node
}