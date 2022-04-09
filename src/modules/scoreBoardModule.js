import StrScore from './strScoreModule.js';
import ScoreSet from './scoreSetModule.js';

export default class ScoreBoard {
  table = [];

  scoreTable;

  addButton = document.getElementById('addButton');

  newName = document.getElementById('newName');

  newScore = document.getElementById('newScore');

  scoreListTable = document.getElementById('scoreListTable');

  inputField;

  static pushToStorage = (obj) => {
    const stringify = JSON.stringify(obj);
    localStorage.setItem('strScore', stringify);
  }

  static displayScoreSet(name, score, id) {
    return `
    <div class="score-set scoreSetId${id}">
      <span>${name} - </span>
      <span>${score}</span>
    </div>
        `;
  }

  pullFromStorage = () => {
    if (!localStorage.getItem('strScore')) return 0;
    const parsed = JSON.parse(localStorage.getItem('strScore'));
    let counter = 1;
    const preTable = [];
    const tableSize = Object.values(parsed).length;

    for (let i = 0; i < tableSize; i += 1) {
      if (this.table.length === 0) {
        for (let i = 0; i < tableSize; i += 1) {
          this.table.push(Object.values(parsed)[i]);
        }
      }
      const parsedScrSet = parsed[`${counter}`];
      const tempTable = ScoreBoard.displayScoreSet(parsedScrSet.name, parsedScrSet.score, counter);
      preTable.push(tempTable);
      counter += 1;
    }
    return preTable;
  }

  paintToPage = () => {
    const preTable = this.pullFromStorage();
    this.scoreListTable.innerHTML = '';
    for (let i = 0; i < preTable.length; i += 1) {
      const createdScoreSet = document.createElement('li');
      createdScoreSet.classList.add('score-list-li');
      createdScoreSet.innerHTML = preTable[i];
      createdScoreSet.id = i + 1;
      this.scoreListTable.appendChild(createdScoreSet);
    }
  }

  updateTable = () => {
    this.scoreTable = new StrScore();
    let counter = 0;
    for (let i = 0; i < this.table.length; i += 1) {
      counter += 1;
      this.table[i].id = counter;
    }
    for (let i = 0; i < this.table.length; i += 1) {
      this.scoreTable[`${this.table[i].id}`] = this.table[i];
    }
    ScoreBoard.pushToStorage(this.scoreTable);
  }

  newScoreSet = (name, score) => {
    this.scoreTable = new StrScore();
    const scoreSet = new ScoreSet();
    scoreSet.name = name;
    scoreSet.score = score;
    this.table.push(scoreSet);
    this.updateTable();
    this.paintToPage();
    this.setInputFieldListeners();
  }

  updateScoreSet = (id, text) => {
    for (let i = 0; i < this.table.length; i += 1) {
      if (this.table[i].id === parseInt(id, 10)) {
        this.table[i].name = text;
        this.updateTable();
      }
    }
  }

  setUpAddListener = () => {
    this.addButton.addEventListener('click', () => {
      this.newScoreSet(this.newName.value, this.newScore.value);
      this.pullFromStorage();
      this.newName.value = '';
      this.newScore.value = '';
    });
  }

  setInputFieldListeners = () => {
    this.inputField = document.querySelectorAll('.score-set');
    this.inputField.forEach((input) => {
      input.addEventListener('input', (e) => {
        const text = e.target.value;
        this.updateScoreSet(e.target.parentElement.id, text);
      });
    });
  }
}
