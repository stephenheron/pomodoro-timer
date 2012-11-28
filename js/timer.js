function Timer(endTime) {
  "use strict";
  var currentTime = new Date();
  this.startTime = currentTime.getTime();
  this.endTime = endTime;
  this.startingDiff = this.endTime - this.startTime;
  this.is_stopped = false;

  this.timeRemaining = function(){
    var currentTime = new Date();
    return (this.endTime - currentTime.getTime());
  };

  this.percentageToEndTime = function(){
    var percentage =  100 - ((this.timeRemaining() / this.startingDiff) * 100);
    if (percentage > 100){
      return 100;
    } else {
      return percentage;
    }
  };

  this.isReached = function(){
    if(this.timeRemaining() < 0){
      return true;
    } else {
      return false;
    }
  };

  this.stop = function(){
    this.is_stopped = true;
  };

  this.hoursMinutesSecondsRemaining = function(){
    var totalSec = this.timeRemaining() / 1000;
    var hours = parseInt(totalSec / 3600, 10) % 24;
    var minutes = parseInt(totalSec / 60, 10) % 60;
    var seconds = Math.round(totalSec % 60, 10);

    if(seconds < 0){
      seconds = 0;
    }

    var hoursMinutesSeconds = {
      "hours": hours < 10 ? "0" + hours : hours,
      "minutes": minutes < 10 ? "0" + minutes : minutes,
      "seconds":seconds  < 10 ? "0" + seconds : seconds
    };
    return hoursMinutesSeconds;
  };

  this.tick = function(){
    var hoursMinutesSeconds = this.hoursMinutesSecondsRemaining();
    console.log(hoursMinutesSeconds.minutes + ":" + hoursMinutesSeconds.seconds);
    if(this.isReached() || this.is_stopped){
      return false;
    } else {
      return true;
    }  
  };
}
