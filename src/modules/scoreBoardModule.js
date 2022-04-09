import StrScore from './strScoreModule.js';
import ScoreSet from './scoreSetModule.js';

export default class ScoreBoard {
  table = [];

  scoreTable;

  addButton = document.getElementById('addButton');

  newName = document.getElementById('newName');

  newScore = document.getElementById('newScore');

  scoreListTable = document.getElementById('scoreListTable');

  // clearAllBtn = document.getElementById('clear-all-btn');

  removeButton;

  inputField;

  checkboxButton;

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

  // Adds a unique class so it can be called by the addeventlistener later

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
    // this.setRemoveListeners();
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
    // this.setCheckboxFieldListeners();
  }

  // removeBook = (id) => {
  //   for (let i = 0; i < this.table.length; i += 1) {
  //     if (this.table[i].id === parseInt(id, 10)) {
  //       this.table.splice(i, 1);
  //       this.updateTable();
  //     }
  //     this.paintToPage();
  //     this.setCheckboxFieldListeners();
  //   }
  // }

  updateScoreSet = (id, text) => {
    for (let i = 0; i < this.table.length; i += 1) {
      if (this.table[i].id === parseInt(id, 10)) {
        this.table[i].name = text;
        this.updateTable();
      }
    }
  }

  updateCompletion = (id, completed) => {
    for (let i = 0; i < this.table.length; i += 1) {
      if (this.table[i].id === parseInt(id, 10)) {
        this.table[i].completed = completed;
        this.updateTable();
      }
    }
  }

  // showUnchecked = () => {
  //   const pendingTasks = this.table.filter((task) => task.completed === false);
  //   this.table = [];
  //   pendingTasks.forEach((task) => {
  //     this.table.push(task);
  //   });
  //   this.updateTable();
  //   this.paintToPage();
  //   this.setInputFieldListeners();
  //   this.setCheckboxFieldListeners();
  // }

  // setRemoveListeners = () => {
  //   this.removeButton = document.querySelectorAll('.removeButton');
  //   this.removeButton.forEach((button) => {
  //     button.addEventListener('click', (e) => {
  //       this.removeBook(e.target.id);
  //     });
  //   });
  // }

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

  // setCheckboxFieldListeners = () => {
  //   this.checkboxButton = document.querySelectorAll('.box');
  //   this.checkboxButton.forEach((checkbox) => {
  //     checkbox.addEventListener('click', (e) => {
  //       let taskChecked = false;
  //       const crossTask = document.querySelector(`.taskId${e.target.parentElement.id}`);
  //       if (e.target.classList.contains('unchecked')) {
  //         taskChecked = true;
  //         crossTask.classList.add('done');
  //         e.target.classList.toggle('checked');
  //         e.target.classList.toggle('unchecked');
  //       } else if (e.target.classList.contains('checked')) {
  //         taskChecked = false;
  //         crossTask.classList.remove('done');
  //         e.target.classList.toggle('checked');
  //         e.target.classList.toggle('unchecked');
  //       }
  //       this.updateCompletion(e.target.parentElement.id, taskChecked);
  //     });
  //   });
  // }

  // Sets the listener for the clear button

  // setClearAll = () => {
  //   this.clearAllBtn.addEventListener('click', () => {
  //     this.showUnchecked();
  //   });
  // }
}