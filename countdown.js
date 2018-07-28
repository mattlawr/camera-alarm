//change the input method
var inputHour = prompt("Input hour:");
var inputMin = prompt("Input minute:");
  
var now = new Date();
var nowHour = now.getHours();
var nowMin = now.getMinutes();
  
if(inputHour < nowHour){
  inputHour += 12;
}
var hourDiff = inputHour - nowHour;

if(inputMin < nowMin){
  inputMin += 60;
}
var minDiff = inputMin - nowMin;

document.getElementById("demo").innerHTML = hourDiff + "h " + minDiff + "m ";

// Update the count down every 1 min
var x = setInterval(function() {
  nowMin++;
  if(nowMin > 59){
    nowHour++;
    nowMin-=60;
  }
  
  if(inputHour < nowHour){
    inputHour += 12;
  }
  hourDiff = inputHour - nowHour;
  
  if(inputMin < nowMin){
    inputMin += 60;
  }
  minDiff = inputMin - nowMin;
    
  document.getElementById("demo").innerHTML = hourDiff + "h " + minDiff + "m ";
  
  if (hourDiff == 0 && minDiff == 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 60000);
