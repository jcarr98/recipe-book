import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Axios from 'axios';

import { Anchor, Box, Button, Header, Menu, Text } from 'grommet';
import { Apps, Home } from 'grommet-icons';

function AppBar(props) {
    const history = useHistory();
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        if(props.authenticated !== undefined) {
            setAuthenticated(props.authenticated);
        }
    });

    function logout() {
        Axios.get('https://jeans-recipe-book.herokuapp.com/api/auth/authenticated', { withCredentials: true }).then((data) => {
            console.log("Logged out");
        });
    }

    return(
        <Header
        background="main" 
        pad="small"
        width="full"
        style={{ position: "sticky", top: "0", zIndex: "1" }}
        responsive
        >
            <Anchor onClick={() => history.push('/')} color="mainText">
                <Home />
            </Anchor>
            <Text size="xlarge" weight="bold">Jeffrey Carr</Text>
            {authenticated ? null : <Button label="Logout" onClick={() => logout()} />}
            <Menu
                dropAlign={{
                    top: "bottom",
                    left: "left"
                }}
                items={[
                    {label: "Main Website", onClick: () => {window.location.href = "https://agitated-stonebraker-b885ec.netlify.app/"}},
                    {label: "Recipe Book", onClick: () => {history.push('/')}}
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