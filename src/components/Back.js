import React from 'react';
import { useHistory } from 'react-router-dom';

import { Box, Button } from 'grommet';
import { LinkPrevious } from 'grommet-icons';

function Back(props) {
    const history = useHistory();

    return(
        <Box align="start" pad="medium" fill>
            <Button 
                onClick={() => {history.push(props.route)}}
                color="main" 
                icon={ <LinkPrevious color="main" size="medium" /> } 
                label={props.label}
                plain
            />
        </Box>
    );
}

export default Back;