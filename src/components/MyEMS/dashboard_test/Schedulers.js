import React, { useEffect, useState, useRef } from 'react';
import { Scheduler } from "@aldabil/react-scheduler";

import { EVENTS } from "./events";
// import { query } from "express";
import {
  TextField,
  Button,
  DialogActions
} from "@mui/material";

import {
  EventActions,
  ProcessedEvent,
  SchedulerHelpers
} from "@aldabil/react-scheduler";
import { Events } from 'leaflet';
// import { even } from 'is_js';

export default function Schedulers() {
  
  // const calendarRef = useRef<Scheduler>(null);

  // const CustomEditor = ({scheduler}) => {
  //   const event = scheduler.edited;

  //   const [state, setState] = useState({
  //     title: event?.title || "",
  //     description: event?.description || ""
  //   });

  //   const [error, setError] = useState("");

  //   const handleChange = (value, name) => {
  //     setState((prev) => {
  //       return{
  //         ...prev,
  //         [name]: value
  //       };
  //     });
  //   };

  //   const handleSubmit = async () => {
  //     if(state.title.length < 3){
  //       return setError("Min 3 letters");
  //     }

  //     try{
  //       scheduler.loading(true);

  //       const added_updated_event = (
  //         await new Promise((res) => {

  //         })
  //       )

  //     }
  //     finally{

  //     }
  //   }


  //   return(
  //     <div>
  //     <div style={{ padding: "1rem" }}>
  //       <p>Load your custom form/fields</p>
  //       <TextField
  //         label="Title"
  //         value={state.title}
  //         onChange={(e) => handleChange(e.target.value, "title")}
  //         error={!!error}
  //         helperText={error}
  //         fullWidth
  //       />
  //       <TextField
  //         label="Description"
  //         value={state.description}
  //         onChange={(e) => handleChange(e.target.value, "description")}
  //         fullWidth
  //       />
  //     </div>
  //     <DialogActions>
  //       <Button onClick={scheduler.close}>Cancel</Button>
  //       <Button onClick={handleSubmit}>Confirm</Button>
  //     </DialogActions>
  //   </div>
  //   )


  // }

  // const read_field = () => {
  //   // console.log("this is event");
  //   // console.log(event);
  //   // console.log(event.title);

  //   // console.log("this is field");
  //   // console.log(fields);
  //   console.log("this is events content");
  //   console.log(EVENTS);
  // }

  // , EventActions
  const handleconfirm = async(ProcessedEvent, EventActions) => {
    console.log("this is event title")
    console.log(ProcessedEvent.title);

    console.log("this is event action")
    console.log(EventActions);
  }

  return (
    //<Scheduler events={EVENTS} />
    <div>
      <Button 
        color='info' 
        onClick={ handleconfirm }
      >
        {('讀取資料')}
      </Button>
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
          [
            {
              name: "todo_id",
              type: "select",
              // Should provide options with type:"select"
              options: [
                { id: 1, text: "充電", value: "充電" },
                { id: 2, text: "放電", value: 2 },
                { id: 3, text: "待機", value: 3 }
              ],
              config: { label: "策略", required: true, errMsg: "Plz Select User" }
            },
            {
              name: "description", 
              type: "input" , 
              config: { 
                label: "Description", 
                required: true, 
                min: 3, 
                // email: true, 
                variant: "outlined"
              }
            },
            {
              name: "color", 
              type: "select",
              // Should provide options with type:"select"
              options: [
                { id: 1, text: "藍色", value: "#0072E3" },
                { id: 2, text: "黃色", value: "#E1E100" },
                { id: 3, text: "綠色", value: "#82D900" }
              ],
              config: { label: "顏色", required: true, errMsg: "Plz Select background color" }
            },
            {
              name: "textColor", 
              type: "select",
              // Should provide options with type:"select"
              options: [
                { id: 1, text: "栗色", value: "#AD5A5A" },
                { id: 2, text: "墨綠色", value: "#949449" },
                { id: 3, text: "深紫色", value: "#9F4D95" }
              ],
              config: { label: "文字顏色", required: true, errMsg: "Plz Select text color" }
            }
          ]
        }
        
        onConfirm={handleconfirm}
        // customEditor={
        //   () => <CustomEditor scheduler/>
        // }
        // customViewer={(fields, event) => {
        //   return(
        //     <div>
        //       <p>執行策略: { event.todo_id || "Nothing..."}</p>
        //     </div>
        //   )
        // }}
        // 這到底是用來改什麼的  查到是說控制是否顯示加載狀態
        // loading={false}
        // loadingComponent={(fields, event) => {
        //   return(
        //     <div>
        //       <p>執行策略: { event.todo_id || "Nothing..."}</p>
        //     </div>
        //   )
        // }}

        viewerExtraComponent={(fields, event) => {
          return(
            <div>
              {/* <p>useful to render custom fields...</p> */}
              {/* <p>執行策略: { event.todo_id.text || "Nothing..."}</p> */}
              <p>執行策略: { event.todo_id || "Nothing..."}</p>
              <p>Description: { event.description || "Nothing..."}</p>              
              {/* <Button color='info' onClick={read_field}>read the event</Button> */}
            </div>
          )
        }}

      />
    </div>
    
  );
   
}
