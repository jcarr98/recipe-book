import { Button } from 'grommet';

import Axios from 'axios';

export default function Login() {
    function go() {
        Axios.get('https://jeans-recipe-book.herokuapp.com/api/auth').then((data) => {
            console.log(data.data);
        });
    }

    return(
        <Button primary href="https://jeans-recipe-book.herokuapp.com/api/auth" label="Login" />
    );
}