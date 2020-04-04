document.getElementById("submit").addEventListener("click", (e) => {
    e.preventDefault();
    let registration = document.forms["reg-form"];
    let name = registration.elements["name"].value;
    let password = registration.elements["password"].value;
    let email = registration.elements["email"].value;

    let user = JSON.stringify({
        name: name,
        password: password,
        email: email,
    });
    let request = new XMLHttpRequest();
    request.open("POST", "/registration-process", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", async () => {
        const received_user = JSON.parse(request.response);
        alert(received_user);
    });
    request.send(user);
});

document.getElementById("sign_in_submit").addEventListener("click", (e) => {
    e.preventDefault();
    let registration = document.forms["log-form"];
    let name = registration.elements["name"].value;
    let password = registration.elements["password"].value;

    let user = JSON.stringify({
        name: name,
        password: password,
    });
    let request = new XMLHttpRequest();
    request.open("POST", "/req-page-progress", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", async () => {
        const received_user = JSON.parse(request.response);
        if (!received_user) {
            document.querySelector(".error_sign_in").style.display = "block";
        } else {
            window.location.href = window.location.href;
        }
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

    setTimeout(function () {
        button.value = old_value;
        button.removeAttribute("disabled");
    }, 3000);
}
