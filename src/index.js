import ScoreBoard from './modules/scoreBoardModule.js';
import './index.scss';

const scoreBoard = new ScoreBoard();

scoreBoard.displayScoreSet();
scoreBoard.setUpAddListener();
scoreBoard.setUpRefreshListener();
