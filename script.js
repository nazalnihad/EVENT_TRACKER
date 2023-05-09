const calendar = document.querySelector(".calendar"),
        date = document.querySelector(".date"),
        daysContainer = document.querySelector(".days"),
        prev = document.querySelector(".prev"),
        next = document.querySelector(".next"),
        todayBtn = document.querySelector(".today-btn"),
        gotoBtn = document.querySelector(".goto-btn"),
        dateInput = document.querySelector(".date-input");


let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = ["Jan","Feb","Mar","Apr","May","June","July","Aug",
"Sep","Oct","Nov","Dec"];

const eventsArr = [
  {
    day: 13,
    month: 11,
    year: 2022,
    events: [
      {
        title: "Event 1 lorem ipsun dolar sit genfa tersd dsad ",
        time: "10:00 AM",
      },
      {
        title: "Event 2",
        time: "11:00 AM",
      },
    ],
  },
];

function initCalender()
{
    const firstDay = new Date(year , month ,1);
    const lastDay = new Date(year , month+1,0);
    const prevLastDay = new Date(year,month,0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7-lastDay.getDay()-1;

    //heading of calender
    date.innerHTML = months[month]+" "+year;

    let days = "";

    //set prev month days
    for(let x = day;x>0;x--)
    {
        days += `<div class="day prev-date>${prevDays-x+1}</div>`;
    }

    //current month
    for(let i=1;i<=lastDate;i++)
    {
        //event check if present
        let event = false;
        eventsArr.forEach((eventObj)=>{
            if(
                eventObj.day === i && eventObj.month === month+1 && eventObj.year === year
            ){
                event = true;
            }
        });

        if(i===new Date().getDate() && 
        year === new Date().getFullYear() && 
        month === new Date().getMonth())
        {
            if(event){
                days += `<div class="day today event">${i}</div>`;
            }
            else{
            days += `<div class="day today">${i}</div>`;
            }
    
        }
        else{
            if(event){
                days += `<div class="day event">${i}</div>`;
            }
            else{
            days += `<div class="day ">${i}</div>`;
            }
        }
    }

    for(let j=1;j<=nextDays;j++)
    {
        days += `<div class="day next-day>${j}</div>`;
    }
    daysContainer.innerHTML = days;

}

initCalender();

//previous month

function prevMonth()
{
    month--;
    if(month<0)
    {
        month = 11;
        year--;
    }
    initCalender();
}

//next month
function nextMonth()
{
    month++;
    if(month>11)
    {
        month = 0;
        year++;
    }
    initCalender();
}

//event listeners

prev.addEventListener("click",prevMonth);
next.addEventListener("click",nextMonth);

//goto's
todayBtn.addEventListener("click",()=>{
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalender();
});


dateInput.addEventListener("keyup",(e)=>{
    //number checking condition
    dateInput.value = dateInput.value.replace(/[^0-9/]/g,"");
    if(dateInput.value.length === 2){
        // to get in date format
        dateInput.value+="/";
    } 
    if(dateInput.value.length>7){
        //7 char limit
        dateInput.value = dateInput.value.slice(0,7);
    }
    //to fix bug on not backslashing
    if(e.inputType === "deleteContentBackward"){
        if(dateInput.value.length===3){
            dateInput.value = dateInput.value.slice(0,2);
        }
    }
});

gotoBtn.addEventListener("click",gotoDate);

function gotoDate()
{
    const dateArr = dateInput.value.split("/");
    if(dateArr.length===2){
        if(dateArr[0]>0 && dateArr[0]<13 && dateArr[1].length===4){
            month = dateArr[0]-1;
            year = dateArr[1];
            initCalender();
        }
    return; //for invalid entry
    }
    alert("invalid entry");
}

const addEventBtn = document.querySelector(".add-event"),
    addEventContainer = document.querySelector(".add-event-wrapper"),
    addEventCloseBtn = document.querySelector(".close"),
    addEventTitle = document.querySelector(".event-name"),
    addEventFrom = document.querySelector(".event-time-from"),
    addEventTo = document.querySelector(".event-time-to");


addEventBtn.addEventListener("click",()=>
{
    addEventContainer.classList.toggle("active");
});
addEventCloseBtn.addEventListener("click",()=>
{
    addEventContainer.classList.remove("active");
});

document.addEventListener("click",(e)=>{
    if(e.target!=addEventBtn && !addEventContainer.contains(e.target))
    {
        addEventContainer.classList.remove("active");
    }
});

//max limit word set
addEventTitle.addEventListener("input",(e)=>{
    addEventTitle.value = addEventTitle.value.slice(0,50);
});

//time format only
addEventFrom.addEventListener("input",(e)=>{
    addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g,"");
    if(addEventFrom.value.length ===2){
        addEventFrom.value+=":";
    }
    if(addEventFrom.value.length > 5){
        addEventFrom.value = addEventFrom.value.slice(0,5);
    }
});