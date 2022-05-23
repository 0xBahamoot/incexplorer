import Chart from "./chart.client";
import { ClientOnly } from "~/components/clientonly/clientonly";
import SectionTitle from "~/components/sectiontitle/sectiontitle";
function MarketChart() {
    return (
        <>
            <SectionTitle text="Market" />
            <ClientOnly>
                <Chart />
            </ClientOnly>

        </>

    );
}

export default MarketChart;