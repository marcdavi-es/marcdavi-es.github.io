(function init () {

  var d = document,
  		more = d.getElementById("more"),
  		moreText = d.getElementById("more-text"),
      getInTouch = d.getElementById("get-in-touch"),
      contactForm = d.getElementById("contact-form");

  d.addEventListener("DOMContentLoaded", function (e) {
    
    e.preventDefault();

    more.addEventListener("click", function (e) {

    	e.preventDefault;

    	more.innerHTML = "";
    	moreText.style.marginTop = "0";

      function wobble () {
        getInTouch.classList.add("wobble");
      }

      setTimeout(wobble, 1000);
    	
    })

    getInTouch.addEventListener("click", function (e) {
      
      e.preventDefault;

    })

  });

})();