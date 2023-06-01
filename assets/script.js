// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});

// Starter code. 

var hourIdList = ['hour-9','hour-10','hour-11','hour-12','hour-1','hour-2','hour-3','hour-4','hour-5'];
var hourTextList = ['9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM'];

function hourDisplayer() {
  var rootEl = $('#root');
  for (var i=0; i < hourIdList.length; i++) {
    var hourEl = $('<div>');
    hourEl.addClass('row time-block');
    hourEl.attr('id', hourIdList[i]);
    var col1 = $('<div>');
    col1.addClass('col-2 col-md-1 hour text-center py-3');
    col1.text(hourTextList[i]);
    hourEl.append(col1);
    var textEl = $('<textarea>');
    textEl.addClass(' col-8 col-md-10 description');
    textEl.attr('rows','3');
    textEl.text(" ");
    hourEl.append(textEl);
    var buttonEl = $('<button>');
    buttonEl.addClass('btn saveBtn col-2 col-md-1')
    buttonEl.attr('aria-label','save')
    var iEl = $('<i>');
    iEl.addClass('fas fa-save');
    iEl.attr('aria-hidden','true');
    buttonEl.append(iEl);
    hourEl.append(buttonEl);
    rootEl.append(hourEl);
  }
};
hourDisplayer();

$(document).ready(function () {
  // create plannerItem if not already existing
  var scheduleItems = JSON.parse(localStorage.getItem("plannerItem"));
  if (scheduleItems == null) {
    scheduleItems = [];
    for (var i=0; i < 9; i++) {
      var defaultItem = {
        id: hourIdList[i]
      }
      scheduleItems.push(defaultItem);
    }
    window.localStorage.setItem("plannerItem", JSON.stringify(scheduleItems));
  }

  if (scheduleItems.length != 9) {
    scheduleItems = [];
    for (var i=0; i < 9; i++) {
      var defaultItem = {
        id: hourIdList[i]
      }
      scheduleItems.push(defaultItem);
    }
    window.localStorage.setItem("plannerItem", JSON.stringify(scheduleItems));
    alert("Something was wrong with your storage. It has been cleared. Sorry for your loss.");
  } else {
    for (var i=0; i < 9; i++) {
      if (scheduleItems[i].id != hourIdList[i]) {
        localStorage.removeItem("plannerItem");
        scheduleItems = [];
        for (var i=0; i < 9; i++) {
          var defaultItem = {
            id: hourIdList[i]
          }
          scheduleItems.push(defaultItem);
        }
        window.localStorage.setItem("plannerItem", JSON.stringify(scheduleItems));
        alert("Something was wrong with your storage. It has been cleared. Sorry for your loss.");
      }
    }
  }

  // save button click event
  $('.saveBtn').on('click', function () {
    var hourId = $(this).parent().attr('id');
    var input = $(this).siblings('textarea').val();
    var newItem = {
      id: hourId,
      item: input
    };
    index = hourIdList.indexOf(hourId);
    scheduleItems[index] = newItem;
    window.localStorage.setItem('plannerItem', JSON.stringify(scheduleItems));
  });

  function hourUpdater() {
    var currentHour = dayjs().format('hA');
    index = hourTextList.indexOf(currentHour);
    if (index != -1) {
      // loop over time blocks
      i=0;
      $('.time-block').each(function () {
        if (i < index) {
          $(this).addClass('past');
        } else if (i == index) {
          $(this).addClass('present');
        } else if (i > index){
          $(this).addClass('future');
        }
        i++;
      });
    } else {
      if (currentHour.slice(-2) == 'PM') {
        $('.time-block').each(function () {
          $(this).addClass('past');
        })
      } else if (currentHour.slice(-2) == 'AM') {
        $('.time-block').each(function () {
          $(this).addClass('future');
        })
      }
    }
  }

  hourUpdater();
  setInterval(hourUpdater, 15000);
  // load any saved data from localStorage
  $('#hour-9 .description').val(scheduleItems[0].item);
  $('#hour-10 .description').val(scheduleItems[1].item);
  $('#hour-11 .description').val(scheduleItems[2].item);
  $('#hour-12 .description').val(scheduleItems[3].item);
  $('#hour-1 .description').val(scheduleItems[4].item);
  $('#hour-2 .description').val(scheduleItems[5].item);
  $('#hour-3 .description').val(scheduleItems[6].item);
  $('#hour-4 .description').val(scheduleItems[7].item);
  $('#hour-5 .description').val(scheduleItems[8].item);
  // display current day on page
  $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));
  //display time blocks
  

});