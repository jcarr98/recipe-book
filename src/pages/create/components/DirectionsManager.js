import StepTable from "./StepTable";

import { Box } from 'grommet';

export default function DirectionsManager(props) {
    function addDirection(vals) {
        // Check the direction has at least one character
        if(vals.step < 1) {
            alert("Direction must be at least one character");
            return false;
        }

        // Create new direction object
        let direction = {
            step: vals[0],
            step_num: props.directions.length + 1,
            optional: vals["optional"]
        }

        // Add new direction to full list
        let newDirs = [...props.directions, direction];
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
            if(props.directions[i].step === item) {
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