// The html setup is made by https://github.com/pixelkind for students of ju to present their creative coding portfolio in the labs as shown in the license amd readme file. However the generative are projects were made by https://github.com/OtaiprO
// Lab 3

const notes = [
  "C4",
  "D4",
  "E4",
  "F4",
  "G4",
  "A4",
  "B4",
  "C#4",
  "D#4",
  "F#4",
  "G#4",
  "A#4",
];
//

let musicSquareWidth = innerWidth / 5;

class MusicSquare {
  constructor(x, y, width, height, note) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.note = note;

    this.synth = new Tone.Synth().toDestination();
  }

  move() {
    this.x += 10;
    if (this.x > width) {
      this.x = -this.width;
      this.playNote();
    }
  }

  display() {
    fill(255, 245, 157);
    stroke(255, 204, 100);
    rect(this.x, this.y, this.width, this.height);
  }

  playNote() {
    this.synth.triggerAttackRelease(this.note, "8n");
  }
}

let squares = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
  let noteHeight = height / 12;
  let startingX = -musicSquareWidth;

  let notesOrder = [];
  for (let i = 0; i < 12; i++) {
    notesOrder.push(i);
  }

  notesOrder = shuffle(notesOrder);

  for (let i = 0; i < 12; i++) {
    let xPosition = startingX - notesOrder[i] * musicSquareWidth * 0.5;
    let square = new MusicSquare(
      xPosition,
      i * noteHeight,
      musicSquareWidth,
      noteHeight,
      notes[i]
    );
    squares.push(square);
  }
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

function draw() {
  background(56, 142, 60);

  for (let square of squares) {
    square.display();
    square.move();
  }
}
