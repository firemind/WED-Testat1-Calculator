$calcEntered = $("#calcEntered")[0];
$calcEval = $("#calcEval")[0];

onButtonPress = function(event){
  var val = event.target.value;
  $calcEntered.textContent += val;
  $calcEval.value = "";
}

$(".operations").on('click', onButtonPress);
$(".numberFields").on('click', onButtonPress);

evalExpression = function(){
  var calc = $calcEntered.textContent;
  $.post( "/calculate", {calc: calc})
  .done(function(data){
    $calcEval.value = data;
    if(data != "ERROR"){
      $calcEntered.textContent = data;
    }
  }).fail(function() {
    $calcEval.value = "AJAX ERROR";
  });
}

$("#sumButton")[0].addEventListener('click', evalExpression);
