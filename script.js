"use strict";

const containerEl = document.querySelector(".container");
const btnPlayEl = document.querySelector(".btn_again");
const btnChckEl = document.querySelector(".btn_check");
const hideNotesEl = document.querySelector(".hide_notes");
const msgEl = document.querySelector(".message");
const inputNotesEl = document.querySelector(".input_notes");
const attemptEl = document.querySelector(".attempt");
const correctEl = document.querySelector(".correct");

// Note 88 keys piano
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

// generate random number from 1 to 88
let rand = Math.floor(Math.random() * 88);
let ac = 0;
let attempt = 0;
let alr_check = 0; 

// if easy mode
let rand_easy = Math.floor(Math.random() * 12) + 39;
let secret_notes = notes_titles[rand_easy];
let x = secret_notes.length;
secret_notes = secret_notes.substring(0, x - 1);
  
const playAudio = (index) => {
  const audio = new Audio(audios[index]);
  audio.play();
}

btnChckEl.addEventListener('click', () => {
  const guess = inputNotesEl.value.trim().toUpperCase();

  if (guess == secret_notes) {
    if (alr_check == 0) {
      ac++;
      alr_check = 1;
    }
    containerEl.style.backgroundColor = "#bdffbf";
    displayMessage("Congrats! Your answer is correct!");
  } else {
    containerEl.style.backgroundColor = "#ffcfcf";
    displayMessage("Sorry, Your answer is wrong! Try better!");
  }

  hideNotesEl.textContent = notes_titles[rand_easy];
  hideNotesEl.style.width = "50%";
  hideNotesEl.style.transition = "all 0.5s ease-in";
  playAudio(rand_easy);
 
  attemptEl.textContent = attempt;
  correctEl.textContent = ac;
});

const displayMessage = function (message) {
  msgEl.textContent = message;
};

btnPlayEl.addEventListener('click', () => {
  rand = Math.floor(Math.random() * 88 + 1);
  rand_easy = Math.floor(Math.random() * 12) + 39;
  secret_notes = notes_titles[rand_easy];

  // if easy mode
  x = secret_notes.length;
  secret_notes = secret_notes.substring(0, x - 1);
  console.log(secret_notes);

  hideNotesEl.textContent = "?";
  hideNotesEl.style.width = "25%";
  hideNotesEl.style.transition = "all 0.5s ease-in";
  inputNotesEl.value = "";
  containerEl.style.backgroundColor = "#DDD";
  attempt++;
  alr_check = 0;
  attemptEl.textContent = attempt;
  playAudio(rand_easy);
  console.log(rand_easy);
  console.log(notes_titles[rand_easy]);
  displayMessage("Start Guessing........");
});

// Initialize attempts and correct answers
correctEl.textContent = ac;