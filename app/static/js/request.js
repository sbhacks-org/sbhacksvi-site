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
