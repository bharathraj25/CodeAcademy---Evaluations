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
