function getSignedRequest(form){
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
          form.submit();
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
