import { SciChartSurface } from "scichart/Charting/Visuals/SciChartSurface";
import {NumericAxis} from "scichart/Charting/Visuals/Axis/NumericAxis";
import {FastLineRenderableSeries} from "scichart/Charting/Visuals/RenderableSeries/FastLineRenderableSeries";
import {XyDataSeries} from "scichart/Charting/Model/XyDataSeries";
const { useEffect } = require("react");


const createChart = async (divElementId) => {
    const { sciChartSurface, wasmContext } = await SciChartSurface.create(divElementId);
    const xAxis = new NumericAxis(wasmContext);
    const yAxis = new NumericAxis(wasmContext);
    sciChartSurface.xAxes.add(xAxis);
    sciChartSurface.yAxes.add(yAxis);
    return { sciChartSurface };
};

function SciChart() {
    const rootElementId = 'chart';
    useEffect(() => {
       createChart(rootElementId); // Note, does not delete on unmount (todo later)
    }, []);
    return <div id={rootElementId} style={{width: 800, height: 600}} />;
}