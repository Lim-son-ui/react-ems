import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";

// const demandResponse = 1200;
//儀錶板的基底數值
const demandResponse = 600;
// const warning = 1000;
const warning = 500;
// const ok = 800;
const ok = 200;

//ok中代表 綠色
//warning中代表 橙色
//warning外代表 紅色

class Gauge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      loading: true,
    };
  }

  componentDidMount() {
    this.axiosMock().then((res) => {
      this.setState({ value: res, loading: false });
      setInterval(() => {
        // this.setState((prevState) => ({ value: prevState.value + 10 }));
        //儀表指針對應位置 每次的移動
        // this.setState((prevState) => ({ value: prevState.value }));
        // this.setState((prevState) => ({ value: prevState.value + 5 }));
      }, 1000);
    });
  }

  axiosMock = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // resolve(100);
        //這邊改變 儀表中央的內容
        // resolve(66);
        //他這個不會有小數點所以會 自動四捨五入
        //因為有後面的 Math.round() 才會有四捨五入
        // resolve(231.5);
        resolve(450);
      }, 2000);
    });
  };

  render() {
    const { value, loading } = this.state;

    const option = {
      series: [
        {
          type: "gauge",
          animationDuration: 5000,
          progress: {
            show: true,
            width: 2,
            itemStyle: {
              color: "#fd7347",
            },
          },
          min: 0,
        //min: -60,
          max: demandResponse,
          splitNumber: 5,
          // splitNumber: 10,
          axisLine: {
            lineStyle: {
              width: 6,
              color: [
                [ok / demandResponse, "green"],
                [warning / demandResponse, "orange"],
                [1, "#FF6E76"],
              ],
            },
          },
          pointer: {
            icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
            // length: "12%",
            // width: 20,
            length: "25%",
            width: 35,
            //他這指針的基底位置不是很好調整
            offsetCenter: [0, "85%"],
            // offsetCenter: ["150%", "85%"],
            //offsetCenter: [0, "55%"],       //右側 跑到裡面
            // offsetCenter: [0, "100%"],   //右側
            // offsetCenter: [0, "-60%"],
            // offsetCenter: [0, "120%"],
            // offsetCenter: [0, "60%"],
          },
          axisTick: {
            length: 12,
            lineStyle: {
              color: "auto",
              width: 2,
            },
          },
          splitLine: {
            length: 20,
            lineStyle: {
              color: "auto",
              width: 5,
            },
          },
          title: {
            // offsetCenter: [0, "-30%"],
            offsetCenter: [0, "-20%"],
            fontSize: 30,
          },
          detail: {
            fontSize: 36,
            offsetCenter: [0, "10%"],
            valueAnimation: true,
            formatter: function (value) {
            //   return `${Math.round(value)} kW`;
            //   return `${Math.round(value)} v`;
                 return `${value} v`;
            },
            color: "auto",
          },
          data: [
            {
              value,
            //   name: "需量",
              name: "電壓",
            },
          ],
        },
      ],
    };

    return (
        //   <div style={{ height: "500px", width: "500px" }}>
      <div style={{ height: "60vh", width:"auto"}}>
        <ReactEcharts
          showLoading={loading}
          style={{ width: "100%", height: "100%" }}
          option={option}
        />
      </div>
    );
  }
}

class Gauge_chart_volt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mount: true,
    };
  }

  render() {
    const { mount } = this.state;
    return (
      <div>
        <button onClick={() => this.setState({ mount: !mount })}>click</button>
        {mount && <Gauge />}
      </div>
    );
  }
}

export default Gauge_chart_volt;

