import { useEffect } from 'react';

import Axios from 'axios';

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
        <div>
            <AppBar authenticated={true} />
        </div>
    );
}