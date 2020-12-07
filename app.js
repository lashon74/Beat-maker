class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.currentKick = "./sounds/kick-classic.wav";
    this.currentClap = "./sounds/clap-analog.wav";
    this.currentSnare = "./sounds/snare-acoustic01.wav";
    this.currentHihat = "./sounds/hihat-acoustic01.wav";
    this.currentTom = "./sounds/tom-analog.wav";
    this.kickAudio = document.querySelector(".kick-sound");
    this.tomAudio = document.querySelector(".tom-sound");
    this.clapAudio = document.querySelector(".clap-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
    this.selects = document.querySelectorAll("select");
    this.muteBtn = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector(".tempo-slider");
  }
  activePad() {
    this.classList.toggle("active");
  }
  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    //   Loop over pads
    activeBars.forEach((bar) => {
      // By adding to it will go back to its original position
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      // Check if pads are active
      if (bar.classList.contains("active")) {
        //    Check for sound
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("tom-pad")) {
          this.tomAudio.currentTime = 0;
          this.tomAudio.play();
        }
        if (bar.classList.contains("clap-pad")) {
          this.clapAudio.currentTime = 0;
          this.clapAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
    this.index++;
  }
  start() {
    //   Must use arrow function otherwise it will grab the window
    const interval = (60 / this.bpm) * 1000;
    //   Check if its playing if it is playing pause if it is null we clear it if not we keep the interval going
    if (this.isPlaying) {
      //   Clear the interval have to reset back to zero onces done
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    } else {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    }
  }
  updateBtn() {
    //   If not playing change to stop and stop interval
    if (!this.isPlaying) {
      this.playBtn.innerText = "Stop";
      this.playBtn.classList.add("active");
    } else {
      this.playBtn.innerText = "Play";
      this.playBtn.classList.remove("active");
    }
  }
  changeSound(e) {
    //   This will return the select name and value that we click on
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    switch (selectionName) {
      case "kick-select":
        this.kickAudio.src = selectionValue;
        break;
      case "tom-select":
        this.tomAudio.src = selectionValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectionValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectionValue;
        break;
      case "clap-select":
        this.clapAudio.src = selectionValue;
        break;
    }
  }
  mute(e) {
    console.log(e);
    //   Grabs the index to track the pads toggle the active class so you can have a visuale of what is happening if the class is active we want to mute it
    const muteIndex = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.clapAudio.volume = 0;
          break;
        case "2":
          this.snareAudio.volume = 0;
          break;
        case "3":
          this.hihatAudio.volume = 0;
          break;
        case "4":
          this.tomAudio.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.clapAudio.volume = 1;
          break;
        case "2":
          this.snareAudio.volume = 1;
          break;
        case "3":
          this.hihatAudio.volume = 1;
          break;
        case "4":
          this.tomAudio.volume = 1;
          break;
      }
    }
  }
  // This will update the bpm to change the speed but while the button is not active it wont actually play the sound
  changeTempo(e) {
    const tempoText = document.querySelector(".tempo-nr");

    tempoText.innerText = e.target.value;
  }
  updateTempo(e) {
    this.bpm = e.target.value;
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playBtn = document.querySelector(".play");
    if (playBtn.classList.contains("active")) {
      this.start();
    }
  }
}
const drumkit = new DrumKit();

// Event Listners

drumkit.pads.forEach((pad) => {
  pad.addEventListener("click", drumkit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

// Use call back function with event listeners
drumkit.playBtn.addEventListener("click", function () {
  drumkit.start();
  drumkit.updateBtn();
});

drumkit.selects.forEach((select) => {
  // Use the callback function to invoke the event without callback function it would invoke automatically
  select.addEventListener("change", function (e) {
    drumkit.changeSound(e);
  });
});

drumkit.muteBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    drumkit.mute(e);
  });
});

// Use input to update text
drumkit.tempoSlider.addEventListener("input", function (e) {
  drumkit.changeTempo(e);
});

// Use change to change the functionality
drumkit.tempoSlider.addEventListener("change", function (e) {
  drumkit.updateTempo(e);
});
