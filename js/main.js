jQuery(document).ready(function($){
    let video = document.getElementById("header-video");

    // check when nav is in the viewport
    let waypoint = new Waypoint({
      element: document.getElementById('nav'),
      handler: function(direction) {
        if (direction == "down") {
          $(this.element).addClass("nav-fixed").removeClass("nav-absolute");
          video.pause();
        } else if (direction == "up") {
          $(this.element).addClass("nav-absolute").removeClass("nav-fixed");
          video.play();
        }
      }
    });

    //see more button for portfolio
    $("#collapsable").click((e) => {
      e.preventDefault();
      const itemsToShow = $(".collapsable-hidden").slice(0, 2);
      $(itemsToShow).removeClass("collapsable-hidden");
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
