document.getElementById("submit").addEventListener("click", (e) => {
    e.preventDefault();
    let name_label = document.getElementById("name_label");
    let password_label = document.getElementById("password_label");
    let visible_text = document.getElementById("error");
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
    request.addEventListener("load", () => {
        let received_user = request.response;
        if(!received_user.name && !received_user.email) {
            window.location.href = "/login";
        }
        alert(received_user);
    });
    request.send(user);

})

function lockout_submit(button) {
    var oldValue = button.value;

    button.setAttribute('disabled', true);
    button.value = 'processing';

    setTimeout(function () {
        button.value = oldValue;
        button.removeAttribute('disabled');
    }, 3000)
}