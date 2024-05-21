import React, { useEffect, useState } from 'react';
import { 
  Scheduler,
  Store
} from "@aldabil/react-scheduler";

import {
  TextField,
  Button,
  DialogActions
} from "@mui/material";
// import { Store } from '@mui/icons-material';
import { EVENTS } from './events'
// import { even } from 'is_js';
// import { reject } from 'lodash';
// import { func } from 'prop-types';
import axios from 'axios';


export default function Schedulers() {
 
  
  const [thisevents, setEvents] = useState([
    {
      event_id: 1,
      title: "Event 1",
      start: new Date(),
      end: new Date(),
    },
  ]);
  // let [thisevents, setEvents] = useState([
  //   // {
  //   //   event_id: 1,
  //   //   title: "Event 1",
  //   //   start: new Date(),
  //   //   end: new Date(),
  //   // },
  // ]);

  useEffect( () => {
    setEvents(EVENTS);
  }, [])

  
  // const handleconfirm = async(event) => {
  //   console.log("this is new event:");
  //   console.log(event);
    
  //   const newEvent = [...events, event];

  //   setEvents(newEvent);

  //   console.log("this is new events:");
  //   console.log(events);
  // }

  // const handledelete = async(event, action) => {
  //   console.log("handleConfirm =", action, event.title);
  //   console.log("this is event.todo_id:")
  //   console.log(event.todo_id)
  //   console.log("this is event.description:")
  //   console.log(event.description)
    
  // }

  const handleDelete = async (deletedId, event) => {
    console.log("this is delete:");
    console.log(deletedId);

    // console.log("this is event.todo_id:")
    // console.log(event.todo_id)
    // console.log("this is event.description:")
    // console.log(event.description)
    // console.log("this is event.color:")
    // console.log(event.color)
    // console.log("this is event.textColor:")
    // console.log(event.textColor)
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("this is delete:");
        console.log(deletedId);
        console.log(resolve(deletedId));
      },300);
    });
  };

  let this_event_id = 0;
  // const [this_event_id, set_this_event_id] = useState(0);

  // const handleEventclick = async(event, action) => {
  const handleEventclick = (event, action) => {
    
    console.log("handleConfirm =", action, event.title);
    console.log("this is event.event_id:")
    console.log(event.event_id)
    console.log(this_event_id)
    
    console.log("this is thisevents:");
    console.log(thisevents)


    this_event_id = event.event_id

    return this_event_id;
    // set_this_event_id(event.event_id)
   
  }
  // const handleConfirm = async (event, action) => {
    const handleConfirm = async(event, action) => {

      let even_id = Math.random();

      console.log("this is event_click:")
      console.log("handleConfirm =", action, event.title);


      // axios.post("http://localhost:3088/writein_addData", {
      //   id:even_id,
      //   // todo_id:event.todo_id,
      //   // description:event.description,
      //   // color:event.color,
      //   // textColor:event.textColor
      // }).then(() => {
      //   // 請求成功處理
      //   console.log("in the post:");
      // }).catch((error) => {
      //   // 請求失敗處理
      //   console.error("Error:", error);
      // });
    
    // console.log("this is event.todo_id:")
    // console.log(event.todo_id)
    // console.log("this is event.description:")
    // console.log(event.description)
    // console.log("this is event.color:")
    // console.log(event.color)
    // console.log("this is event.textColor:")
    // console.log(event.textColor)
    

    // await handleEventclick(event, action);
    // console.log("this is events in handle confirm:");
    // console.log(this_event_id)
    console.log("-------------------------------------");
    

    console.log("this is thisevents:");
    console.log(thisevents)

    get_query();    

    return new Promise((res, rej) => {
       
      const isFail = Math.random() > 0.6;
      // Make it slow just for testing
      setTimeout(() => {

        let event_idd = Math.random();


        if (isFail) {
          rej("Ops... Faild");
        } else {      //當成功後 才放入

              if (action === "edit") {
                    /** PUT event to remote DB */
                    // updateUser(event);
                    //---------------------------------------------------------------
                    // console.log("xxxxxxxxxxxxxxxxxxxxxxx")
                    // console.log("this is events in edit:");
                    // console.log(thisevents)
                    // console.log("this is update eventid:");
                    // console.log(this_event_id)
                    // console.log("xxxxxxxxxxxxxxxxxxxxxxx")


                    // get_query();


                    // const eventIndex = events.findIndex((e) => e.event_id === this_event_id);
                    // const eventIndex = thisevents.findIndex((e) => e.title === event.title);
                    const eventIndex = thisevents.findIndex((e) => e.event_id === this_event_id);
                    console.log("this is eventIndex");
                    console.log(eventIndex);

                    if(eventIndex !== -1){
                      const updatedEvents = [...thisevents];
                      console.log("this is in event title:");
                      console.log(event.title);

                      updatedEvents[eventIndex] = {
                        event_title: event.title || updatedEvents[eventIndex].event_title,
                        event_todo_id: event.todo_id || updatedEvents[eventIndex].event_todo_id,
                        event_description: event.description || updatedEvents[eventIndex].event_description,
                        event_color: event.color || updatedEvents[eventIndex].event_color,
                        event_textColor: event.textColor || updatedEvents[eventIndex].event_textColor,
                      };

                      setEvents(updatedEvents);
                    }
                    else{
                      console.log("Event not found for edit");
                    }
                    
                    
              } else if (action === "create") {
                /**POST event to remote DB */
                // createUser(event);

                    const newEvent = {
                      ...event,
                      event_id: event_idd,
                      event_title: event.title || Math.random(),
                      event_todo_id: event.todo_id || Math.random(),
                      event_description: event.description || Math.random(),
                      event_color: event.color  || Math.random(),
                      event_textColor: event.textColor  || Math.random(),
                    };
                
                    setEvents(prevEvents => [...prevEvents, newEvent]);

              }

              res({
                ...event,
                event_id: event.event_id || event_idd
                // event_id: event.event_id || Math.random()
              });

        }
      }, 3000);
    });
  };

  const show_data = () => {
    console.log("this is store event");
    console.log(thisevents);
  }

  const fetchRemote = async (query, event) => {
    console.log("this is fetch remote query_content:");
    console.log({ query });
    console.log(query.start);
    console.log("this is fetch remote event_content:");
    console.log(event);

  }

  // const confirm_queryClient = useQueryClient();
  const get_query = () => {
    console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
    console.log("this is confirm data");
    console.log(thisevents);
    console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
  }

  const view_cg = async(view, agenda) => {
    console.log("this is view:")
    console.log(view)
    console.log("this is agenda:")
    console.log(agenda)
  }

  return (
    
    <div>
      {/* <Button 
        color='info' 
        // onClick={ handleconfirm }
      >
        {('讀取資料')}
      </Button>
      <Button 
        color='success' 
        onClick={ show_data }
      >
        {('秀存取資料')}
      </Button>
      <Button 
        color='warning' 
        onClick={ get_query }
      >
        {('秀query存取資料')}
      </Button> */}
      <Scheduler  
        // onDelete={handledelete}
        // onClickMore={}
        // onViewChange={view_cg}
        // eventRenderer={(event, ...props) => {
        //   // console.log("this is event_renderer:")
        //   // console.log("this is event.todo_id:")
        //   // console.log(event.todo_id)
        //   // console.log("this is event.description:")
        //   // console.log(event.description)
        //   // console.log("this is event.color:")
        //   // console.log(event.color)
        //   // console.log("this is event.textColor:")
        //   // console.log(event.textColor)
        //   // console.log("this is props:")
        //   // console.log(props)
        // }}
        // getRemoteEvents={fetchRemote}
        // onDelete={handleDelete}
        // onEventClick={handleEventclick}
        // onConfirm={handleConfirm}

        height={500}
        events={EVENTS}
        // events={events}
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
                { id: 1, text: "灰色", value: "#4F4F4F" },
                { id: 2, text: "紅色", value: "#750000" },
                { id: 3, text: "桃紅色", value: "#BF0060" },
                { id: 4, text: "紫色", value: "#930093" },
                { id: 5, text: "籃紫色", value: "#5B00AE" },
                { id: 6, text: "深藍色", value: "#000093" },
                { id: 7, text: "藍色", value: "#0072E3" },
                { id: 8, text: "藍綠色", value: "#007979" },
                { id: 9, text: "淺綠色", value: "#019858" },
                { id: 10, text: "綠色", value: "#00BB00" },
                { id: 11, text: "黃綠色", value: "#82D900" },
                { id: 12, text: "黃色", value: "#E1E100" },
                { id: 13, text: "橘黃色", value: "#FFD306" },
              ],
              config: { label: "底色", required: true, errMsg: "Plz Select background color" }
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
        
        // onConfirm={handleconfirm}
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
      {/* <Schedulerref/> */}
      {/* <Store/> */}

    </div>
    
  );
   
}
