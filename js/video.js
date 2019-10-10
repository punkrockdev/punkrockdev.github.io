// This script just loads the video when resizing the browser to make development easier
// The video won't be loaded on small devices even without this code.

jQuery(document).ready(function($) {
  loadVideo();

  $(window).resize(function() {
    loadVideo();
  });

  function loadVideo() {
    let srcMp4 =
      "https://static.punkrockdev.com/file/punkrockdev/header-600px-30s.mp4";
    let breakpoint = 1200;

    var video = document.getElementById("header-video");

    // stop execution if there is no video
    if (video === null) {
      return false;
    }

    // Remove existing source tags for mobile
    if ($(document).width() <= breakpoint + 1) {
      while (video.firstChild) {
        video.removeChild(video.firstChild);
      }
    }

    // Add source tags if not already present
    if ($(document).width() > breakpoint) {

      if (document.querySelectorAll("#header-video > source").length < 1) {
        var source1 = document.createElement("source");
        source1.setAttribute("src", srcMp4);
        source1.setAttribute("type", "video/mp4");
        video.appendChild(source1);
      }

      // Play the video
      $("#header-video")[0].play();
    }
  }
});
