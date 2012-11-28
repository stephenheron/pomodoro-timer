var timer = new Timer();
var intervalID = setInterval(function(){tick(timer, intervalID)},1000);

function tick(timer, intervalID)
{
  if(timer.tick() === false){
    clearInterval(intervalID);
  }
}
