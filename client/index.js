const baseURL = "http://localhost:4000";

function register() {
  const emailVal = document.getElementById("email").value;
  const passwordVal = document.getElementById("password").value;
  const confirmPasswordVal = document.getElementById("confirm-password").value;

  if (passwordVal !== confirmPasswordVal) {
    alert("Your passwords do not match!");
    return;
  }

  const payload = {
    email: emailVal,
    password: passwordVal,
  };

  axios
    .post(`${baseURL}/api/users`, payload)
    .then((res) => {
      console.log(res)
      window.location = `/client/posts.html?userID=${res.data.id}`;
    })
    .catch((err) => console.log(err));
}

const registerButton = document.querySelector("#register-button");
registerButton.addEventListener("click", register);
