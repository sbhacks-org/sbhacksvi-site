$(document).ready(function() {
	$('.trigger').click(function() {
		$('#modal-wrapper').toggleClass('open');
		return false;
	});
	document.getElementById('modal-wrapper').className = 'transition';
	document.getElementById('modal-wrapper').addEventListener('click', function(e) {
		$('#modal-wrapper').toggleClass('open');
	}, false);
	document.getElementById('modal').addEventListener('click', function(e) {
	    e.stopPropagation();
	}, false);
	document.getElementById('subscribe').addEventListener('submit', function(e) {
		e.stopPropagation();
		e.preventDefault();
		handleSubmit();
	}, false);
});

function handleSubmit() {
	var email = document.getElementById('email-input');
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if(JSON.parse(this.response).success == true) {
				setTimeout(function(response) {
						load.className = "validated";
						setTimeout(function(){
							if(load && subscribe_container) {
								if (email) {
									email.value = "";
								}
								subscribe_container.removeChild(load);
								$('#modal-wrapper').toggleClass('open');
								setTimeout(function() {
									subscribe.removeAttribute("class");
								}, 250);
							}
						}, 2000);
				} , 1000);
			} else {
				setTimeout(function(){
					load.className = "failure";
					setTimeout(function(){
						if(load && subscribe_container) {
							if (email) {
								email.value = "";
							}
							subscribe_container.removeChild(load);
							subscribe.removeAttribute("class");
						}
					}, 2000);
				}, 500);
			}
		}
	}

	xhttp.open("POST", "/subscribe");
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("email=" + email.value);
	var subscribe_container = document.getElementById('subscribe_container');
	var subscribe = document.getElementById('subscribe');
	var load = document.createElement('div');
	load.setAttribute("id", "loader");
	load.className += "onclic";
	subscribe.className = "hidden";
	subscribe_container.appendChild(load);
	return false;
}