var container = $(".container");
var time = ["7:00","8:00","9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"]
var currentHour = moment().hour()
console.log(currentHour)
var date = $("#currentDay");
date.text(moment().format('dddd MMMM Do' + ", " + 'YYYY'));
container.append(date);

function onSiteLoaded() {
    for (i = 0; i < time.length; i++) {
        console.log(time[i])
        let thisTimeSlotAsInteger = parseInt(time[i])
        if (thisTimeSlotAsInteger < currentHour) {
            var timeClass = "past";
        }
        else if (thisTimeSlotAsInteger == currentHour) {
            var timeClass = "present";
        }
        else if (thisTimeSlotAsInteger > currentHour) {
            var timeClass = "future";
        }
        var row = $("<div>");
            row.attr("class", "row");
            container.append(row);
        var label = $("<label>");
            label.attr("class", "col-2 col-sm-1 time-block hour");
            label.text(time[i]);
            row.append(label);
        var textArea = $("<textarea>");
            textArea.attr("class", "col-8 col-sm-10 description " + timeClass);
            textArea.text(localStorage.getItem("btn" + i));
            row.append(textArea);
        var button = $("<button>");
            button.attr("class", "col-2 col-sm-1 saveBtn fas fa-save");
            button.attr("id", "btn" + i);
            row.append(button);
    };
};

function saveTask() {
    console.log($(this).prev())
    localStorage.setItem($(this).attr("id"), $(this).prev().val());

    $(this).prev().transfer( {
        to: $( $(this) ),
        duration: 400
      } );
};

window.onload = onSiteLoaded();

$(".saveBtn").on("click", saveTask);
