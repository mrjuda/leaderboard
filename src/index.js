import ScoreBoard from './modules/scoreBoardModule.js';
import './index.scss';

const scoreBoard = new ScoreBoard();

scoreBoard.paintToPage();
scoreBoard.setUpAddListener();
scoreBoard.setInputFieldListeners();
