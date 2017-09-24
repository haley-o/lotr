// do not remove this line!!
$(document).foundation();

// JavaScript Document
(function() {
	"use strict";
	console.log("good to go...");

	var imgSlides = document.querySelectorAll(".slider .slide");
	var textSlides = document.querySelectorAll(".textSlider .slide");
	var slide = 0;
	// var mainNav = document.querySelectorAll("#mainNav");
	// var pages = nav.querySelectorAll("a");

	var pageLinks = document.querySelectorAll("#mainNav li")
	var pages = document.querySelectorAll(".page");
	
	var previous = document.querySelector("#previous");
	var next = document.querySelector('#next');


	function previousImage(e) {
		e.preventDefault();
		goToSlide(slide-1);
	}

	function nextImage(e) {
		e.preventDefault();
		goToSlide(slide+1);
	} 	

	function goToSlide(n){
		// Take the initial value stored in slide as a key in slides add class 'slide' to that object
		imgSlides[slide].className = 'slide';
		textSlides[slide].className = 'slide';
		// Set the value of slide to be the next slide we are going to
		// inject the initial value of slide+1 (currently 0+1) which is 'n' + the number of slides
		// Use modulus operator to get the remainder value comparing ^ above line to the number of slides
		// (currently: 6 % 5 )
		slide = (n+imgSlides.length)%imgSlides.length;
		// Use new value of slide (currently: 1 ) as a key value in slides and add the 'showing' class to show
		imgSlides[slide].className = 'slide showing';
		textSlides[slide].className = 'slide showing';

	}

	for (var i =0; i < pageLinks.length; i++) {
		pageLinks[i].addEventListener("click", function(e) {
			e.preventDefault();
			var index = [].slice.call(this.parentNode.children).indexOf(this);
			console.log(index);
			pages[index].scrollIntoView({
				behavior: 'smooth'
			});
		}, false);
	}

	next.addEventListener("click", nextImage, false);
	previous.addEventListener("click", previousImage, false);

})();