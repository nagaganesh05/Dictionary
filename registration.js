const form = document.querySelector("form");
const name = document.getElementById("name");
const pwd = document.getElementById("pass");
const email = document.getElementById("email")
const cnfrmpwd = document.getElementById("pass1");
const submit = document.getElementById("submit");
const msg1 = document.getElementById("msg")



form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (pwd.value !== cnfrmpwd.value) {
        msg1.textContent = "Passwords do not match.";
    } else {
        async function fetchpost() {
            let users = await fetch("http://localhost:3000/users", {
                method: "POST",
                "Content=type": "application/json",
                body: JSON.stringify({ username: name.value, password: pwd.value, email: email.value })
            })
            let get = await users.json()

        }
        alert("Register Successful")
        location.href = "login.html"
        fetchpost()

    }
});