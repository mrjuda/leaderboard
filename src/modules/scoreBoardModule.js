import { newScoreSet, getScoreSet } from './apiModule.js';

export default class ScoreBoard {
  table = [];

  scoreTable;

  refreshButton = document.getElementById('refreshButton');

  addButton = document.getElementById('addButton');

  newName = document.getElementById('newName');

  newScore = document.getElementById('newScore');

  displayScoreSet = () => {
    getScoreSet().then((scoreList) => {
      const orderScores = (array) => array.sort((a, b) => b.score - a.score);
      const orderedScores = orderScores(scoreList);
      const scoreListTable = document.getElementById('scoreListTable');
      scoreListTable.innerHTML = '';

      orderedScores.forEach((object) => {
        const scoreLi = document.createElement('li');
        scoreLi.classList.add('score-set');

        const scoreSetItem = `
            <span>${object.user} - </span>
            <span>${object.score}</span>
          `;

        scoreLi.innerHTML = scoreSetItem;
        scoreListTable.appendChild(scoreLi);
      });
    });
  }

  setUpAddListener = () => {
    this.addButton.addEventListener('click', (e) => {
      e.preventDefault();
      newScoreSet();
      this.newName.value = '';
      this.newScore.value = '';
    });
  }

  setUpRefreshListener = () => {
    this.refreshButton.addEventListener('click', () => {
      this.displayScoreSet();
    });
  }
}
