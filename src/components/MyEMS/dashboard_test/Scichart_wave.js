// import React, { useState, useRef } from "react";
// import { makeStyles } from "@material-ui/core/styles"; // 引入 makeStyles
// import { appTheme } from "./theme";
// import { ExampleDataProvider } from "./ExampleDataProvider";
// import { Button } from "@material-ui/core";
// import {
//     CentralAxesLayoutManager,
//     EInnerAxisPlacementCoordinateMode,
//     EAxisAlignment,
//     GlowEffect,
//     FastLineRenderableSeries,
//     NumericAxis,
//     NumberRange,
//     SciChartSurface,
//     XyDataSeries,
// } from "scichart";
// import { SciChartReact } from "scichart-react";

// const useStyles = makeStyles((theme) => ({ // 定義 useStyles
//     flexOuterContainer: {
//         width: "100%",
//         height: "100%",
//         display: "flex",
//         flexDirection: "column",
//         background: appTheme.DarkIndigo,
//     },
//     toolbarRow: {
//         display: "flex",
//         flexBasis: "70px",
//         padding: 10,
//         width: "100%",
//         color: appTheme.ForegroundColor,
//     },
//     chartArea: {
//         flex: 1,
//     },
// }));

// const AMPLITUDE = 200;

// const Scichart_wave = () => {
//     const controlsRef = useRef(null);
//     const [stats, setStats] = useState({ numberSeries: 0, numberPoints: 0, fps: 0 });

//     const drawExample = async (rootElement) => {
//         const { wasmContext, sciChartSurface } = await SciChartSurface.create(rootElement, {
//             theme: appTheme.SciChartJsTheme,
//         });

//         const options = {
//             horizontalAxisPositionCoordinateMode: EInnerAxisPlacementCoordinateMode.Relative,
//             verticalAxisPositionCoordinateMode: EInnerAxisPlacementCoordinateMode.Relative,
//             horizontalAxisPosition: 0.5,
//             verticalAxisPosition: 0.5,
//         };

//         sciChartSurface.xAxes.add(
//             new NumericAxis(wasmContext, {
//                 visibleRange: new NumberRange(0, 900),
//                 isInnerAxis: true,
//                 axisAlignment: EAxisAlignment.Top,
//                 labelStyle: {
//                     color: appTheme.PaleSkyBlue,
//                 },
//                 axisBorder: {
//                     borderTop: 1,
//                     color: appTheme.VividSkyBlue,
//                 },
//             })
//         );

//         sciChartSurface.yAxes.add(
//             new NumericAxis(wasmContext, {
//                 visibleRange: new NumberRange(-300, 300),
//                 isInnerAxis: true,
//                 axisAlignment: EAxisAlignment.Left,
//                 labelStyle: {
//                     color: appTheme.PaleSkyBlue,
//                 },
//                 axisBorder: {
//                     borderLeft: 1,
//                     color: appTheme.VividSkyBlue,
//                 },
//             })
//         );

//         sciChartSurface.layoutManager = new CentralAxesLayoutManager(options);

//         const addSeries = (stroke, opacity) => {
//             const amplitude = Math.random() * AMPLITUDE;
//             const effect = new GlowEffect(wasmContext, {
//                 range: 0,
//                 intensity: 0.5,
//             });
//             const lineSeries = new FastLineRenderableSeries(wasmContext, { stroke, effect });
//             lineSeries.strokeThickness = 3;
//             lineSeries.opacity = opacity;
//             sciChartSurface.renderableSeries.add(lineSeries);
//             const { xValues, yValues } = ExampleDataProvider.getNoisySinewave(500, 900, 7, amplitude, 30);
//             lineSeries.dataSeries = new XyDataSeries(wasmContext, { xValues, yValues });
//             return lineSeries;
//         };

