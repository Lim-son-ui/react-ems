// 沒用到
export const User = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    state: '',
};
 
export const fakeData = [
    // {
    //   id: '',
    //   strategy: '',
    //   month: '',
    //   starttime: '',
    //   endtime: '',
    //   power: '',
    // },
  ];
//   export const fakeData = [
//     {
//       id: '9s41rp',
//       strategy: 'Kelvin',
//       month: 'Langosh',
//       starttime: 'Jerod14@hotmail.com',
//       endtime: 'Ohio',
//       power: '1',
//     },
//     {
//       id: '08m6rx',
//       strategy: 'Molly',
//       month: 'Purdy',
//       starttime: 'Hugh.Dach79@hotmail.com',
//       endtime: 'Rhode Island',
//       power: '1',
//     },
//     {
//       id: '5ymtrc',
//       strategy: 'Henry',
//       month: 'Lynch',
//       starttime: 'Camden.Macejkovic@yahoo.com',
//       endtime: 'California',
//       power: '1',
//     },
//     {
//       id: 'ek5b97',
//       strategy: 'Glenda',
//       month: 'Douglas',
//       starttime: 'Eric0@yahoo.com',
//       endtime: 'Montana',
//       power: '1',
//     },
//     {
//       id: 'xxtydd',
//       strategy: 'Leone',
//       month: 'Williamson',
//       starttime: 'Ericka_Mueller52@yahoo.com',
//       endtime: 'Colorado',
//       power: '1',
//     },
//     {
//       id: 'wzxj9m',
//       strategy: 'Mckenna',
//       month: 'Friesen',
//       starttime: 'Veda_Feeney@yahoo.com',
//       endtime: 'New York',
//       power: '1',
//     },
//     {
//       id: '21dwtz',
//       strategy: 'Wyman',
//       month: 'Jast',
//       starttime: 'Melvin.Pacocha@yahoo.com',
//       endtime: 'Montana',
//       power: '1',
//     },
//     {
//       id: 'o8oe4k',
//       strategy: 'Janick',
//       month: 'Willms',
//       starttime: 'Delfina12@gmail.com',
//       endtime: 'Nebraska',
//       power: '1',
//     },
//   ];
 
  export const usStates = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
    'Puerto Rico',
  ];



  export const options_strategy = [
    {
        value: '充電',
        label: '充電',
    },
    {
        value: '放電',
        label: '放電',
    },
    {
      value: '待機',
      label: '待機',
    },
  ];
//----------------------------------------------------
export const options_month = [
    {
      value: '1',
      label: '1',
    },
    {
      value: '2',
      label: '2',
    },
    {
      value: '3',
      label: '3',
    },
    {
      value: '4',
      label: '4',
    },
    {
      value: '5',
      label: '5',
    },
    {
      value: '6',
      label: '6',
    },
    {
      value: '7',
      label: '7',
    },
    {
      value: '8',
      label: '8',
    },
    {
      value: '9',
      label: '9',
    },
    {
      value: '10',
      label: '10',
    },
    {
      value: '11',
      label: '11',
    },
    {
      value: '12',
      label: '12',
    },
  ];

//----------------------------------------------------
export const option_minute = []

for(let i = 0; i <60; i++){
    const minutelabel = i + '分';
    const minuteOption = {
        value: minutelabel,
        label: minutelabel,
    }

    option_minute.push(minuteOption);
}

export const option_time = []


for(let i = 0; i < 24; i++){
    const timelabel = i + '時';
    const timeOption = {
        value: timelabel,
        label: timelabel,
        //children: option_minute
    }

    option_time.push(timeOption);
}



