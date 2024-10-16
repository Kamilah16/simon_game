$(document).ready(function(){
 
  



var userClickedPattern=[];
var game_start=0;
var level=0;

var game_pattern=[];
var button_color=["red","blue","green","yellow"];
$(document).keypress(function(){
  if(game_start==0){
    $('#level-title').text("level "+level);
    
    nextSequence();
    game_start=1;


  }



});
$(".btn").click(function(){
  var userChosenColour=$(this).attr('id');
  userClickedPattern.push(userChosenColour);
 playSound(userChosenColour);//click
 animate(userChosenColour);
 check_ans(userClickedPattern.length-1);
 
  



});

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var random_no=Math.random();
  random_no=Math.floor((random_no*4));
  var random_chosen=button_color[random_no];
  game_pattern.push(random_chosen);
$("#"+random_chosen).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(random_chosen);

}
function playSound(name){
  var audio = new Audio("./sounds/"+name+".mp3");
  audio.play();
}
function animate(color){
  $("#"+color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
 



}
function check_ans(curr_level){
  if(userClickedPattern[curr_level]==game_pattern[curr_level]){
    if (userClickedPattern.length === game_pattern.length){

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
 
    }
  }
  else{
    var audio = new Audio('./sounds/wrong.mp3');
    audio.play();
    $('body').addClass("game-over");
    setTimeout(function () {
      $('body').removeClass("game-over");
    }, 2000);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    start_over();

  }



}
function start_over(){
  level=0;
  game_start=0;
  game_pattern=[];
}






});
