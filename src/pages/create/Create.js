import { useEffect } from 'react';

import Axios from 'axios';

import { Box, Button, Card, CardBody, CardFooter, CardHeader } from 'grommet';

import AppBar from '../../components/AppBar';

export default function Create(props) {
    useEffect(() => {
        Axios.get('https://jeans-recipe-book.herokuapp.com/api/auth/authenticated', { withCredentials: true }).then((data) => {
            if(!data.data) {
                window.location = '/login';
            }
        })
    } ,[]);

    return(
        <Box align="center">
            <AppBar authenticated={true} />

            <Box>
                <h1>New Recipe</h1>
            </Box>

            
        </Box>
    );
}