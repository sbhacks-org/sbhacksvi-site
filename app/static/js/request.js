function submitSignUp(){

  var full_name = document.getElementsByName('full_name')[0];
  if(full_name.value == ''){
    window.alert('enter in name field');
    return false;
  }

  fetch('/signup', { method: 'POST'})
  .then((res) => {
    var success = document.createElement('h1');
    success.innerHTML = "Form posted to server";
    document.body.appendChild(success);
  });

  return false;
}

function getSignedDummy(form){
  var file = document.getElementById("resume-input").files[0];
  if(file == null){
    return false;
  } else {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/signup');
    xhr.onreadystatechange = function(){
      if(xhr.readyState == 4){
        if(xhr.status == 200){
          alert("xhr success");
          //form.submit();
        }
        else{
          alert("xhr failure");
        }
      }
    };
    xhr.send();
  }
  return false;
}

function getSignedRequest(form){
  alert('xhr sent');
  var file = document.getElementById("resume-input").files[0];
  if(file == null){
    return false;
  } else {
    var XMLHttpRequest = new XMLHttpRequest();
    xhr.open('GET', 'http://www.google.com');
    xhr.onreadystatechange = function(){
      if(xhr.readyState == 4){
        if(xhr.status == 200){
          alert("google has been opened");
          //form.submit();
        }
        else{
          alert("can't open google?");
        }
      }
    };
    xhr.send();
  }
  return false;
}
