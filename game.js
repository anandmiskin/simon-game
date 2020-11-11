var buttonColors = ["red", "green", "blue", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var started = false;
var level = 0;

$(document).keydown(function(){
    if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started  = true;
}
});

$(".btn").on("click", function(){
   var clickButton = $(this).attr("id");
   userClickedPattern.push(clickButton);
   playSound(clickButton);
   animatePress(clickButton);
   checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(inputValue){
    if (gamePattern[inputValue] === userClickedPattern[inputValue]) {
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
        
    } else {
        
        $("#level-title").text("Game-Over, press a key to restart");
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}


function nextSequence(){
    level++;
    userClickedPattern = [];
    $("#level-title").text("Level "+ level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomlyChosenColor = buttonColors[randomNumber];
    $("#"+randomlyChosenColor).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomlyChosenColor);
    gamePattern.push(randomlyChosenColor);
        
};

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(flash){
    $("#"+ flash).addClass("pressed");
    setTimeout(function(){
       $("#"+ flash).removeClass("pressed");
    },100);
};

function startOver(){
    started = false;
    level = 0;
    gamePattern = [];
}
