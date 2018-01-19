export const setHighScore = (score, database) => {
  database.ref().set({ highScore: score });
};

export const getHighScore = (database, game) => {
  database.ref().once('value').then((res) => {
    const highScore = res.val().highScore;
    game.highScore = highScore;
  });
};
