let currentDate = document.querySelector(".current-date");
let dateTag = document.querySelector(".date");
let prevNextIcon = document.querySelectorAll(".button i");
// let bookedDate = new Date(2023, 9, 20);

function bookedObj(time, status) {
  this.time = time;
  this.status = status;
}

let bookedList = [
  new bookedObj("12/09/2023/15/20/16/20", "reject"),
  new bookedObj("14/09/2023/17/20/19/20", "accept"),
  new bookedObj("14/09/2023/17/20/19/20", "pending"),
  new bookedObj("1/09/2023/17/20/19/20", "pending"),
  new bookedObj("30/09/2023/17/20/19/20", "pending"),
  new bookedObj("20/09/2023/17/20/19/20", "pending"),
];

let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth(), //current month - 1
  currDate = date.getDate();
const monthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//Render Calender
const renderCalender = () => {
  //month & year
  let timeString = `${monthList[currMonth]} ${currYear}`;

  //date
  let FirstDayofMonth = new Date(currYear, currMonth, 1).getDay(); //lấy thứ của ngày 1 tháng hiện tại, = sunday
  let lastDateofPrevMonth = new Date(currYear, currMonth + 1, 0).getDate(); 
  let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
  let lastDayofMonth = new Date(
    currYear,
    currMonth,
    lastDateofPrevMonth
  ).getDay(); //lấy thứ của ngày cuoi cung tháng hiện tại, = sunday
  let today = new Date();
  let liTag = "";

  //previous month
  for (let i = FirstDayofMonth; i > 0; i--) {
    liTag += `<li class="inactive">${lastDateofPrevMonth - i + 1}</li>`;
    // liTag += `<li class="inactive">-</li>`;
  }

  //current month

  //generate dates
  for (let i = 1; i <= lastDateofMonth; i++) {
    let bookedTag = ``,
    todayClass = ``;

    //Loop to add booked label
    for (let z = 0; z < bookedList.length; z++) {
        //split time 
        let bookedTimeSplit = bookedList[z].time.split("/");
        //Create Obj Date
        let bookedDate = new Date(bookedTimeSplit[2], bookedTimeSplit[1], bookedTimeSplit[0]);
        //Set data for label
        let bookedTimeInput = `${bookedTimeSplit[3]}:${bookedTimeSplit[4]} - ${bookedTimeSplit[5]}:${bookedTimeSplit[6]}`;
        let status = `${bookedList[z].status}`;
        let color = "";

      //set color base on status
      switch (status) {
        case "reject":
          color = "red";
          break;
        case "pending":
          color = "rgb(255, 225, 0)";
          break;
        case "accept":
          color = "green";
          break;
      }

      //add label tag for booked date
      if (
        i === bookedDate.getDate() &&
        bookedDate.getMonth() === currMonth + 1 &&
        bookedDate.getFullYear() === currYear
      ) {
        bookedTag += `<label class="booked">
                <div class="bookedTime">${bookedTimeInput}</div>
                <div style="background-color:${color}" class="bookedStatus"></div>
                </label> `;
      }
    }

    //Style for today
    if (
      i === today.getDate() &&
      currMonth === today.getMonth() &&
      currYear === today.getFullYear()
    ) {
      todayClass = `class="today"`;
    }

    //style for normal date
    liTag += `<li ${todayClass}>${i} ${bookedTag}</li>`;
  }

  //next month
  for (let i = lastDayofMonth; i < 6; i++) {
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }

  //update
  dateTag.innerHTML = liTag;
  currentDate.textContent = timeString;

  //show booked
  let bookedTime = document.querySelector(".bookedTime");
  let bookedStatus = document.querySelector(".bookedStatus");
};

renderCalender();

//Button
prevNextIcon.forEach((icon) => {
  icon.addEventListener("click", () => {
    if (icon.id === "prev") {
      //previous year
      if (currMonth + 1 === 1) {
        currYear -= 1;
        currMonth = 12 - 1;
      } else {
        currMonth -= 1;
      }
    } else {
      //next year
      if (currMonth + 1 === 12) {
        currYear += 1;
        currMonth = 1 - 1;
      } else {
        currMonth += 1;
      }
    }
    renderCalender();
  });
});
