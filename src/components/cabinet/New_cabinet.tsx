import React from "react";
// import "./New_cabinet.css";
import "./App1.css";
import MachineRoom from "./MachineRoom";
// import { getCabinetByName } from "./Cabinet";

//机房对象
let room: MachineRoom;
// 画布
let canvas: HTMLCanvasElement;

const path = '	https://mock.apifox.cn/m1/772752-0-default/cabinet/'
function getCabinetByName(name) {
  return fetch(path + name).then((res) => res.json());
}

class New_cabinet extends React.Component {
  state = {
    //信息面板的位置
    planePos: {
      left: 0,
      top: 0,
    },
    // 信息面板的可见性
    planeDisplay: "none",
    // 当前机柜的详细信息
    curCabinet: {
      // 名称
      name: "Loading……",
      // 温度
      temperature: 0,
      // 容量
      capacity: 0,
      // 服务器数量
      count: 0,
    },
  };
  // 组件挂载完成后，实例化机房对象，渲染机房
  componentDidMount() {
    if (!canvas) {
      return;
    }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    room = new MachineRoom(canvas);
    room.loadGLTF("machineRoom.gltf");
    room.animate();
    //当鼠标划入机柜，显示信息面板
    room.onMouseOverCabinet = ({ name }) => {
      this.setState({ planeDisplay: "block" });
      //基于cabinet.name 获取机柜数据
      getCabinetByName(name).then(({ temperature, capacity, count }) => {
        this.setState({
          curCabinet: { name, temperature, capacity, count },
        });
      });
    };
    //当鼠标在机柜上移动，让信息面板随鼠标移动
    room.onMouseMoveCabinet = (left, top) => {
      this.setState({ planePos: { left, top } });
    };
    //当鼠标划出机柜，隐藏信息面板
    room.onMouseOutCabinet = () => {
      this.setState({ planeDisplay: "none" });
    };
  }
  // 鼠标移动事件
  mouseMove({ clientX, clientY }) {
    room.selectCabinet(clientX, clientY);
  }
  // 建立canvas 画布，并通过ref 获取其HTMLCanvasElement对象
  render() {
    const {
      planePos: { left, top },
      planeDisplay: display,
      curCabinet: { name, temperature, capacity, count },
    } = this.state;
    return (
      <div className="App1" onMouseMove={this.mouseMove}>
        <canvas id="canvas" ref={(ele) => (canvas = ele)}></canvas>
        <div id="planee" style={{ left, top, display }}>
          <p>機櫃名稱：{name}</p>
          <p>機櫃溫度：{temperature}°</p>
          <p>
            使用情况：{count}/{capacity}
          </p>
        </div>
      </div>
    );
  }
}

export default New_cabinet;
