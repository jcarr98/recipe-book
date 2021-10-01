import { Grommet } from 'grommet';
import React from 'react';
import AppBar from '../components/AppBar';

function Oops() {
    return(
        <Grommet>
            <AppBar />
            <h1>Oops! Page not found.</h1>
            <p>Could not find {window.location.pathname.split('/')[1]}</p>
        </Grommet>
    );
}

export default Oops;