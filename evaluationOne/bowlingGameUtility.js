const getSumOfArray = array => {
  return array.reduce((a, b) => {
    return a + b;
  });
}

const getFrameStatus = frame => {
  if(getSumOfArray(frame) == 10){
    if(frame.length == 2){
      return 2
    }
    return 1
  }
  return 0
}

const getScoresByFrames = eachBallScores => {
  let currentFrame = 1;
  let currentTotal = 0;

  const frameScore = { 1: [] }

  eachBallScores.forEach(score => {
    console.log(currentFrame == 1);
    if (currentFrame != 10) {
      if (
        currentTotal == 10
        ||
        frameScore[currentFrame].length == 2
      ) {
        currentFrame += 1
        currentTotal = 0
        frameScore[currentFrame] = []
      }
    }
    frameScore[currentFrame].push(score)
    currentTotal += score
  });

  return frameScore;
}

const input = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10]
console.log(getScoresByFrames(input));

const getTotalScore = eachBallScores => {
  const frameScore = getScoresByFrames(eachBallScores);
  let bestScore = 0, totalScore = 0;
  frameScore.forEach(frame => {

    const sum = getSumOfArray(frame)
    switch(getFrameStatus(frame)) {
      case 0: {
        totalScore += sum
        bestScore < sum? bestScore = sum: bestScore
      }
      case 1: {

      }
    }
  })
}