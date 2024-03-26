import PropTypes from "prop-types"
import { useContext } from "react"
import NavigationContext from "../Provider/Navigaton"

export default function Route({ children, path }) {
    const { currentPath } = useContext(NavigationContext);
    if (path === currentPath) {
        return children;
    }
    return null;
}

Route.prototype = {
    children: PropTypes.node,
    path: PropTypes.string
}