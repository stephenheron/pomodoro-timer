function TimerManager() {
  this.pomodoroCount = 0
  this.maxPomodoroCount = 4;
  this.currentTimerType = null;

  this.startPomodoroTimer = function(){
    console.log("Starting Pomodoro")
    this.startTimer(this.pomodoroEndTime(), "pomodoro");
  }

  this.startShortBreakTimer = function(){
    console.log("Starting Short Break")
    this.startTimer(this.shortBreakEndTime(), "short");
  }

  this.startLongBreakTimer = function(){
    console.log("Starting Long Break")
    this.startTimer(this.longBreakEndTime(), "long");
  }

  this.startTimer = function(endTime, type){
    this.setCurrentTimerType(type);
    var timer = new Timer(endTime);
    var t = this;
    var intervalID = setInterval(function() { tick(t, timer, intervalID); }, 1000);

    function tick(tm, timer, intervalID)
    {
      if(timer.tick() === false){
        clearInterval(intervalID);
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
      }
    }
  }


  this.setCurrentTimerType = function(type){
    if(type === "pomodoro" || type === "short" || type === "long"){
      this.currentTimerType = type;
    }
  }

  this.pomodoroEndTime = function(){
    return this.currentTime() + this.getPomodoroTime();
  }

  this.shortBreakEndTime = function(){
    return this.currentTime() + this.getShortBreakTime();
  }

  this.longBreakEndTime = function(){
    return this.currentTime() + this.getLongBreakTime();
  }

  this.getPomodoroTime = function(){
    //return (25 * 60) * 1000;
    return (0.1 * 60) * 1000;
  }

  this.getShortBreakTime = function(){
    //return (5 * 60) * 1000;
    return (0.1 * 60) * 1000;
  }

  this.getLongBreakTime = function(){
    //return (15 * 60) * 1000;
    return (0.1 * 60) * 1000;
  }

  this.currentTime = function(){
    var currentTime = new Date();
    return currentTime.getTime();
  }
}

var tm = new TimerManager();
tm.startPomodoroTimer();
