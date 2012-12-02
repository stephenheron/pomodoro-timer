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
      if(this.currentTimerType === "pomodoro"){
        $("h2#timer-type").text("Pomodoro");
        $("#progress-bar").removeClass();
        $("#progress-bar").addClass("pomodoro");
      } else if (this.currentTimerType === "short"){
        $("#progress-bar").removeClass();
        $("#progress-bar").addClass("short");
        $("h2#timer-type").text("Short Break");
      } else if (this.currentTimerType === "long"){
        $("#progress-bar").removeClass();
        $("#progress-bar").addClass("long");
        $("h2#timer-type").text("Long Break");
      }
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
    var time = $("#pomodoro-time").val();
    if(validateTime(time) === false){
      time = 25;
    }
    return (time * 60) * 1000;
  };

  var getShortBreakTime = function(){
    var time = $("#short-break-time").val();
    if(validateTime(time) === false){
      time = 5;
    }
    return (time * 60) * 1000;
  };

  var getLongBreakTime = function(){
    var time = $("#long-break-time").val();
    if(validateTime(time) === false){
      time = 15;
    }
    return (0.1 * 60) * 1000;
  };

  var currentTime = function(){
    var currentTime = new Date();
    return currentTime.getTime();
  };

  var validateTime = function(time){
    if(time === null || isNaN(time) || time === ""){
      return false;
    } else {
      return true;
    }
  }
}

var tm = new TimerManager();

$(document).ready(function() {
  $("#start").click(function(){
    if(tm.timer === null){
      $("#start").addClass("disabled");
      tm.startPomodoroTimer();
    }

    if(tm.timer.isPaused){
      tm.resumeTimer();
      $("#start").text("Start");
      $("#pause").removeClass("disabled");
    }

    return false;
  });

  $("#pause").click(function() {
    if(tm.timer.isPaused !== true){
      $("#pause").addClass("disabled");
      $("#start").text("Resume");
      $("#start").removeClass("disabled");
      tm.pauseTimer();
    }
    return false;
  });

  $("#timer-options-toggle").click(function() {
    $("#timer-options").toggle();
  });
});
