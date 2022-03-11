import React from 'react';

import { Anchor, Box, Button, Header, Menu, Text } from 'grommet';
import { Apps, Home } from 'grommet-icons';
import { useGoogleLogout } from 'react-google-login';

function AppBar(props) {
    const clientId = process.env.REACT_APP_OAUTH_CLIENT_ID;

    const { signOut } = useGoogleLogout({
        clientId,
        onLogoutSuccess,
        onFailure
    });

    function onLogoutSuccess() {
        alert('Logout successful')
        props.setToken(null);
    }

    function onFailure() {
        console.log('Logout failed');
    }

    return(
        <Header
        background="main" 
        pad="small"
        width="full"
        style={{ position: "sticky", top: "0", zIndex: "1" }}
        responsive
        >
            <Anchor onClick={() => window.location.href = 'https://www.recipe.jeffreycarr.dev/'} color="mainText">
                <Home />
            </Anchor>
            <Box direction="row">
                <Box pad="small">
                    <Text size="xlarge" weight="bold">Jeffrey Carr</Text>
                </Box>
                {props.token !== null ?
                    <Box pad="small">
                        <Button 
                            label="Logout"
                            size="small"
                            onClick={signOut}
                            color="white"
                            secondary
                        />
                    </Box>
                    : null
                }
            </Box>
            <Menu
                dropAlign={{
                    top: "bottom",
                    left: "left"
                }}
                items={[
                    {label: "Main Website", onClick: () => {window.location.href = "https://www.jeffreycarr.dev"}},
                    {label: "Recipe Book", onClick: () => {window.location.href = 'https://www.recipe.jeffreycarr.dev'}}
                ]}
            >
                <Box direction="column" align="center">
                    <Apps />
                    <Text size="small">Apps</Text>
                </Box>
            </Menu>
        </Header>
        
    );
}

export default AppBar;