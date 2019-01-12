// Set the date we're counting down to
var countDownDate = new Date("Jan 11, 2019 21:00:00").getTime();
var started = false;
document.getElementById("countdown").innerHTML = "Hacking begins in:"
if(countDownDate - new Date().getTime() <= 0){
	countDownDate = new Date("Jan 13, 2019 9:00:00")
	started = true;
	document.getElementById("countdown").innerHTML = "Hacking ends in:";
}

// Update the count down every 1 second
var x = setInterval(function() {

    // Get todays date and time
	var now = new Date().getTime();
    
    // Find the distance between now an the count down date
	var distance = countDownDate - now;
    
    // Time calculations for days, hours, minutes and seconds
	var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Output the result in an element with id="demo"
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
    
    // If the count down is over, write some text 
	if (distance <= 0) {
		if(started){
			clearInterval(x);
			document.getElementById("countdown").innerHTML = "Thank you for submitting. Results will be annouced soon!";
		}
		else{
			countDownDate = new Date("Jan 13, 2019 9:00:00")
			started = true;
			document.getElementById("countdown").innerHTML = "Hacking ends in:";
		}
	}
}, 1000);