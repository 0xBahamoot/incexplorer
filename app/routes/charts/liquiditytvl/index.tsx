import Chart from "./chart.client";
import { ClientOnly } from "~/components/clientonly/clientonly";
function LiquidityTVL() {
    return (
        <>
            <ClientOnly>
                <Chart />
            </ClientOnly>

        </>

    );
}

export default LiquidityTVL;