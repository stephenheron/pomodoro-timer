alert("loaded");

function Timer(endTime) {
  var currentTime = new Date();
  this.startTime = currentTime.getTime();
  this.endTime = this.startTime + 154233;
  this.startingDiff = this.endTime - this.startTime

  this.timeRemaining = function(){
    var currentTime = new Date();
    return (this.endTime - currentTime.getTime())
  }

  this.percentageToEndTime = function(){
    var percentage =  100 - ((this.timeRemaining() / this.startingDiff) * 100)
    if (percentage > 100){
      return 100;
    } else {
      return percentage
    }
  }

  this.isReached = function(){
    if(this.timeRemaining() < 0){
      return true;
    } else {
      return false;
    }
  }

  this.hoursMinutesSecondsRemaining = function(){
    var totalSec = this.timeRemaining() / 1000;
    var hours = parseInt( totalSec / 3600 ) % 24;
    var minutes = parseInt( totalSec / 60 ) % 60;
    var seconds = Math.round(totalSec % 60);

    if(seconds < 0){
      seconds = 0;
    }

    //result = (hours < 10 ? "0" + hours : hours) + "-" + (minutes < 10 ? "0" + minutes : minutes) + "-" + (seconds  < 10 ? "0" + seconds : seconds);

    var hoursMinutesSeconds = {
      "hours": hours < 10 ? "0" + hours : hours
      ,"minutes": minutes < 10 ? "0" + minutes : minutes
      ,"seconds":seconds  < 10 ? "0" + seconds : seconds
    }
    return hoursMinutesSeconds;
  }
}

var timer = new Timer();
var intervalID = setInterval(function(){tick(timer, intervalID)},1000);

function tick(timer, intervalID)
{
  var hoursMinutesSeconds = timer.hoursMinutesSecondsRemaining();
  console.log(hoursMinutesSeconds["minutes"] + ":" + hoursMinutesSeconds["seconds"]);
  console.log(timer.percentageToEndTime());
  if(timer.isReached()){
    clearInterval(intervalID);
  }
}
