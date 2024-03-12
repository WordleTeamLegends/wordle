export function resultValidation(currentRowArray, solution) {
  /*
                _   
            .__(.)< (Eduardo NO!)
            \___)
      ~~~~~~~~~~~~~~~~~~ 
                            _   
      (Matrix Good!)      >(.)__.
                            (___/
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  let solutionarray = solution.split("");
  const originalsolutionarray = JSON.parse(JSON.stringify(solutionarray));

  const guessarray = [
    currentRowArray[0].value.toLowerCase(),
    currentRowArray[1].value.toLowerCase(),
    currentRowArray[2].value.toLowerCase(),
    currentRowArray[3].value.toLowerCase(),
    currentRowArray[4].value.toLowerCase(),
  ]; // new from here
  
  let resultarray = [0, 0, 0, 0, 0];
  
  //see if there be greens and if so delete greens from solution array
  guessarray.forEach((value, index) => {
    if (value === solutionarray[index]) {
      resultarray[index] = 2;
      solutionarray[index] = null;
    }
  })

  //Find yellows and if there be one then null it that one so that second or more letters wont go yellow
  
  guessarray.forEach((value,index) => {
    if(solutionarray.includes(value)) {
      resultarray[index] = 1;
      solutionarray[solutionarray.indexOf(value)] = null;
    }
  })

  return [resultarray, guessarray, originalsolutionarray];
}