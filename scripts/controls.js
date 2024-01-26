var audio = document.getElementById("audio");
var sourceMP3 = document.getElementById("sourceMP3");
var timeSlider = document.getElementById("timeBar");
var playBtn = document.getElementById("playBtn");
var volumeSlider = document.getElementById("volumeSlider");
var nextBtn = document.getElementById("nextBtn");
var previousBtn = document.getElementById("previousBtn");
var titleText = document.getElementById("titleText");
var albumText = document.getElementById("albumText");
var artistText = document.getElementById("artistText");
var WebStatus = document.getElementById("WebStatus");
var HostingStatus = document.getElementById("HostingStatus");
var MusicStatus = document.getElementById("MusicStatus");
var KernelStatus = document.getElementById("KernelStatus");
var timeText = document.getElementById("timeText");
var log = document.getElementById("log");
var PLAY_ICON = "icons/32/play-32.png";
var PAUSE_ICON = "icons/32/pause-32.png";
var playlist = {};
playlist.list = trackList;
playlist.activeTrack = 0;
playlist.next = function() {
    if (this.activeTrack == this.list.length - 1)
      this.activeTrack = 0;
    else
      this.activeTrack +=1;
  };
playlist.previous = function() {
    if (this.activeTrack == 0)
      this.activeTrack = this.list.length - 1;
    else
      this.activeTrack -= 1;
  };
playlist.getActive = function() {
    return this.list[this.activeTrack];
  }

  
sourceMP3.src = playlist.getActive().src;
audio.load();

audio.addEventListener("loadeddata",function(){
  var filename = playlist.getActive().src;
  
  titleText.textContent = playlist.getActive().name || "Unknown Title";
  artistText.textContent = playlist.getActive().artist || "Unknown Artist";
});

playBtn.addEventListener("click",function(){
  if (audio.paused) {
    audio.play();
  }
  else {
    audio.pause();
  }
});


audio.addEventListener("play",function(){playBtn.firstChild.src = PAUSE_ICON;},false);
audio.addEventListener("pause",function(){playBtn.firstChild.src = PLAY_ICON;},false);




sliderfy(timeSlider);
timeText.textContent = "0:00";

timeUpdateCallback = function(){
    timeSlider.firstChild.style.width = (audio.currentTime/audio.duration) *timeSlider.offsetWidth + "px";
    var seconds = audio.currentTime;
    var minutes = Math.round(seconds / 60);
    seconds = Math.round(seconds % 60);
    
    timeText.textContent = minutes+":"+ (seconds<10?"0"+seconds:seconds);
    
    
}
audio.addEventListener("timeupdate",timeUpdateCallback,false);

timeSlider.addEventListener("change", function(){
  audio.removeEventListener("timeupdate",timeUpdateCallback,false);
  audio.currentTime = timeSlider.sliderValue * audio.duration;
  audio.addEventListener("timeupdate",timeUpdateCallback,false);
});

audio.addEventListener("ended",function(){
  playlist.next();
  loadNewTrack(playlist.getActive().src);
});

function loadNewTrack(sourceString){
  sourceMP3.src = sourceString;
  audio.load();
  audio.play();
}

function dark() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}




/* Zegar */
function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('txt').innerHTML =  h + ":" + m + ":" + s;
  setTimeout(startTime, 1000);
}

function checkTime(i) {
  if (i < 10) {i = "0" + i};  
  return i;
}


/* Spacja */
var audio = document.querySelector('audio');

if (audio) {
  window.addEventListener('keydown', function (event) {
    var key = event.which || event.keyCode;
    if (key === 32) {
      event.preventDefault();
      audio.paused ? audio.play() : audio.pause();
    }
  });
}