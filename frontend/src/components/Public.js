import React from 'react';
// import {Link} from 'react-router-dom';
import Header from './common/Header';
import Nav from './common/Nav';

const Public = () => {
    return (
        <React.Fragment>
            <Nav />
            <Header />
            <main>
                <h1>
                    this is the main
                </h1>
            </main>
        </React.Fragment>
    )
}

export default Public;