"use strict";

const containerEl = document.querySelector(".container");
const menuStartEl = document.querySelector(".menu_start");
const menuModeEl = document.querySelector(".menu_mode");
const menuDiffEl = document.querySelector(".menu_diff");
const btnStartEl = document.querySelector(".btn_start");
const btnModeEl = document.querySelectorAll(".btn_mode");
const btnDiffEl = document.querySelectorAll(".btn_diff");
const multipleEl = document.querySelector(".multiple");
const essayEl = document.querySelector(".essay");
const btnPlayEl = document.querySelectorAll(".btn_again");
const btnChckEl = document.querySelector(".btn_check");
const hideNotesEl = document.querySelectorAll(".hide_notes");
const msgEl = document.querySelectorAll(".message");
const inputNotesEl = document.querySelector(".input_notes");
const attemptEl = document.querySelectorAll(".attempt");
const correctEl = document.querySelectorAll(".correct");
const btnOptionsEl = document.querySelectorAll(".option");
const rangeEl = document.querySelectorAll(".range");
const ketEl = document.querySelectorAll(".ket");

// Note 88 keys piano
// prettier-ignore
const notes_titles = [
  "A0", "A#0", "B0", "A1", "A#1", "B1", "C1", "C#1", "D1", "D#1", "E1", "F1", 
  "F#1", "G1", "G#1", "A2", "A#2", "B2", "C2", "C#2", "D2", "D#2", "E2", "F2", 
  "F#2", "G2", "G#2", "A3", "A#3", "B3", "C3", "C#3", "D3", "D#3", "E3", "F3", 
  "F#3", "G3", "G#3", "A4", "A#4", "B4", "C4", "C#4", "D4", "D#4", "E4", "F4", 
  "F#4", "G4", "G#4", "A5", "A#5", "B5", "C5", "C#5", "D5", "D#5", "E5", "F5", 
  "F#5", "G5", "G#5", "A6", "A#6", "B6", "C6", "C#6", "D6", "D#6", "E6", "F6", 
  "F#6", "G6", "G#6", "A7", "A#7", "B7", "C7", "C#7", "D7", "D#7", "E7", "F7", 
  "F#7", "G7", "G#7", "C8"
];

// prettier-ignore
const audios = [
  'audio/0-a.wav', 'audio/0-as.wav', 'audio/0-b.wav',
  'audio/1-a.wav', 'audio/1-as.wav', 'audio/1-b.wav', 'audio/1-c.wav', 'audio/1-cs.wav', 'audio/1-d.wav', 'audio/1-ds.wav', 'audio/1-e.wav', 'audio/1-f.wav', 'audio/1-fs.wav', 'audio/1-g.wav', 'audio/1-gs.wav',
  'audio/2-a.wav', 'audio/2-as.wav', 'audio/2-b.wav', 'audio/2-c.wav', 'audio/2-cs.wav', 'audio/2-d.wav', 'audio/2-ds.wav', 'audio/2-e.wav', 'audio/2-f.wav', 'audio/2-fs.wav', 'audio/2-g.wav', 'audio/2-gs.wav',
  'audio/3-a.wav', 'audio/3-as.wav', 'audio/3-b.wav', 'audio/3-c.wav', 'audio/3-cs.wav', 'audio/3-d.wav', 'audio/3-ds.wav', 'audio/3-e.wav', 'audio/3-f.wav', 'audio/3-fs.wav', 'audio/3-g.wav', 'audio/3-gs.wav',
  'audio/4-a.wav', 'audio/4-as.wav', 'audio/4-b.wav', 'audio/4-c.wav', 'audio/4-cs.wav', 'audio/4-d.wav', 'audio/4-ds.wav', 'audio/4-e.wav', 'audio/4-f.wav', 'audio/4-fs.wav', 'audio/4-g.wav', 'audio/4-gs.wav',
  'audio/5-a.wav', 'audio/5-as.wav', 'audio/5-b.wav', 'audio/5-c.wav', 'audio/5-cs.wav', 'audio/5-d.wav', 'audio/5-ds.wav', 'audio/5-e.wav', 'audio/5-f.wav', 'audio/5-fs.wav', 'audio/5-g.wav', 'audio/5-gs.wav',
  'audio/6-a.wav', 'audio/6-as.wav', 'audio/6-b.wav', 'audio/6-c.wav', 'audio/6-cs.wav', 'audio/6-d.wav', 'audio/6-ds.wav', 'audio/6-e.wav', 'audio/6-f.wav', 'audio/6-fs.wav', 'audio/6-g.wav', 'audio/6-gs.wav',
  'audio/7-a.wav', 'audio/7-as.wav', 'audio/7-b.wav', 'audio/7-c.wav', 'audio/7-cs.wav', 'audio/7-d.wav', 'audio/7-ds.wav', 'audio/7-e.wav', 'audio/7-f.wav', 'audio/7-fs.wav', 'audio/7-g.wav', 'audio/7-gs.wav', 'audio/8-c.wav'
];

let [ac, attempt, alr_check, curraudio] = [0, 0, false, null];
let randnum, num, secret_notes, choosen, uniq;

