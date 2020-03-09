document.getElementById("submit").addEventListener("click", (e) => {
    e.preventDefault();
    let name_label = document.getElementById("name_label");
    let password_label = document.getElementById("password_label");
    let visible_text = document.getElementById("error");
    let registration = document.forms["reg-form"];
    let name = registration.elements["name"].value;
    let password = registration.elements["password"].value;
    let email = registration.elements["email"].value;
    let password_reenter = registration.elements["password_reenter"].value;
    if (name === "" || password === "") {
        visible_text.innerHTML = "u have empty fields"
        visible_text.style.height = "30px";
    } else {
        visible_text.style.height = "0px";
        if (name.length < 3) {
            name_label.innerHTML =
                "user name cannot be shorter than three characters"
        }
        if (password.length < 6) {
            password_label.innerHTML = "password cannot be shorter than six characters"
        } else if ((password_reenter != password)) {
            visible_text.innerHTML = "э бля"
            visible_text.style.height = "30px";
        } else {
            visible_text.style.height = "0px";
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
                received_user = (received_user === "true");
                if (!Boolean(received_user)) {
                    window.location.href = "/login";
                } else {
                    visible_text.innerHTML = "this user exists"
                    visible_text.style.height = "30px";
                }

            });
            request.send(user);
        }
    }


})

function lockoutSubmit(button) {
    var oldValue = button.value;

    button.setAttribute('disabled', true);
    button.value = 'Processing';

    setTimeout(function () {
        button.value = oldValue;
        button.removeAttribute('disabled');
    }, 3000)
}