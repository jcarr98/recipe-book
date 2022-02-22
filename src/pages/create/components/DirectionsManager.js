import StepTable from "./StepTable";

import { Box } from 'grommet';

export default function DirectionsManager(props) {
    function addDirection(vals) {
        // Check the direction has at least one character
        if(vals[0].length < 1) {
            alert("Direction must be at least one character");
            return false;
        }

        // Add new direction to full list
        let newDirs = [...props.directions, vals[0]];
        props.setDirections(newDirs);

        return true;
    }

    function removeDirection(item) {
        // Get index of direction
        let index = getDirectionIndex(item[0]);

        if(index < 0) {
            alert("Item does not exist");
            return false;
        }

        // Remove item from full list
        let newDirs = [...props.directions];
        newDirs.splice(index, 1);
        props.setDirections(newDirs);

        return true;
    }

    function getDirectionIndex(item) {
        for(let i = 0; i < props.directions.length; i++) {
            if(props.directions[i] === item) {
                return i;
            }
        }

        return -1;
    }

    return(
        <Box width="95%">
            <StepTable
                numCols={1}
                headers={[
                    "Step"
                ]}
                addItemExternally={addDirection}
                removeItemExternally={removeDirection}
            />
        </Box>
    )
}