// ---------- Shared: runs on whichever page loads this file ----------
const STORAGE_KEY = "playerName";

// ---------- PAGE 1: name form ----------
const form  = document.getElementById("nameForm");
const input = document.getElementById("nameInput");
const error = document.getElementById("error");

if (form) {
  const LETTERS_ONLY = /^[A-Za-z ]+$/;          // A-Z, a-z and spaces
  const INVALID_CHARS = /[^A-Za-z ]/g;

  function showError(message) {
    error.textContent = message;
    input.classList.remove("invalid");
    void input.offsetWidth;                      // restart the shake animation
    input.classList.add("invalid");
  }

  function clearError() {
    error.textContent = "";
    input.classList.remove("invalid");
  }

  // Block bad characters as the user types or pastes
  input.addEventListener("beforeinput", (e) => {
    if (e.data && INVALID_CHARS.test(e.data)) {
      e.preventDefault();
      showError("Please use letters only (A-Z).");
    }
    INVALID_CHARS.lastIndex = 0;
  });

  // Safety net: strip anything that still gets through
  input.addEventListener("input", () => {
    const cleaned = input.value.replace(INVALID_CHARS, "");
    if (cleaned !== input.value) {
      input.value = cleaned;
      showError("Please use letters only (A-Z).");
    } else {
      clearError();
    }
  });

  // ENTER button / Enter key
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = input.value.trim().replace(/\s+/g, " ");

    if (name === "") {
      showError("Please enter your name.");
      return;
    }
    if (!LETTERS_ONLY.test(name)) {
      showError("Please use letters only (A-Z).");
      return;
    }

    sessionStorage.setItem(STORAGE_KEY, name);   // remembered until the tab closes
    window.location.href = "page2.html";
  });
}

// ---------- PAGE 2: show the stored name ----------
const playerName = document.getElementById("playerName");

if (playerName) {
  const saved = sessionStorage.getItem(STORAGE_KEY);
  if (saved) {
    playerName.textContent = "Player: " + saved;
    playerName.hidden = false;
  }
}
