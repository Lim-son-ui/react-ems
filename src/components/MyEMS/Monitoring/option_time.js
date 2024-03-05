const option_minute = []

for(let i = 0; i <60; i++){
    const minutelabel = i + '分';
    const minuteOption = {
        value: minutelabel,
        label: minutelabel,
    }

    option_minute.push(minuteOption);
}

const option_time = []


for(let i = 0; i < 24; i++){
    const timelabel = i + '時';
    const timeOption = {
        value: timelabel,
        label: timelabel,
        children: option_minute
    }

    option_time.push(timeOption);
}


export default option_time;