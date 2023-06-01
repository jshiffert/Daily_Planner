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

$(document).ready(function () {
  $('.saveBtn').on('click', function () {
    var hourId = $(this).parent().attr('id');
    var input = $(this).siblings('textarea').val();
    var scheduleItems = JSON.parse(localStorage.getItem("plannerItem")) || [];
    var newItem = {
      id: hourId,
      item: input
    };
    for (var i = 8; i >= 0 ; i--) {
      console.log(scheduleItems[i]);
      if (hourId == scheduleItems[i].id) {
        scheduleItems[i] = newItem;
      }
    }
    window.localStorage.setItem('plannerItem', JSON.stringify(scheduleItems));
  });

  function hourDisplayer() {
    var hourIdList = ['hour-9','hour-10','hour-11','hour-12','hour-1','hour-2','hour-3','hour-4','hour-5'];
    var hourTextList = ['9AM','10AM','11AM','12AM','1PM','2PM','3PM','4PM','5PM'];
    var rootEl = $('#root');
    for (var i=0; i < hourIdList.length; i++) {
      var hourEl = $('<div>');
      hourEl.addClass('row time-block present');
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
  }

  function hourUpdater() {
    var currentHour = dayjs().hour();
    console.log(currentHour)
    // loop over time blocks
    $('.time-block').each(function () {
      // if (currentHour < )
    });
  }

  hourDisplayer();
  hourUpdater();
  setInterval(hourUpdater, 15000);
  // load any saved data from localStorage
  $('#hour-9 .description').val(localStorage.getItem('hour-9'));
  // display current day on page
  $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));
  //display time blocks
  

});