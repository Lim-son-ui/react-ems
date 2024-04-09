import React, { useEffect } from 'react';
import { Scheduler } from "@aldabil/react-scheduler";
import { EVENTS } from "./events";
// import { query } from "express";

export default function Schedulers() {

  return (
    <Scheduler events={EVENTS} />
  );
    // <Scheduler events={EVENTS} />
    // <Scheduler
    //   height={500}
    //   events={EVENTS}
    //   hourFormat="24" // 將時間格式設置為 24 小時制
    //   // day={{
    //   //   start: "05:00", // 設置一天的開始時間為 09:00 AM
    //   //   end: "23:00", // 設置一天的結束時間為 04:00 PM
    //   // }}
    //   fields={ 
    //     [{
    //       name: "description", 
    //       type: "input" , 
    //       config: { 
    //         label: "Description", 
    //         required: true, 
    //         min: 3, 
    //         email: true, 
    //         variant: "outlined"
    //       }
    //     }]
    //   }
    //   // getRemoteEvents={[]}
    // />
  
}
