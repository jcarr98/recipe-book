import React, { useState } from 'react';

import { Box, CheckBox, Text} from 'grommet';

function Direction(props) {
    const [isChecked, setIsChecked] = useState([false]);

    function check() {
        let status = isChecked;
        setIsChecked(!status);
    }

    return(
        <Box>
            <Text>Step {props.values.step_num}.</Text>
            <CheckBox
                label={
                    <Text
                        style={{
                            textDecoration: isChecked ? "none" : "line-through",
                            color: isChecked ? "white" : "gray"
                        }}
                    >
                        {props.values.step} {props.values.optional ? " (optional)" : ''}
                    </Text>
                }
                key={props.values.step_num}
                onChange={() => check()}
                pad="xsmall"
            />
        </Box>
    );
}

export default Direction;