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
        var response = xhr.responseText;
        if(response == "yes"){
          getSignedRequest(form);
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

function getSignedRequest(form){
  var file = document.getElementById("resume-input").files[0];
  if(fileValidation(file) == false){
    return false;
  } else {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/signup/getSignedRequest?filename=' + file.name + '&' + 'filetype=' + file.type + '&filesize=' + file.size);
    xhr.onreadystatechange = function(){
      if(xhr.readyState == 4){
        if(xhr.status == 200 && xhr.responseText != ""){
          var response = JSON.parse(xhr.responseText);
          uploadFile(file, response.signedRequest, response.url, form);
        }
        else{
          alert("Failed to receive auth for file upload");
        }
      }
    };
    xhr.send();
  }
  return false;
}

function uploadFile(file, signedRequest, url, form){
  var xhr = new XMLHttpRequest();
  xhr.open('PUT', signedRequest);
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        document.getElementById('resume-src').value = url;
        form.submit();
      }
      else{
        alert('Could not upload file.');
      }
    }
  };
  xhr.send(file);
}

// Check on client side for file size and type
function fileValidation(file){
  return true; // remove this!
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
