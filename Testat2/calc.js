calcEntered = document.getElementById("calcEntered");
calcEval = document.getElementById("calcEval");

onButtonPress = function(event){
  val = event.target.value;
  calcEntered.textContent += val;
}

document.getElementsByClassName("operations")[0].addEventListener('click', onButtonPress);
document.getElementsByClassName("numberFields")[0].addEventListener('click', onButtonPress);

evalExpression = function(){
  try {
    result = eval(calcEntered.textContent);
  }catch(err){
    alert(err);
    result = "ERROR";
  }
  calcEval.value = result;
}
document.getElementById("sumButton").addEventListener('click', evalExpression);
