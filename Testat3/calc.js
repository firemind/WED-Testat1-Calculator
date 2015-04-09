calcEntered = $("#calcEntered")[0];
calcEval = $("#calcEval")[0];

onButtonPress = function(event){
  val = event.target.value;
  calcEntered.textContent += val;
}

$(".operations").bind('click', onButtonPress);
$(".numberFields").bind('click', onButtonPress);

evalExpression = function(){
  try {
    result = eval(calcEntered.textContent);
  }catch(err){
    alert(err);
    result = "ERROR";
  }
  calcEval.value = result;
}
$("#sumButton")[0].addEventListener('click', evalExpression);
