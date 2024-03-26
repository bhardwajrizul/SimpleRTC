import PropTypes from 'prop-types'; 
import { useContext } from 'react';
import NavigationContext from '../Provider/Navigaton';

function Link({children, className, to, href, ...rest}) {
    const {navigate} = useContext(NavigationContext);
    const handleClick = (e) => {
        e.preventDefault();
        navigate(to);
    }
    return (
        <a onClick={handleClick} href={href} className={`${className}`} {...rest}>{children}</a>
    )
}

export default Link;

Link.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    rest: PropTypes.object,
    href: PropTypes.string,
    to: PropTypes.string
}