//         const seriesColor = appTheme.VividTeal;
//         const series1 = addSeries(seriesColor, 1);
//         const series2 = addSeries(seriesColor, 0.9);
//         const series3 = addSeries(seriesColor, 0.8);
//         const series4 = addSeries(seriesColor, 0.7);
//         const series5 = addSeries(seriesColor, 0.6);
//         const series6 = addSeries(seriesColor, 0.5);
//         const series7 = addSeries(seriesColor, 0.4);
//         const series8 = addSeries(seriesColor, 0.3);
//         const series9 = addSeries(seriesColor, 0.2);
//         const series10 = addSeries(seriesColor, 0.1);
//         let timerId;

//         const reassignRenderableSeries = () => {
//             const oldSeries = series10.dataSeries;
//             series10.dataSeries = series9.dataSeries;
//             series9.dataSeries = series8.dataSeries;
//             series8.dataSeries = series7.dataSeries;
//             series7.dataSeries = series6.dataSeries;
//             series6.dataSeries = series5.dataSeries;
//             series5.dataSeries = series4.dataSeries;
//             series4.dataSeries = series3.dataSeries;
//             series3.dataSeries = series2.dataSeries;
//             series2.dataSeries = series1.dataSeries;
    
//             const amplitude = Math.random() * AMPLITUDE;
//             const dataSeries = new XyDataSeries(wasmContext);
//             ExampleDataProvider.fillNoisySinewave(500, 900, 7, amplitude, 30, dataSeries);
//             series1.dataSeries = dataSeries;
    
//             oldSeries.delete();
    
//             timerId = setTimeout(reassignRenderableSeries, 20);
//         };

//         const stopAnimation = () => {
//             clearTimeout(timerId);
//             timerId = undefined;
//         };

//         const startAnimation = () => {
//             if (timerId) {
//                 stopAnimation();
//             }
//             reassignRenderableSeries();
//         };

//         return { wasmContext, sciChartSurface, controls: { startAnimation, stopAnimation } };
//     };

//     const classes = useStyles(); // 使用 useStyles

//     // 程式碼保持不變

//     return (
//         <div className={classes.ChartWrapper}>
//             <div className={classes.flexOuterContainer}>
//                 <div className={classes.toolbarRow}>
//                     <Button
//                         id="startAnimation"
//                         style={{ color: appTheme.ForegroundColor }}
//                         onClick={() => controlsRef.current.startAnimation()}
//                     >
//                         Start
//                     </Button>
//                     <Button
//                         id="stopAnimation"
//                         style={{ color: appTheme.ForegroundColor }}
//                         onClick={() => controlsRef.current.stopAnimation()}
//                     >
//                         Stop
//                     </Button>
//                     <span style={{ margin: 12 }}># Series: {stats.numberSeries}</span>
//                     <span
//                         style={{
//                             margin: 12,
//                             minWidth: "200px",
//                         }}
//                     >
//                         # DataPoints: {stats.numberPoints.toLocaleString()}
//                     </span>
//                     <span style={{ margin: 12 }}>FPS: {stats.fps.toFixed(0)}</span>
//                 </div>
//                 <SciChartReact
//                     className={classes.chartArea}
//                     initChart={drawExample}
//                     onInit={({ sciChartSurface, controls }) => {
//                         controlsRef.current = controls;

//                         let lastRendered = Date.now();
//                         sciChartSurface.rendered.subscribe(() => {
//                             const currentTime = Date.now();
//                             const timeDiffSeconds = new Date(currentTime - lastRendered).getTime() / 1000;
//                             lastRendered = currentTime;
//                             const fps = 1 / timeDiffSeconds;
//                             setStats({
//                                 numberSeries: sciChartSurface.renderableSeries.size(),
//                                 numberPoints:
//                                     sciChartSurface.renderableSeries.size() *
//                                     sciChartSurface.renderableSeries.get(0).dataSeries.count(),
//                                 fps,
//                             });
//                         });

//                         controls.startAnimation();
//                     }}
//                     onDelete={({ controls }) => {
//                         controls.stopAnimation();
//                     }}
//                 />
//             </div>
//         </div>
//     );
// };

// export default Scichart_wave;
