import { Center, Text, Box } from '@mantine/core';

function NotFound() {
    return (
        <>
            <Center style={{ width: '100%', height: '100%' }}>
                <Box>
                    <Text style={{ fontWeight: 500, fontSize: 36, display: 'block', color: '#fff' }}>Oh no! 404</Text>
                </Box>
            </Center>
        </>

    );
}

export default NotFound;