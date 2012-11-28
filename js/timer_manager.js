function TimerManager() {
  "use strict";
  this.pomodoroCount = 0;
  this.maxPomodoroCount = 4;
  this.currentTimerType = null;
  this.timer = null;

  this.startPomodoroTimer = function(){
    console.log("Starting Pomodoro");
    this.startTimer(this.pomodoroEndTime(), "pomodoro");
  };

  this.startShortBreakTimer = function(){
    console.log("Starting Short Break");
    this.startTimer(this.shortBreakEndTime(), "short");
  };

  this.startLongBreakTimer = function(){
    console.log("Starting Long Break");
    this.startTimer(this.longBreakEndTime(), "long");
  };

  this.startTimer = function(endTime, type){
    this.setCurrentTimerType(type);
    this.timer = new Timer(endTime);
    var t = this;
    var intervalID = setInterval(function() { tick(t, intervalID); }, 1000);

    function tick(tm, intervalID)
    {
      var result = tm.timer.tick();
      console.log(result.hoursMinutesSeconds.minutes + ":" + result.hoursMinutesSeconds.seconds);
      if(result.hoursMinutesSeconds){
        $("h1#time").text(result.hoursMinutesSeconds.minutes + ":" + result.hoursMinutesSeconds.seconds);
      }
      if(result.running === false && result.paused !== true){
        clearInterval(intervalID);
        tm.routeTimer();  
      }
    }
  };

  this.pauseTimer = function(){
    this.timer.pause();
  };

  this.resumeTimer = function(){
    this.timer.resume();
  };

  this.stopTimer = function(){
    this.timer.stop(); 
  };

  this.routeTimer = function(){
    if(tm.currentTimerType === "pomodoro"){
      tm.pomodoroCount++;
      console.log(tm.pomodoroCount);
      if(tm.pomodoroCount === 4){
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

  this.setCurrentTimerType = function(type){
    if(type === "pomodoro" || type === "short" || type === "long"){
      this.currentTimerType = type;
    }
  };

  this.pomodoroEndTime = function(){
    return this.currentTime() + this.getPomodoroTime();
  };

  this.shortBreakEndTime = function(){
    return this.currentTime() + this.getShortBreakTime();
  };

  this.longBreakEndTime = function(){
    return this.currentTime() + this.getLongBreakTime();
  };

  this.getPomodoroTime = function(){
    //return (25 * 60) * 1000;
    return (0.1 * 60) * 1000;
  };

  this.getShortBreakTime = function(){
    //return (5 * 60) * 1000;
    return (0.1 * 60) * 1000;
  };

  this.getLongBreakTime = function(){
    //return (15 * 60) * 1000;
    return (0.1 * 60) * 1000;
  };

  this.currentTime = function(){
    var currentTime = new Date();
    return currentTime.getTime();
  };
}

var tm = new TimerManager();
tm.startPomodoroTimer();

$(document).ready(function() {
  $("#pause").click(function() {
    tm.pauseTimer();
    return false;
  });

  $("#resume").click(function() {
    tm.resumeTimer();
    return false;
  });
});
