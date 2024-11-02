    var canvas = document.getElementById('canvas');
    var ctx  = canvas.getContext('2d');

    var pickWord = function () {
    var words = [
      "пітон",
      "планшет",
      "інформатика",
      "мед"
    ];
    return words[Math.floor(Math.random() * words.length)];
  };

 var progress = function (letters) {
    return (100 / letters);
 };

  var drawPeople = function () {
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, 20, 20);
    ctx.beginPath();
    ctx.moveTo(30, 40);
    ctx.lineTo(30, 80);
    ctx.moveTo(30, 80);
    ctx.lineTo(10, 110);
    ctx.moveTo(30, 80);
    ctx.lineTo(50, 110);   
    ctx.moveTo(30, 60);
    ctx.lineTo(10, 50);      
    ctx.moveTo(30, 60);
    ctx.lineTo(50, 50);
    ctx.stroke();
  };

  var setupAnswerArray = function (word) {
    var answerArray = [];
    for (var i = 0; i < word.length; i++) {
      answerArray[i] = "_";
    }

    return answerArray;
  };

  var showPlayerProgress = function (answerArray, score, counter) {
    $("#output1").html("<p>" + answerArray.join(" ") + "</p>"); 
    $("#output2").html( "<p>" + "Залишилося " + remainingLetters + " букв "+ "та " + (score-counter) + " ходів." + "</p>" );
  };

  var updateGameState = function (guess, word, answerArray){
    appearances=0;
    for (var j = 0; j < word.length; j++) {
      if (word[j] === guess){
        answerArray[j] = guess;
        appearances++;
      }
    }
    return appearances;
  };

  var updateProgressState = function (guess, word, answerArray){
    for (var f = 0; f < word.length; f++) {
      if (word[f] === guess){
        answerArray[f] = guess;
        lett+=1; 
      };
    };
      return lett;
  };

  var showAnswerAndCongratulatePlayer = function (answerArray) {
    $("#output3").text("Вітаю, ви виграли!");
  };

  
  var appearances=0;
  var word = pickWord();
  var answerArray = setupAnswerArray(word);
  var remainingLetters = word.length;
  var letters = word.length;
  var counter = 0;
  var score = remainingLetters+3;
  var progLetters = progress(letters);
  var lett = 0;
  var counter_restart = 0;
  
  var restart = function() {
    location.reload();
  };
$(document).ready(function () {
  showPlayerProgress(answerArray, score, counter); 
  $("#input").css("display", "block");
  $("body").on("click", "#ok", function () {
      var guess = $("#textIn").val().toLowerCase();
      $("#textIn").val('');
      var prog = updateProgressState(guess, word, answerArray);
      var correctGuesses = updateGameState(guess, word, answerArray);
      remainingLetters -= correctGuesses;
      counter++;
      if (remainingLetters===0) {
         $("#input").hide(500);
         $("#output2").hide(500);
         $("#output1").hide(300);
         $("#progress_bar").fadeOut(300);
         $("#canvas").show(1000)
         drawPeople();
         showAnswerAndCongratulatePlayer(answerArray);
         $("#restart").show(1000);
      };
      if(remainingLetters > (score-counter)){
         $("#input").hide(500);
         $("#output2").hide(500);
         showPlayerProgress(answerArray, score, counter);
         $("#output1").hide(1000);
         $("#progress_bar").fadeOut(300);
         $("#output3").text("На жаль, ви програли :( ");
         $("#restart").show(10000);
      };
      $(".progress").css("width", (progLetters * prog + "%"));// Рядок прогресу
      showPlayerProgress(answerArray, score, counter);
    });
});

