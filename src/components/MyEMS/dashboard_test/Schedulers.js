import React, { useEffect } from 'react';
import { Scheduler } from "@aldabil/react-scheduler";
import { EVENTS } from "./events";
// import { query } from "express";

export default function Schedulers() {

  return (
    //<Scheduler events={EVENTS} />
    <Scheduler
      height={500}
      events={EVENTS}
      //hourFormat="24" // 將時間格式設置為 24 小時制
      day={{
        navigation: true,
        // hourRenderer:
        startHour:0,
        endHour:24,
        step: 60
        // cellRenderer:{
        //   start:0,
        //   end:3,
        // }
      }}
      week={{
        startHour:0,
        endHour:24,
      }}
      fields={ 
        [{
          name: "description", 
          type: "input" , 
          config: { 
            label: "Description", 
            required: true, 
            min: 3, 
            email: true, 
            variant: "outlined"
          }
        }]
      }
      
      
    />
  );
   
}
