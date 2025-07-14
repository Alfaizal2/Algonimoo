// SIGNUP FORM
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("signupUsername").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;

    let users = JSON.parse(localStorage.getItem("algonimoUsers")) || [];

    const userExists = users.some(user => user.username === username);
    if (userExists) {
      alert("Username already exists. Try a different one.");
      return;
    }

    users.push({ username, email, password });
    localStorage.setItem("algonimoUsers", JSON.stringify(users));
    alert("Signup successful! You can now login.");
    window.location.href = "login.html";
  });
}

// LOGIN FORM
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;

    const users = JSON.parse(localStorage.getItem("algonimoUsers")) || [];

    const validUser = users.find(user => user.username === username && user.password === password);

    if (validUser) {
      localStorage.setItem("loggedInUser", username);
      window.location.href = "algonimo .html";
    } else {
      alert("Invalid credentials. Please try again.");
    }
  });
}