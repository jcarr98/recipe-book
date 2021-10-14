import { Anchor, Box, Card, CardBody, CardHeader, Text } from 'grommet'

export default function ServerError(props) {
    return(
        <Box pad="large" align="center">
            <Card align="center" width="medium" background="secondary">
                <CardHeader pad="small">
                    <Text weight="bold" size="xlarge">Error</Text>
                </CardHeader>
                <CardBody pad="small">
                    <p>Uh oh, we're having trouble loading {props.name} right now. Maybe the server is down?</p>
                    <p>
                        Feel free to email Jeff at
                        <Anchor color="main" href="mailto:jeffrey.carr98@gmail.com" label=" jeffrey.carr98@gmail.com " />  
                        for questions
                    </p>
                </CardBody>
            </Card>
        </Box>
    )
}