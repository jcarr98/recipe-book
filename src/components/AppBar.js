import React from 'react';
import { useHistory } from 'react-router-dom';

import { Anchor, Box, Header, Menu, Text } from 'grommet';
import { Apps, Home } from 'grommet-icons';

function AppBar() {
    const history = useHistory();

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