import Axios from 'axios';

import { Anchor, Box, Button, Paragraph, Text } from 'grommet';
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
        Axios.get(`${process.env.REACT_APP_BACKEND}/auth/validUser`, {params: {tokenId: res.tokenId}}).then((serverResponse) => {
            if(serverResponse.data.status) {
                localStorage.setItem('authToken', res.tokenId);
                alert("Login successful");

                window.location.href = '/';
            } else {
                alert("Login failed");
            }
        });
    }

    function onFailure(res) {
        console.log(`[Login failed] Response: ${res}`);
        console.log(res);
    }
    
    return(
        <Box full align="center" justify='center'>
            <h1>
                Login Page
            </h1>

            <Box fill align='center' pad='small'>
                <Paragraph color='mainText' textAlign='justify'>
                    This app only support Google authentication. You must have a Google account to continue.
                    </Paragraph>
                <Paragraph color='mainText' textAlign='justify'>
                    Additionally, your email must be whitelisted before you can enter the protected pages.
                    If you'd like access to add your own recipes, please <Anchor color='main' href='mailto:jeffrey.carr98@gmail.com' label='Email me' /> at 
                    <Text color='main'> jeffrey.carr98@gmail.com</Text>
                </Paragraph>
            </Box>

            <Box>
                <Button
                    primary
                    color="main"
                    label={<Text color='mainText'>Sign in with Google</Text>}
                    onClick={signIn}
                />
            </Box>
        </Box>
    );
}