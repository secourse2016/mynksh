//testing animation with setTimeout

function animation(){
  var element = document.getElementById("ball"),
      time    = Date.now();
  console.log(time);
  element.style.left = (50 + Math.cos(time / 500)*25) + "px";
  element.style.top  = (50 + Math.sin(time / 500)*25) + "px";

  setTimeout(animation, 1000 / 30);
}

animation();
