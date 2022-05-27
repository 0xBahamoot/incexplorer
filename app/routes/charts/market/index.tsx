import Chart from '~/components/chart/chart.client';
import { Space, Box, Group } from '@mantine/core';
import { ClientOnly } from "~/components/clientonly/clientonly";
import SectionTitle from "~/components/sectiontitle/sectiontitle";
function MarketChart() {
    return (
        <>
            <SectionTitle text="Market" />
            <Space h="lg" />
            <Box style={{ border: '1px solid #363636' }}>
                <Group grow>

                </Group>
                <ClientOnly>
                    <Chart />
                </ClientOnly>
            </Box>


        </>

    );
}

export default MarketChart;