(function init () {

	var d = document, 
		submit = d.getElementById('submit'),
		error = d.getElementById('error'),
		form = d.getElementById('form');

	d.addEventListener('DOMContentLoaded', function (e) {
		e.preventDefault();
		addEventListeners();
	}); 

	function addEventListeners () {
		d.addEventListener('keypress', killEnter);
		submit.addEventListener('keypress', keyPressListener);
		submit.addEventListener('click', clickListener);
	}

	function removeEventListeners () {
		submit.removeEventListener('keypress', keyPressListener);
		submit.removeEventListener('click', clickListener);
	}

	function killEnter (e) {
		e.preventDefault;
		if (e.keyCode === 13) return false;
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
		changeToSending(submit, 'Sending');
		var submitURL = buildURL();
		postFormData(submitURL);
	}

	function buildURL () {
		// https://github.com/heaversm/google-custom-form
		// assemble input values in URL
		var ids = ['name','email', 'dropdown'],
			inputs = '';

		for (var i = 0; i < ids.length; i++) {
			var element = d.getElementById(ids[i]),
				name = element.getAttribute('name');
				value = encodeURIComponent(element.value);
				input = name + '=' + value + '&';

			inputs = (inputs + input);
		};

		var	baseURL = 'https://docs.google.com/forms/d/15x-7fx3afvFnKAgyHqNJYP6f2WLqkQAsqAALXOhjgaM/formResponse?',
			submitRef = 'submit=Submit',
			submitURL = (baseURL + inputs + submitRef);

		return submitURL;
	}

	function postFormData (url) {
		var validateFlag = validate();
		form.action = url;
		handler(validateFlag, form, submit);
	}

	function validate () {
		var regexp = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)\b/i,
			name = d.getElementById('name'),
			email = d.getElementById('email'),
			standard = d.getElementById('dropdown');
		if (regexp.test(email.value) && !!name.value && standard.value != '...') return true;
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

	function changeToSending (element, message) {
		element.classList.add('disabled');
		fadeText(element, false);
		element.dotterFlag = false;
		setTimeout(function(){
			dotTheI(element, message);
			fadeText(element, true);
		}, 300);
	}

	function changeToSent (element) {
		element.classList.add('complete');
		element.classList.remove('disabled');
		fadeText(element, false);
		element.dotterFlag = true;
		setTimeout(function(){
			hide(form);
			element.innerHTML = 'See you at the Champs';
			element.removeAttribute('style');
		}, 600);
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

	function show (element) {
		element.classList.add('visible');
	}

	function hide (element) {
		element.classList.remove('visible');
	}

})();