function randNumber(diff) {
  let noRand;
  if (diff === "easy") {
    const validNumbers = [39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 54];
    rangeEl.forEach((ran) => (ran.textContent = "Between C4 to C5"));
    return validNumbers[Math.floor(Math.random() * validNumbers.length)];
  } else {
    noRand = Math.floor(Math.random() * 88);
  }
  return noRand;
}

function playGame(modes, diff) {
  resetAudio();
  randnum = randNumber(diff);

  if (modes === "multiple") {
    secret_notes = notes_titles[randnum].slice(0, -1);
    const shuffle = Math.floor(Math.random() * 4);
    const gambling = new Set([secret_notes]);
    btnOptionsEl.forEach((btn, index) => {
      if (index === shuffle) {
        btn.textContent = secret_notes;
      } else {
        do {
          uniq = notes_titles[Math.floor(Math.random() * 12) + 3].slice(0, -1);
        } while (gambling.has(uniq));
        gambling.add(uniq);
        btn.textContent = uniq;
      }
      btn.style.backgroundColor = "#cb3050";
    });
  } else {
    secret_notes = notes_titles[randnum];
    if (diff === "easy") {
      secret_notes = secret_notes.slice(0, -1);
    }
  }

  hideNotesEl.forEach((note) => {
    note.textContent = "?";
    note.style.width = "25%";
    note.style.transition = "all 0.5s ease-in";
  });

  containerEl.style.backgroundColor = "#DDD";
  inputNotesEl.style.backgroundColor = "#ffffff";
  inputNotesEl.value = "";
  inputNotesEl.disabled = false;
  alr_check = false;
  ++attempt;

  displayMessage("Start Guessing..........");
  updateStats();
  playAudio(randnum);
}

function resetAudio() {
  if (curraudio) {
    curraudio.pause();
    curraudio.currentTime = 0;
  }
}

function playAudio(index) {
  resetAudio();
  curraudio = new Audio(audios[index]);
  curraudio.play();
  console.log(notes_titles[index]);
}

function checkAnswer(mode, diff) {
  if (mode === "multiple") {
    if (choosen === secret_notes) {
      ac++;
      containerEl.style.backgroundColor = "#bdffbf";
      displayMessage("Congrats! Your answer is correct!");
    } else {
      containerEl.style.backgroundColor = "#ffcfcf";
      displayMessage("Sorry, your answer is wrong! Try better!");
    }
    btnOptionsEl.forEach((btn) => {
      if (btn.textContent === secret_notes) {
        btn.style.backgroundColor = "#008022";
      } else if (choosen === btn.textContent) {
        btn.style.backgroundColor = "#d41717";
      }
    });
  } else {
    const guess = inputNotesEl.value.trim().toUpperCase();
    if (!guess) {
      inputNotesEl.style.backgroundColor = "#fddfdf";
      return;
    } else {
      if (guess === secret_notes) {
        if (!alr_check) {
          ac++;
          alr_check = true;
        }
        containerEl.style.backgroundColor = "#bdffbf";
        displayMessage("Congrats! Your answer is correct!");
      } else {
        containerEl.style.backgroundColor = "#ffcfcf";
        displayMessage("Sorry, your answer is wrong! Try better!");
      }
      inputNotesEl.disabled = true;
    }
  }

  hideNotesEl.forEach((note) => {
    note.textContent = notes_titles[randnum];
    note.style.width = "50%";
    note.style.transition = "all 0.5s ease-in";
  });

  playAudio(randnum);
  updateStats();
}

function displayMessage(message) {
  msgEl.forEach((msg) => (msg.textContent = message));
}

function updateStats() {
  attemptEl.forEach((el) => (el.textContent = attempt));
  correctEl.forEach((el) => (el.textContent = ac));
}

inputNotesEl.addEventListener("input", () => {
  if (inputNotesEl.value.trim()) {
    inputNotesEl.style.backgroundColor = "#ffffff";
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    if (inputNotesEl.value.trim()) {
      checkAnswer(modeGame, diffGame);
    }
  }
});

hideNotesEl.forEach((note) => {
  note.addEventListener("click", () => {
    playAudio(randnum);
  });
});

// menu game
btnStartEl.addEventListener("click", () => {
  menuStartEl.style.display = "none";
  menuModeEl.style.display = "flex";
});

let modeGame;
btnModeEl.forEach((btn) => {
  btn.addEventListener("click", () => {
    modeGame = btn.dataset.mode;
    menuModeEl.style.display = "none";
    menuDiffEl.style.display = "flex";
    if (modeGame === "essay") {
      ketEl.forEach((ket) => {
        ket.style.display = "block";
      });
    }
  });
});

let diffGame;
btnDiffEl.forEach((btn) => {
  btn.addEventListener("click", () => {
    diffGame = btn.dataset.diff;
    menuDiffEl.style.display = "none";
    document.querySelector(`.${modeGame}`).style.display = "block";
    playGame(modeGame, diffGame);
  });
});

btnPlayEl.forEach((play) => {
  play.addEventListener("click", () => {
    playGame(modeGame, diffGame);
  });
});

btnChckEl.addEventListener("click", () => {
  checkAnswer(modeGame, diffGame);
});

btnOptionsEl.forEach((opt) => {
  opt.addEventListener("click", (e) => {
    if (!alr_check) {
      choosen = e.target.textContent;
      checkAnswer(modeGame, diffGame);
      alr_check = true;
    }
  });
});
