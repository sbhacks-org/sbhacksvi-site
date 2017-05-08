function handleSubmit(form){
  var email_input = document.getElementById('email-input');
  if(!email_input){
    alert("Please fill out an email");
  }
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/signup/unique');
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
      if(xhr.status == 200){
        var response = JSON.parse(xhr.responseText).unique;
        if(response == "yes"){
          var file = document.getElementById("resume-input").files[0];
          if(fileValidation(file) == true){
            form.submit();
            return true;
          }
        } else {
          alert("Please enter a unique email");
        }
      } else {
        alert("Unexpected Error please contact the SB Hacks team");
      }
    }
  }
  var body = 'email=' + email_input.value;
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(body) ;
  return false;
}

// Check on client side for file size and type
function fileValidation(file){
  if(file == null){
    alert('A resume is required');
    return false;
  }
  if(file.type != 'application/pdf'){
    alert('File must be a PDF');
    return false;
  }
  if(file.size > 4194304){
    alert('Resume cannot be more than 4MB');
    return false;
  }
  return true;
}
