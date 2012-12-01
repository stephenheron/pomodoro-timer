function TimerManager() {
  "use strict";
  var privateThis = this;
  this.pomodoroCount = 0;
  this.maxPomodoroCount = 4;
  this.currentTimerType = null;
  this.timer = null;

  this.startPomodoroTimer = function(){
    startTimer(pomodoroEndTime(), "pomodoro");
  };

  this.startShortBreakTimer = function(){
    startTimer(shortBreakEndTime(), "short");
  };

  this.startLongBreakTimer = function(){
    startTimer(longBreakEndTime(), "long");
  };

  var startTimer = function(endTime, type){
    setCurrentTimerType(type);
    privateThis.timer = new Timer(endTime);
    var t = privateThis;
    var intervalID = setInterval(function() { tick(t, intervalID); }, 1000);

    function tick(tm, intervalID)
    {
      var result = tm.timer.tick();
      console.log(result.hoursMinutesSeconds.minutes + ":" + result.hoursMinutesSeconds.seconds);
      if(result.hoursMinutesSeconds){
        tm.refreshUI(result);
      }
      if(result.running === false && result.paused !== true){
        clearInterval(intervalID);
        tm.routeTimer();  
      }
    }
  };

  this.refreshUI = function(result){
    $("h1#time").text(result.hoursMinutesSeconds.minutes + ":" + result.hoursMinutesSeconds.seconds);
    $("#progress-bar").css("width", result.percentage+"%");
    if($("h2timer-type").text() !== this.currentTimerType){
      $("h2#timer-type").text(this.currentTimerType);
    }
  };

  this.pauseTimer = function(){
    if(this.timer.isPaused !== true){
      this.timer.pause();
    }
  };

  this.resumeTimer = function(){
    if(this.timer.isPaused === true){
      this.timer.resume();
    }
  };

  this.stopTimer = function(){
    this.timer.stop(); 
  };

  this.routeTimer = function(){
    if(tm.currentTimerType === "pomodoro"){
      tm.pomodoroCount++;
      console.log(tm.pomodoroCount);
      if(tm.pomodoroCount % 4 === 0){
        tm.startLongBreakTimer();
      } else {
        tm.startShortBreakTimer();
      }
    } else if(tm.currentTimerType === "short"){
      tm.startPomodoroTimer();
    } else if(tm.currentTimerType === "long"){
      tm.startPomodoroTimer();
    } else {
      tm.startShortBreakTimer();
    }
  };

  var setCurrentTimerType = function(type){
    if(type === "pomodoro" || type === "short" || type === "long"){
      privateThis.currentTimerType = type;
    }
  };

  var pomodoroEndTime = function(){
    return currentTime() + getPomodoroTime();
  };

  var shortBreakEndTime = function(){
    return currentTime() + getShortBreakTime();
  };

  var longBreakEndTime = function(){
    return currentTime() + getLongBreakTime();
  };

  var getPomodoroTime = function(){
    //return (25 * 60) * 1000;
    return (0.1 * 60) * 1000;
  };

  var getShortBreakTime = function(){
    //return (5 * 60) * 1000;
    return (0.1 * 60) * 1000;
  };

  var getLongBreakTime = function(){
    //return (15 * 60) * 1000;
    return (0.1 * 60) * 1000;
  };

  var currentTime = function(){
    var currentTime = new Date();
    return currentTime.getTime();
  };
}

var tm = new TimerManager();

$(document).ready(function() {
  $("#start").click(function(){
    tm.startPomodoroTimer();
    return false;
  });

  $("#pause").click(function() {
    tm.pauseTimer();
    return false;
  });

  $("#resume").click(function() {
    tm.resumeTimer();
    return false;
  });
});
