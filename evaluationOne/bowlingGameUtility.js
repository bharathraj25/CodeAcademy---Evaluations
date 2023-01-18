const getSumOfArray = array => {
  return array.reduce((a, b) => a + b);
};

const getFrameStatus = frame => {
  if (getSumOfArray(frame) == 10) {
    if (frame.length == 2) {
      return 2;
    }
    return 1;
  }
  return 0;
};

const getScoresByFrames = eachBallScores => {
  let currentFrame = 1, currentTotal = 0;

  const frameScores = { 1: [] };

  let valid = true;

  eachBallScores.forEach(score => {
    if (score > 10) {
      valid = false;
    }
    if (currentFrame != 10) {
      if (
        currentTotal == 10
        ||
        frameScores[currentFrame].length == 2
      ) {
        currentFrame += 1;
        currentTotal = 0;
        frameScores[currentFrame] = [];
      }
    }
    frameScores[currentFrame].push(score);
    currentTotal += score;
  });

  if (
    !valid
    ||
    currentFrame != 10
    ||
    frameScores[currentFrame].length > 3
    ||
    (
      frameScores[currentFrame].length == 3
      &&
      getSumOfArray(frameScores[currentFrame].slice(0, 2)) < 10
    )
  ) {
    throw new Error('Invalid Scores Input');
  }

  // return { valid, frameScores };
  return frameScores;

};

const getExtraPoints = (frameScores, frameNumber, status) => {
  if (status == 1) {
    return frameScores[Number(frameNumber) + 1].length >= 2 ?
      getSumOfArray(frameScores[Number(frameNumber) + 1]) :
      frameScores[Number(frameNumber) + 1][0] + frameScores[Number(frameNumber) + 1][0];
  }
  else if (status == 2) {
    return frameScores[Number(frameNumber) + 1][0];
  }
};

const getTotalScore = eachBallScores => {
  try {
    const frameScores = getScoresByFrames(eachBallScores);
    let bestScore = 0, totalScore = 0;

    for (const frame in frameScores) {
      const sum = getSumOfArray(frameScores[frame]);
      let fScore = 0;
      const frameStatus = getFrameStatus(frameScores[frame]);

      if (frame == 10) {
        fScore = getSumOfArray(frameScores[frame]);
      }

      else {
        switch (frameStatus) {
        case 0: {
          fScore = sum;
          break;
        }
        case 1: {
          fScore = 10 + getExtraPoints(frameScores, frame, 1);
          break;
        }
        case 2: {
          fScore = 10 + getExtraPoints(frameScores, frame, 2);
          break;
        }
        }
      }
      totalScore += fScore;
      bestScore < fScore ? bestScore = fScore : bestScore;
    }

    return { totalScore, bestScore };
  }
  catch (error) {
    return error;
  }
};

const getBestScore = eachBallScores => {
  return getTotalScore(eachBallScores).bestScore;
};

const input = [3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 1];

console.log(getBestScore(input));
console.log(getTotalScore(input));