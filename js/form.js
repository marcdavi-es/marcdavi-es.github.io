(function init () {

	var d = document, 
		submit = d.getElementById('submit'),
		error = d.getElementById('error'),
		backHome = d.getElementById('back-home');

	d.addEventListener('DOMContentLoaded', function (e) {
		e.preventDefault();
		addEventListeners();
	}); 

	function addEventListeners () {
		d.addEventListener('keypress', keyPressListener);
		submit.addEventListener('click', clickListener);
	}

	function removeEventListeners () {
		d.removeEventListener('keypress', keyPressListener);
		submit.removeEventListener('click', clickListener);
	}

	function keyPressListener (e) {
		e.preventDefault;
		if (e.keyCode === 13) formSubmit(e);
	}

	function clickListener (e) {
		e.preventDefault;
		formSubmit(e);
	}

	function formSubmit (e) {
		e.preventDefault;
		hide(error);
		removeEventListeners(); 
		changeToSending(submit);
		var submitURL = buildURL();
		postFormData(submitURL);
	}

	function buildURL () {
		// https://github.com/heaversm/google-custom-form
		// assemble input values in URL
		var ids = ['email','message-input'],
			inputs = '';

		for (var i = 0; i < ids.length; i++) {
			var element = d.getElementById(ids[i]),
				name = element.getAttribute('name');
				value = encodeURIComponent(element.value);
				input = name + '=' + value + '&';

			inputs = (inputs + input);
		};

		var	baseURL = 'https://docs.google.com/forms/d/1vkLhamXuY8iWTUtR0LUzRxv6Cen7XJSUNLIs8EKekiI/formResponse?',
			submitRef = 'submit=Submit',
			submitURL = (baseURL + inputs + submitRef);

		return submitURL;
	}

	function postFormData (url) {
		var form = d.getElementById('form'),
			validateFlag = validate();
		form.action = url;
		handler(validateFlag, form, submit);
	}

	function validate () {
		var regexp = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)\b/i,
			email = d.getElementById('email'),
			messageInput = d.getElementById('message-input');
		if (regexp.test(email.value) && !!messageInput.value) return true;
		return false;		
	}

	function handler (flag, form, element) {

		setTimeout(function(){
			if (flag) { 
				form.submit()
				changeToSent(element);
			} else {
				showError(element);
			}
		}, 2000);
	}

	function changeToSending (element, string) {
		element.classList.add('disabled');
		fadeText(element, false);
		element.dotterFlag = false;
		setTimeout(function(){
			dotTheI(element, 'Sending');
			fadeText(element, true);
		}, 300);
	}

	function changeToSent (element) {
		element.classList.add('complete');
		element.classList.remove('disabled');
		fadeText(element, false);
		element.dotterFlag = true;
		setTimeout(function(){
			element.innerHTML = 'Sent! <nbr> Marc will be in touch';
			element.removeAttribute('style');
		}, 600);
		setTimeout(function(){
			show(backHome);
		}, 700);
	}

	function showError (element) {
		fadeText(element, false);
		element.dotterFlag = true;
		setTimeout(function(){
			element.classList.remove('disabled');
			show(error);
			element.textContent = 'Try again';
			element.removeAttribute('style');
		}, 400);
		addEventListeners();
	}

	function dotTheI (element, string) {

		var string = string,
			strıng = string.replace(/i/, '\u0131'),
			cadence = 600, // in milliseconds
			a = true // alternator
		
		function dotter () {
			element.textContent = a ? string : strıng ;
			a = !a;
			if(!element.dotterFlag) setTimeout(dotter,cadence);
		}

		dotter();

	}

	function fadeText (element, inOrOut) {

		var color = window.getComputedStyle(element).color,
			values = /^rgba?\((\d{1,3}),\s(\d{1,3}),\s(\d{1,3}),?\s?(\d?\.?\d*?)\)$/.exec(color);

		if (inOrOut) {fadeIn(element,values)}else{fadeOut(element, values)};

	}

	function fadeIn (element, values) {
		
		var r = values[1],
			g = values[2],
			b = values[3],
			a = values[4],
			opacity = Number(a);

		if (opacity > 0.9) return;

		opacity = (opacity + 0.1).toFixed(1);
		element.style.color = 'rgba('+ r +', '+ g +', '+ b +', '+ opacity +')';
		values = /rgba?\((\d{1,3}),\s(\d{1,3}),\s(\d{1,3}),?\s?(\d?\.?\d*?)\)$/.exec(element.style.color);
	
		setTimeout(fadeIn(element, values), 20);

	}

	function fadeOut (element, values) {

		var r = values[1],
			g = values[2],
			b = values[3],
			a = values[4],
			opacity = Number(a);

		if (opacity === 0) opacity = 1;
		if (opacity < 0.1) return;

		opacity = (opacity - 0.1).toFixed(1);

		element.style.color = 'rgba('+ r +', '+ g +', '+ b +', '+ opacity +')';

		values = /rgba?\((\d{1,3}),\s(\d{1,3}),\s(\d{1,3}),?\s?(\d?\.?\d+?)\)$/.exec(element.style.color);
		setTimeout(fadeOut(element, values), 20);

	}

	// http://www.html5rocks.com/en/tutorials/cors/

	function createCORSRequest(method, url) {
		var xhr = new XMLHttpRequest();
		if ("withCredentials" in xhr) {
			// Check if the XMLHttpRequest object has a "withCredentials" property.
			// "withCredentials" only exists on XMLHTTPRequest2 objects.
			xhr.open(method, url, true);
		} else if (typeof XDomainRequest != "undefined") {
			// Otherwise, check if XDomainRequest.
			// XDomainRequest only exists in IE, and is IE's way of making CORS requests.
			xhr = new XDomainRequest();
			xhr.open(method, url);
		} else {
			// Otherwise, CORS is not supported by the browser.
			xhr = null;
		}
		return xhr;
	}

	function show (element) {
		element.classList.add('visible');
	}

	function hide (element) {
		element.classList.remove('visible');
	}

})();
