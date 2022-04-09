const uniqueGame = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/ZSNfw2bTfTpIlfl4zgl7/scores';

const newName = document.getElementById('newName');
const newScore = document.getElementById('newScore');

const newScoreSet = async () => {
  const response = await fetch(uniqueGame, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      user: newName.value,
      score: newScore.value,
    }),
  });

  const data = await response.json();
  return data;
};

const getScoreSet = async () => {
  const response = await fetch(uniqueGame);
  const values = await response.json();
  return values.result;
};

export { newScoreSet, getScoreSet };