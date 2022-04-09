import ScoreBoard from './modules/scoreBoardModule.js';
import './index.scss';

const scoreBoard = new ScoreBoard();

scoreBoard.paintToPage();
scoreBoard.setUpAddListener();
scoreBoard.setInputFieldListeners();

// TESTS PROMISES

// console.log('Hi friend');

// const myPromise = new Promise((resolve, reject) => {
//   const connection = false;
//   if (connection) {
//     resolve('connection established');
//   } else {
//     reject();
//   }
// });

// myPromise.then((message) => {
//   console.log(message);
// }).catch((message) => {
//   console.log(message);
// });
