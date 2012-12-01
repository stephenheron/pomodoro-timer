function Timer(endTime) {
  "use strict";
  var currentTime = new Date();
  var privateThis = this;
  this.startTime = currentTime.getTime();
  this.endTime = endTime;
  this.startingDiff = this.endTime - this.startTime;
  this.isStopped = false;
  this.isPaused = false;
  this.pausedTimeRemaining = null;

  var timeRemaining = function(){
    var currentTime = new Date();
    return (privateThis.endTime - currentTime.getTime());
  };

  var percentageToEndTime = function(){
    var percentage =  100 - ((timeRemaining() / privateThis.startingDiff) * 100);
    if (percentage > 100){
      return 100;
    } else {
      return percentage;
    }
  };

  var isReached = function(){
    if(timeRemaining() < 0 && privateThis.isPaused === false){
      return true;
    } else {
      return false;
    }
  };

  this.stop = function(){
    this.isStopped = true;
  };

  this.pause = function(){
    this.pausedTimeRemaining = timeRemaining();  
    this.isPaused = true;    
  };

  this.resume = function(){
    var currentTime = new Date();
    this.endTime = (currentTime.getTime() + this.pausedTimeRemaining)
    this.isPaused = false;
  }

  var hoursMinutesSecondsRemaining = function(){
    var totalSec = timeRemaining() / 1000;
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
    return buildReturnObject();  
  };

  var buildReturnObject = function(){
    var running = true;
    var paused = false;
    var hoursMinutesSeconds = null;

    if(isReached() || privateThis.isPaused || privateThis.isStopped ){
      running = false;
    } else {
      running = true;
    }

    if (privateThis.isPaused){
      paused = true;
      hoursMinutesSeconds = null
    } else {
      paused = false;
      hoursMinutesSeconds = hoursMinutesSecondsRemaining();
    }
  
    return {"running": running, "paused": paused, "hoursMinutesSeconds": hoursMinutesSeconds, "percentage": percentageToEndTime()}
  };
}
