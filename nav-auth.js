// nav-auth.js — included on every page
// Makes the Account nav link smart:
//   - logged in  → goes to account.html
//   - logged out → goes to SignLog.html
document.addEventListener("DOMContentLoaded", () => {
  const link = document.getElementById("account-nav-link");
  if (!link) return;

  const isLoggedIn  = localStorage.getItem("isLoggedIn") === "true";
  const currentUser = localStorage.getItem("currentUser");

  if (!isLoggedIn || !currentUser) {
    link.href = "SignLog.html";
  } else {
    link.href = "account.html";
  }
});
