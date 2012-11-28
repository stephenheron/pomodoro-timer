alert("loaded");

function Timer() {
  var currentTime = new Date()

  this.startTime = currentTime.getTime();
  this.endTime = null;

  alert(this.startTime); 
}

var timer = new Timer();

