$calcEntered = $("#calcEntered")[0];
$calcEval = $("#calcEval")[0];

onButtonPress = function(event){
  val = event.target.value;
  $calcEntered.textContent += val;
}

$(".operations").on('click', onButtonPress);
$(".numberFields").on('click', onButtonPress);

/*evalExpression = function(){*/
/*var calc = $calcEntered.textContent;*/
/*if(calc.match(/^[0-9+-\/\*]*$/)){*/
/*try {*/
/*result = eval(calc);*/
/*}catch(err){*/
/*alert(err);*/
/*result = "ERROR";*/
/*}*/
/*}else{*/
/*result = "not allowed";*/
/*}*/
/*$calcEval.value = result;*/
/*}*/
evalExpression = function(){
  var calc = $calcEntered.textContent;
  $.post( "/calculate", {calc: calc, test: "MyTESt"})
  .done(function(data){
    $calcEval.value = data;
  }).fail(function() {
    $calcEval.value = "AJAX ERROR";
  });
}

$("#sumButton")[0].addEventListener('click', evalExpression);
