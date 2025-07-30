function getProfile() {
  return (
    JSON.parse(localStorage.getItem("profile")) || {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      password: "12345",
    }
  );
}
function saveProfile(p) {
  localStorage.setItem("profile", JSON.stringify(p));
}

function fillForm() {
  let p = getProfile();
  [
    "firstName",
    "lastName",
    "email",
    "address",
    "currentPassword",
    "newPassword",
    "confirmPassword",
  ].forEach((id) => {
    let el = document.getElementById(id);
    if (el) el.value = p[id] || "";
  });
  let w = document.getElementById("welcomeName");
  if (w) w.textContent = p.firstName + " " + p.lastName;
}

function showMsg(msg, ok) {
  let d = document.getElementById("profile-error");
  if (!d) {
    d = document.createElement("div");
    d.id = "profile-error";
    d.style.margin = "10px 0";
    document
      .querySelector(".profile-edit-form")
      .insertBefore(d, document.getElementById("profile-form"));
  }
  d.textContent = msg;
  d.style.color = ok ? "green" : "red";
}

function handleSave(e) {
  e.preventDefault();
  let p = getProfile(),
    f = (n) => document.getElementById(n).value.trim();
  let c = f("currentPassword"),
    n = f("newPassword"),
    cf = f("confirmPassword");
  if (c || n || cf) {
    if (c !== p.password) return showMsg("Parolni to'g'ri yozing!");
    if (n !== cf) return showMsg("Yangi parol va tasdiqlash paroli mos emas!");
    if (n.length < 4)
      return showMsg("Yangi parol kamida 4 ta belgidan iborat bo‘lishi kerak!");
    p.password = n;
  }
  p.firstName = f("firstName");
  p.lastName = f("lastName");
  p.email = f("email");
  p.address = f("address");
  saveProfile(p);
  showMsg("O'zgarishlar saqlandi!", 1);
  fillForm();
}
function handleCancel(e) {
  e.preventDefault();
  fillForm();
  showMsg("");
}

document.addEventListener("DOMContentLoaded", function () {
  fillForm();
  document.getElementById("saveBtn").onclick = handleSave;
  document.getElementById("cancelBtn").onclick = handleCancel;
});
