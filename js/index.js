(function($) {
  var mouseDown = false;
  var threadColor = "#639FB0";
  var clearSelected = false;
  
  // Toggle mousedown
  function mouseHandler() {
    mouseDown = !mouseDown;
  }

  $(document).on("mousedown mouseup", mouseHandler);

  $('.emptySpoolClick').on('click', function(){
    clearSelected = true;
  });
  
  // Prevent dragging which disables mouseenter
  $("div").on("dragstart", function(e) {
    e.preventDefault();
  });

  // Color picker
  $("#colorPicker").on("change", function() {
    threadColor = $(this).val();
    $(".colorSpoolBody").css("background", $(this).val());
    $(".thread1 path, .thread2 path").attr("fill", $(this).val());
  });

  $("#colorPicker").on("click", function() {
    clearSelected = false;
  });
  
  function drawStitch(square, animation) {
    // Clear current stitch divs inside of the element
    square.empty();
    if(clearSelected){
      return;
    }
    var stitch1 = document.createElement("div");
    var stitch2 = document.createElement("div");
    stitch1.classList.add("stitch1");
    stitch2.classList.add("stitch2");    

    if (animation) {
      // setTimeout to fix css transition due to reflow
      square.append(stitch1, stitch2);
      window.setTimeout(function() {
        $([stitch1, stitch2]).each(function() {
          $(this).css({
            height: "120%",
            background: threadColor
          });
        });
      }, 0);
    }
    else {
      $(stitch1).css({
            height: "120%",
            background: threadColor
          } );
      $(stitch2).css({
            height: "120%",
            background: threadColor
          });
      square.append(stitch1, stitch2);
      
    }
  }

  $(".grid div").on("mouseenter", function() {
    if (mouseDown) {
      drawStitch($(this), false);
    }
  });

  $(".grid div").on("mousedown", function() {
    drawStitch($(this), true);
  });
})(jQuery);