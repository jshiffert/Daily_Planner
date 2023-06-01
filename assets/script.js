// Daily planner js script

// corresponding arrays for hour id and hour displays
var hourIdList = ['hour-9','hour-10','hour-11','hour-12','hour-1','hour-2','hour-3','hour-4','hour-5'];
var hourTextList = ['9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM'];

// creates the ui for hour blocks
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
  //create fucntion to build the storage if needed
  function buildStorage() {
    scheduleItems = [];
    for (var i=0; i < 9; i++) {
      var defaultItem = {
        id: hourIdList[i]
      }
      scheduleItems.push(defaultItem);
    }
    window.localStorage.setItem("plannerItem", JSON.stringify(scheduleItems));
  }

  // check if the item exists
  if (scheduleItems == null) {
    buildStorage();
  }

  // check to make sure the plannerItem is usable. If not, send alert and rebuild the object
  if (scheduleItems.length != 9) {
    buildStorage();
    alert("Something was wrong with your storage. It has been cleared. Sorry for your loss.");
  } else {
    for (var i=0; i < 9; i++) {
      if (scheduleItems[i].id != hourIdList[i]) {
        localStorage.removeItem("plannerItem");
        buildStorage();
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

  // update the hour color coded blocks
  function hourUpdater() {
    var currentHour = dayjs().format('hA');
    index = hourTextList.indexOf(currentHour);
    //check if work hours
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
      //check if AM/PM
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

});