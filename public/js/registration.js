document.getElementById("submit").addEventListener("click", e => {
  e.preventDefault();
  // const name_label = document.getElementById("name_label");
  // const name_id = document.getElementById("name_id");
  // const password_label = document.getElementById("password_label");
  // const password_id = document.getElementById("password_id");
  // const email_id = document.getElementById("email_id");
  // const email_label = document.getElementById("email_label");
  let registration = document.forms["reg-form"];
  let name = registration.elements["name"].value;
  let password = registration.elements["password"].value;
  let email = registration.elements["email"].value;

  let user = JSON.stringify({
    name: name,
    password: password,
    email: email
  });
  let request = new XMLHttpRequest();
  request.open("POST", "/registration-process", true);
  request.setRequestHeader("Content-Type", "application/json");
  request.addEventListener("load", async () => {
    const received_user = JSON.parse(request.response);
  });
  request.send(user);
});

function error(label, input) {
  label.style.color = "red";
  input.style.borderColor = "red";
}

function lockout_submit(button) {
  let old_value = button.value;

  button.setAttribute("disabled", true);
  button.value = "processing";

  setTimeout(function() {
    button.value = old_value;
    button.removeAttribute("disabled");
  }, 3000);
}
