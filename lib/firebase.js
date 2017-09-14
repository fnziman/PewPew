export const newHighScore = (score, database) => {
  database.ref().set({ highScore: score });
};

export const getScore = (database, game) => {
  database.ref().once('value').then((res) => {
    const highScore = res.val().highScore;
    game.highScore = highScore;
  });
};
