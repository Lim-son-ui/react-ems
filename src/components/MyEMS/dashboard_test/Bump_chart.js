import React , { useEffect, useState } from 'react'
import ReactEchartsCore from 'echarts-for-react';

function Bump_chart() {
    const [ option, setoption ] = useState({});
    const names = [];
    const years = [];
    const shuffle = (array) => {

    };

    useEffect(() => {
        setoption({
            title: {
                text: 'bump chart (ranking)'
            },
            tooltip:{
                trigger: 'item'
            },
            grid:{
                left: 30,
                right: 110,
                bottom: 30,
                containLabel: true
            },
            toolbox:{
                feature:{
                    saveAsImage: {}
                }
            },
            xAxis:{
                type: 'category',
                splitLine: {
                    show: true
                },
                axisLabel: {
                    margin: 30,
                    fontsize: 16
                },
                boundaryGap: false,
                data: years
            },
            yAxis:{
                type: 'value',
               
                axisLabel: {
                    margin: 30,
                    fontsize: 16,
                    formatter: '#{value}'
                },
                inverse: true,
                interval: 1,
                min: 1,
                max: names.length
            },
            series: 
        })
    }, []);


    return (
        <ReactEchartsCore
            option={option}
            notMerge={true}
            lazyUpdate={true}
            theme={'light'}
            style={{ height: '400px', width: '100%' }}
        />
    )
}

export default Bump_chart
