import Chart from "./chart.client";
import { ClientOnly } from "~/components/clientonly/clientonly";
import SectionTitle from "~/components/sectiontitle/sectiontitle";
function TradingVolumeChart() {
    return (
        <>
            <SectionTitle text="Trading Volume" />
            <ClientOnly>
                <Chart />
            </ClientOnly>

        </>

    );
}

export default TradingVolumeChart;