import React from 'react';

import { Anchor, Box, Header, Menu, Text } from 'grommet';
import { Apps, Home } from 'grommet-icons';

function AppBar() {
    return(
        <Header
        background="main" 
        pad="small"
        width="full"
        style={{ position: "sticky", top: "0", zIndex: "1" }}
        responsive
        >
            <Anchor onClick={() => window.location.href = '/'} color="mainText">
                <Home />
            </Anchor>
            <Box direction="row">
                <Box pad="small">
                    <Text size="xlarge" weight="bold">Jeffrey Carr</Text>
                </Box>
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