(function(global, $){
  'use strict';
  
  //////////////
  // 모바일 감지
  //////////////
  
  var userAgent      = global.navigator.userAgent.toLowerCase();
  var mobile_devices = ['iphone', 'ipad', 'android'];
  var document       = global.document;
  var html           = document.documentElement;

  for ( var d, i=0, l=mobile_devices.length; i<l; ++i ) {
    d = mobile_devices[i];
  	if ( userAgent.indexOf(d) > -1 ) {
      html.classList.add('mobile');
      break;
    }
  }
  
  
  /////////////////////
  // 디바이스 회전 방향 고정
  /////////////////////

  // if ( global.screen.lockOrientation('portrait') ) {
  	// 고정될 경우, 해당 조건이 처리 됨.
  // } else {
    // 고정되지 않을 경우, 해당 조건이 처리 됨.
  // }
  
  
  //////////////
  // 타임라인 컨트롤
  //////////////

  var tl = new TimelineMax({paused: true});

  tl.from('.album-cover', 360, { rotate: -720, ease: Power0.easeIn });

  function wiggle(selector, duration){
    $(selector).each(function() {
      wiggleProp(this, 'scale', 0.45, duration);
      wiggleProp(this, 'rotation', -2, 2);
      // wiggleProp(this, 'x', -3, 3);
      wiggleProp(this, 'y', -3, 3);
    });
  }

  function wiggleStop(selector) {
    TweenMax.killTweensOf(selector);
    TweenMax.staggerTo(selector,0.2,{scale:1},0.05);
  }

  function wiggleProp(element, prop, min, max, duration) {
    var duration = duration || Math.random() * (0.1 - 0.2) + 0.1;
    var tweenProps = {
      ease: Power1.easeInOut,
      onComplete: wiggleProp,
      onCompleteParams: [element, prop, min, max]
    };
    tweenProps[prop] = Math.random() * (max - min) + min;
    TweenMax.to(element, duration, tweenProps);
  }

  // --------------------------------------------------------------------------------

  ////////////
  // 앨범 컨트롤
  ////////////

  var $body           = $('body'),
      $container      = $('.album-container'),
      $playlist       = $('.playlist-container', $container),
      $playlist_items = $('.item', $playlist),
      $cover          = $('.album-cover', $container),
      $buttons        = $('.button', $container),
      audio;

  $.each($buttons, function(i) {
    var $button = $buttons.eq(i);
    $button.on('click', $.proxy(buttonControl, $button));
  });

  function buttonControl(e) {
    var is_play = this.hasClass('is-play');
    if ( is_play ) {
      $cover.addClass('is-play').removeClass('is-pause');
      $playlist.addClass('is-close');
      $body.addClass('is-play');
      wiggle('.album-control .button', 1);
      tl.play();
    } else {
      $cover.addClass('is-pause').removeClass('is-play');
      $playlist.removeClass('is-close');
      $body.removeClass('is-play');
      wiggleStop('.album-control .button');
      tl.pause();
    }
    this.siblings('.is-pre').removeClass('is-pre');
    this.addClass('is-pre');
    audio.playPause();
  }

  // --------------------------------------------------------------------------------

  /////////////
  // 오디오 컨트롤
  /////////////

  audiojs.events.ready(function() {
    
    var path = 'https://cdn.rawgit.com/yamoo9/yamoo9.github.io/master/sef/media/source/';

    var as = audiojs.createAll({
      // 오디오 종료 시, 다음 트랙 재생
      trackEnded: function() {
        var next = $playlist_items.filter('.is-play').next();
        if (!next.length) { next = $playlist_items.first(); }
        next.addClass('is-play').siblings().removeClass('is-play');
        audio.load( path + next.find('a').attr('href') );
        audio.play();
      }
    });

    // 오디오 첫번째 트랙 로드
    audio           = as[0];
    var first       = $playlist_items.first();
    var first_track = path + first.find('a').attr('href');

    first.addClass('is-play');
    audio.load(first_track);

    // 오디오 클릭 이벤트 핸들링
    $.each($playlist_items, function(i) {
      var $item_button = $playlist_items.eq(i).find('a');
      $item_button.on('click', $.proxy(playAudio, $item_button));
    });

    function playAudio(e) {
      e.preventDefault();
      var parent = this.parent();
      parent.addClass('is-play').siblings('.is-play').removeClass('is-play');
      audio.load( path + this.attr('href') );
      // audio.play();
    }

  });

})(window, window.jQuery, window.audiojs);