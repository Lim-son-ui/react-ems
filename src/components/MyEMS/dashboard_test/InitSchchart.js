import { SciChartSurface } from "scichart/Charting/Visuals/SciChartSurface";
import {NumericAxis} from "scichart/Charting/Visuals/Axis/NumericAxis";
import {FastLineRenderableSeries} from "scichart/Charting/Visuals/RenderableSeries/FastLineRenderableSeries";
import {XyDataSeries} from "scichart/Charting/Model/XyDataSeries";

// import { SciChartReact } from "scichart-react";

// const initScichart = () => {
// async function initScichartfnct(){
async function initScichart(){
    

    //---------------------------------------------------------------------------------------------------------------------------------
    const {sciChartSurface, wasmContext} = SciChartSurface.create("scichart-root");
    // Create an X,Y Axis and add to the chart
    const xAxis = new NumericAxis(wasmContext);
    const yAxis = new NumericAxis(wasmContext);
   
    sciChartSurface.xAxes.add(xAxis);
    sciChartSurface.yAxes.add(yAxis);   
   
    // Create 100 dataseries, each with 10k points
    for (let seriesCount = 0; seriesCount < 100; seriesCount++) {       
        const xyDataSeries = new XyDataSeries(wasmContext);
        const opacity = (1 - ((seriesCount / 120))).toFixed(2);
        // Populate with some data
        for(let i = 0; i < 10000; i++) {
            xyDataSeries.append(i, Math.sin(i* 0.01) * Math.exp(i*(0.00001*(seriesCount+1))));
        }
        // Add and create a line series with this data to the chart
        // Create a line series       
        const lineSeries = new FastLineRenderableSeries(wasmContext, {
            dataSeries: xyDataSeries,
            stroke: `rgba(176,196,222,${opacity})`,
            strokeThickness:2
        });
        sciChartSurface.renderableSeries.add(lineSeries);
    }

   
    return { sciChartSurface };
}
// initScichartfnct();
// initScichart();
export default initScichart;

// export const initScichart = () => {

//     return(
//         <SciChartReact style={{ width: 400, height: 300 }} initScichart={initScichartfnct}/>
//     )
// };

// export const initScichart = () => (
//         <SciChartReact 
//             style={{ width: 400, height: 300 }} 
//             initScichart={initScichartfnct}
//         />

// );
