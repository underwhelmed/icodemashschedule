$(document).ready(function() {

  var $mapPanel = $("#conferenceMap");
  var $back = $mapPanel.find("a.back");
  var leftDelta = 8, topDelta = 8;
  var positionTimer;
  var lastX, lastY;
  var buttonOpacity = '0.7';

  $mapPanel.bind("pageAnimationStart", function(event, info) {
    if (info.direction == 'in') {
      lastX = lastY = null;
      $back.css({ opacity: '0' });
      scrolling();
    } else {
      clearTimeout(positionTimer);
      positionTimer = null;
    }
  });

  function scrolling()
  {
    positionTimer = setTimeout(scrolling, 500);

    var nowY = $(document).scrollTop();
    var nowX = $(document).scrollLeft();

    if (nowY == lastY && nowX == lastX) { return; }

    lastY = nowY;
    lastX = nowX;

    $back.stop().css({
      top: nowY + topDelta + "px",
      left: nowX + leftDelta + "px",
      opacity: '0'
    }).animate({
      opacity: buttonOpacity
    }, 800);

    $("#coords").html(nowX + ", " + nowY).css({
      top: nowY + topDelta + 30 + "px",
      left: nowX + leftDelta + "px"
    });
  }


  $mapPanel.append('<div id="coords"></div>').find("#coords").css({
    position: 'absolute',
    color: 'red'
  });
});


$(document).bind('sessions.loaded', function() {

  var mapCoordinates = {
    'Portia/Wisteria': [205, 291]
  };
  var $mapPanel = $("#conferenceMap");
  $mapPanel.bind("pageAnimationEnd", function(event, info) {
    if (info.direction != 'in') { return; }

    var scrollMapTo = $mapPanel.data('referrer').text();

    var coords = mapCoordinates[scrollMapTo];
    if (!coords) { return; }

    var x = coords[0]-0;
    var y = coords[1]-0;

    setTimeout(function() {
      scrollTo(x, y);
    }, 200);
  });
});
