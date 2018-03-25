import React from 'react';
import { Link } from 'react-router-dom';


const PageNotFound = () => {
    return (
            <div>
                <h1>Page Not Found</h1>
                <p><Link to='/'>back to homepage</Link></p>
                </div>
    )
}

export default PageNotFound;
