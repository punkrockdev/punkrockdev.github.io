jQuery(document).ready(function($){
  //https://css-tricks.com/snippets/jquery/smooth-scrolling/
  // Select all links with hashes
  $('a[href*="#"]')
  // Remove links that don't actually link to anything
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000, function() {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            };
          });
        }
      }
    });

    let video = document.getElementById("header-video");
    let nav = document.getElementById('nav')
    // check when nav is in the viewport only if there is nav
    if (nav) {
      // check when nav is in the viewport

      let waypoint = new Waypoint({
        element: nav,
        handler: function(direction) {
          if (direction == "down") {
            $(this.element).addClass("nav-fixed").removeClass("nav-absolute");

            if (video) {
              video.pause();
            }

          } else if (direction == "up") {
            $(this.element).addClass("nav-absolute").removeClass("nav-fixed");

            if (video) {
              video.play();
            }

          }
        }
      });
    }

    //see more button for portfolio
    $("button#collapsable").click(e => {
      e.preventDefault();
      const itemsToShow = $(".collapsable-hidden").slice(0, 2);
      $(itemsToShow).removeClass("collapsable-hidden");
      if ($(".collapsable-hidden").length === 0) {
        $("button#collapsable").remove();
      }
    });

    // Lets capture a specific page view event for easy funnels
    if (typeof analytics !== 'undefined') {
        analytics.track("Viewed subscription form");
    }

    // when the form is submitted, let's capture the information
    $("#contact_form").submit(function(e){
        console.log('submit form');
        var form = this;
        // we need to stop the form from submitting too early
        e.preventDefault();

        var name = $("#name").val();
        var email = $("#email").val();

        // track this as an event. We only call the identify when we've confirmed the track event has completed
        analytics.track("Contact form submitted", function(){
        
        // identify the user, using the email address
        // as a custom distinct_id and add a callback
        // to submit the form once the identify call is complete
  	    analytics.identify(email, {
  	        email: email,
  	        name: name
  	    }, function(){
  	        // now submit the form as usual
  	        $(e.target).unbind('submit');
  	        form.submit();
  	    });
        });
    });
});
