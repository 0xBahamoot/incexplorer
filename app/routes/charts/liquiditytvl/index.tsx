import Chart from "./chart.client";
import { ClientOnly } from "~/components/clientonly/clientonly";
import SectionTitle from "~/components/sectiontitle/sectiontitle";
function LiquidityTVLChart() {
    return (
        <>
            <SectionTitle text="Liquidity TVL" />
            <ClientOnly>
                <Chart />
            </ClientOnly>

        </>

    );
}

export default LiquidityTVLChart;