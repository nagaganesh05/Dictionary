const username1 = document.getElementById("name");
const pwd = document.getElementById("pass")
const login = document.getElementById("submit")
const form = document.getElementById("form")
form.addEventListener("submit", (e) => {
  e.preventDefault();
  async function fetchget() {
    let users = await fetch("http://localhost:3000/users")
    let get = await users.json()
    for (i of get) {
      const name = i.username
      const pass = i.password
      if (name.toLowerCase() == username1.value.toLowerCase() && pass == pwd.value) {
        alert("Login Successful")
        location.href = "index.html";
        break;
      } else {
        alert("Invalid username or password")
        break;
      }
    }
  }
  fetchget()
})