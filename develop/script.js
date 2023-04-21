$(document).ready(function() {
    
    // moment date in
    const currentDate = moment();
    
    
    $("#currentDay").text(currentDate.format("dddd - MMM, Do YYYY"));
  
    //  create rows for schedule
    function dailyScheduler(date) {
  
        // Set start time from 8am
        date = moment(date).hour(8);
  
        for (let i = 0; i < 12; i++) {
            
            // add Bootstrap Row
            const rowDiv = $("<div>").addClass("row").attr("id", `row${i}`);
  
            // add Hour
            const hourDiv = $("<div>").addClass("col-1 hour time-block d-flex align-items-center justify-content-center").text(date.format("H a")).attr("id", `hour${i}`);
            
            // add Text boX 
            const textDiv = $("<textarea>").addClass("col-10 time-block text-box save-block").attr("id", `text${i}`);
            
            // add Save button
            const saveDiv = $("<div>").addClass("col-1 d-flex align-items-center justify-content-center saveBtn save-block");
            let saveBtnIcon = $("<button>").addClass("btn fas fa-save fa-lg save-button").attr("id", i).attr("title", "Save");
            
            // append those on the container           
            $(".container").append(rowDiv.append(hourDiv,textDiv,saveDiv.append(saveBtnIcon)));
  
            // color code textDiv based on current time
            if (currentDate.isAfter(date, "hour")) {
                textDiv.addClass("past");
            } else if (currentDate.isBefore(date, "hour")) {
                textDiv.addClass("future");
            } else {
                textDiv.addClass("present");
            }
  
            // increment starting hour
            date.add(1, "hour");
        }        
    }
  
    
    
    $( window ).on("load", dailyScheduler());
  
    // page objects
    let saveButton = $(".saveBtn");
    let textBox = $(".text-box");
    let clearButton = $(".clr-btn");
  
    // function to show to-dos
    function showToDo() {
        // Get stored to-dos from localStorage
        for (let i = 0; i < 12; i++) {
            let storedCalList = localStorage.getItem("text" + i);
            $("#text" + i).text(storedCalList);
        }
    }
  
    // function to add 
    function addText(e) {
        e.preventDefault();
        localStorage.setItem($(this)[0].previousElementSibling.id, 
        $(this)[0].previousElementSibling.value);
    }
  
    // click event and save the text
    saveButton.click(addText);
    showToDo();
  
    // refresh 
    clearButton.on("click", function() {
        localStorage.clear();
        textBox.empty();
        location.reload();
    });
  });
  