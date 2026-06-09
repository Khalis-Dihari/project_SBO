const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(e) {

        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        const message = document.getElementById("message");

        // Username dan password contoh
        const validUsername = "admin";
        const validPassword = "123456";

        if (
            username === validUsername &&
            password === validPassword
        ) {

            localStorage.setItem("isLoggedIn", "true");

            message.textContent = "Login berhasil!";
            message.className = "success";

            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1000);

        } else {

            message.textContent =
                "Username atau password salah!";

            message.className = "error";
        }

    });

}