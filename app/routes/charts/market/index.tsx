import Chart from '~/components/chart/chart.client';
import { Space, Box, Stack, Grid, Group, Center, Text, Button, Table, Select } from '@mantine/core';
import { ClientOnly } from "~/components/clientonly/clientonly";
import SectionTitle from "~/components/sectiontitle/sectiontitle";
import useStyles from './styles';
import { CaretDown } from 'tabler-icons-react';
import format from '~/utils/format';
function MarketChart() {
    const { classes } = useStyles()
    let txlist: any[] = [];
    const rows = txlist?.map((element, idx) => {
        return (

            <tr key={element.tx_hash} style={{ cursor: 'pointer' }} >
                <td>{format.formatDateTime(element.lock_time)}</td>

            </tr>
        )
    });

    return (
        <>
            <Space h={30} />
            <Group position='apart'>
                <SectionTitle text="Market" />
                <Select
                    styles={{ input: { backgroundColor: 'transparent', border: '1px solid #363636' } }}
                    value={'BTC/USDT'}
                    data={['BTC/USDT', 'PRV/USDT']}
                    placeholder="Pick one"
                    radius="md"
                    rightSection={<CaretDown size={14} fill={'#757575'} color={'#757575'} />}
                    rightSectionWidth={30}
                />
            </Group>
            <Space h="lg" />

            <Grid columns={9} gutter={0} style={{ border: '1px solid #363636' }}>
                <Grid.Col span={7} style={{ borderRight: '1px solid #363636' }}>
                    <Stack justify="flex-start" spacing={0}>
                        <Box className={classes.PairOverView}>
                            <Group position='left'>
                                <Stack spacing={0} style={{ borderRight: '1px solid #363636', padding: '2px 26px 2px 0' }}>
                                    <Text style={{ fontSize: 16, fontWeight: 500, color: '#fff', lineHeight: '22px' }} >BTC / USDT</Text>
                                    <Text style={{ fontSize: 16, fontWeight: 500, color: '#0ECB81', lineHeight: '22px' }} >$30,322,82</Text>
                                </Stack>
                                <Stack spacing={0} style={{}}>
                                    <Text style={{ fontSize: 14, fontWeight: 500, color: '#757575', lineHeight: '22px' }} >24h change</Text>
                                    <Text style={{ fontSize: 16, fontWeight: 500, color: '#0ECB81', lineHeight: '22px' }} >+2.54%</Text>
                                </Stack>
                                <Stack spacing={0} style={{}}>
                                    <Text style={{ fontSize: 14, fontWeight: 500, color: '#757575', lineHeight: '22px' }} >24h High</Text>
                                    <Text style={{ fontSize: 16, fontWeight: 500, color: '#fff', lineHeight: '22px' }} >30,670.61</Text>
                                </Stack>
                                <Stack spacing={0} style={{}}>
                                    <Text style={{ fontSize: 14, fontWeight: 500, color: '#757575', lineHeight: '22px' }} >24h Low</Text>
                                    <Text style={{ fontSize: 16, fontWeight: 500, color: '#fff', lineHeight: '22px' }} >29,900.61</Text>
                                </Stack>
                                <Stack spacing={0} style={{}}>
                                    <Text style={{ fontSize: 14, fontWeight: 500, color: '#757575', lineHeight: '22px' }} >24h Volume (BTC)</Text>
                                    <Text style={{ fontSize: 16, fontWeight: 500, color: '#fff', lineHeight: '22px' }} >44,890.61</Text>
                                </Stack>
                                <Stack spacing={0} style={{}}>
                                    <Text style={{ fontSize: 14, fontWeight: 500, color: '#757575', lineHeight: '22px' }} >24h Volume (USDT)</Text>
                                    <Text style={{ fontSize: 16, fontWeight: 500, color: '#fff', lineHeight: '22px' }} >1,352,163,933.32</Text>
                                </Stack>
                            </Group>
                        </Box>
                        <Box className={classes.ChartTimeScale}>
                            <Group position='left' style={{ padding: '0 24px' }}>
                                <Center style={{ height: 50, width: 'auto' }}>
                                    <Text color={'#fff'} style={{ fontWeight: 500, fontSize: 16 }}>Time</Text>
                                    <Group position='left' style={{ padding: '0 24px' }}>
                                        <Button variant="subtle" color="gray" className={classes.periodBtn} compact>15m</Button>
                                        <Button variant="subtle" color="gray" className={classes.periodBtn} compact>1H</Button>
                                        <Button variant="subtle" color="gray" className={classes.periodBtn} compact>1D</Button>
                                        <Button variant="subtle" color="gray" className={classes.periodBtn} compact>1W</Button>
                                    </Group>
                                </Center>
                            </Group>
                        </Box>
                        <ClientOnly>
                            <Chart />
                        </ClientOnly>
                    </Stack>
                </Grid.Col>
                <Grid.Col span={2}>
                    <Table highlightOnHover verticalSpacing="sm" horizontalSpacing="md">
                        <thead className={classes.tableThead}>
                            <tr>
                                <th style={{ wordWrap: 'normal' }}><Text className={classes.tableTheadText}>Pool</Text></th>
                                <th><Text className={classes.tableTheadText}>Ratio</Text></th>
                                <th style={{ wordWrap: 'normal' }}><Text className={classes.tableTheadText}>Liquidity</Text></th>
                                {/* <th></th> */}
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </Table>
                </Grid.Col>
            </Grid>


        </>

    );
}

export default MarketChart;