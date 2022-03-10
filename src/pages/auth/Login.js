import Axios from 'axios';

import { Box, Button, Card, CardBody, CardHeader, Text } from 'grommet';
import { useGoogleLogin } from 'react-google-login';

export default function Login(props) {
    const clientId = process.env.REACT_APP_OAUTH_CLIENT_ID;

    const {signIn} = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId,
        isSignedIn: true,
        accessType: 'offline'
    });
    
    function onSuccess(res) {
        Axios.get(`${process.env.REACT_APP_BACKEND}auth/validUser`, {params: {email: res.profileObj.email, tokenId: res.tokenId}}).then((serverResponse) => {
            if(serverResponse.data === true) {
                props.setToken(res.tokenId);
                alert("Login successful");
            } else {
                alert("Login failed");
            }
        });
    }

    function onFailure(res) {
        console.log(`[Login failed] Response: ${res}`);
    }
    
    return(
        <Box full align="center" justify='center'>
            <h1>
                Login Page
            </h1>

            <p>This app only support Google authentication. You must have a Google account to continue.</p>
            <p>Additionally, your email must be whitelisted before you can enter the protected pages.</p>

            <Card>
                <CardHeader>
                    <Text>Login</Text>
                </CardHeader>
                <CardBody>
                    <Button
                        primary
                        color="main"
                        label="Sign in with Google"
                        onClick={signIn}
                    />
                </CardBody>
            </Card>
        </Box>
    );
}