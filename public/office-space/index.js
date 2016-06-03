(function(){

  var obstacles = ['paperclip', 'ice-cream', 'sharpie', 'post-it', 'scissors'];
  var $el = {
    volumeLeft : $('#stage-left').find('.volume'),
    volumeRight : $('#stage-right').find('.volume')
  };

  var game = new Game({
    width : window.innerWidth,
    height : window.innerHeight,
    obstacleConfig : obstacles,
    obstacleCount: 20
  });


  Scream.socket.on('stage-left', function(data){
    var volume = Math.round(data.volume/Utils.config.sensitivity);
    if(volume >= 100) volume = 100;
    $el.volumeLeft.css('height', volume + '%');
    game.leftVolume = volume;
  });

  Scream.socket.on('stage-right', function(data){
    var volume = Math.round(data.volume/Utils.config.sensitivity);
    if(volume >= 100) volume = 100;
    $el.volumeRight.css('height', volume + '%');
    game.rightVolume = volume;
  });


  document.onkeydown = function(e){
    if(e.keyCode == 39){
      game.volume.left += 5;
    } else if(e.keyCode == 37){
      game.volume.left -= 5;
      if(game.volume.left <= 0 ) game.volume.left = 0;
    } else if(e.keyCode == 65){
      game.volume.right += 5;
    } else if(e.keyCode == 83){
      game.volume.right -= 5;
      if(game.volume.right <= 0) game.volume.right = 0;
    }
  };

})();
