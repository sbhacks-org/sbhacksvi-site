$(document).ready(function() {
	$('.trigger').click(function() {
		$('.modal-wrapper').toggleClass('open');
		return false;
	});
	$('.modal-wrapper').click(function() {
		$('.modal-wrapper').toggleClass('open');
	});
	$('.modal').click(function() {
		return false; // stop bubbling phase
	});
});