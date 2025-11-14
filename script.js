document.addEventListener("DOMContentLoaded", () => {
  const pass = document.querySelector(".inp1");
  const passLength = document.querySelector(".inp2");
  const copyBtn1 = document.querySelector("#c1");
  const btn1 = document.querySelector(".btn1");
  const btn2 = document.querySelector(".btn2");
  const pin = document.querySelector(".inp4");
  const pinLengthInput = document.querySelector(".inp5");
  const copyBtn2 = document.querySelector("#c2");
  const checkboxes = document.querySelectorAll(".opt");
  const radiobtn = document.getElementById("spctyp");

  let mode = ""; // "checkbox" or "special"

  const charSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "123456789",
    symbols: "!@#$&",
  };

  /* ------------------------------------------------------------
          CRYPTO FUNCTIONS
    ------------------------------------------------------------ */

  function cryptoRandomIndex(max) {
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    return arr[0] % max;
  }

  function cryptoRandChar(set) {
    return set[cryptoRandomIndex(set.length)];
  }

  function cryptoShuffle(str) {
    let arr = [...str];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = cryptoRandomIndex(i + 1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join("");
  }

  /* ------------------------------------------------------------
      MODE SWITCHING
    ------------------------------------------------------------ */

  radiobtn.addEventListener("click", () => {
    if (radiobtn.checked) {
      checkboxes.forEach((cb) => (cb.checked = false));
      mode = "special";
    }
  });

  checkboxes.forEach((cb) => {
    cb.addEventListener("click", () => {
      radiobtn.checked = false;
      mode = "checkbox";
    });
  });

  /* ------------------------------------------------------------
       PASSWORD GENERATION (CHECKBOX MODE)
    ------------------------------------------------------------ */
  function generateCheckboxPassword(length) {
    const selectedSets = [];

    checkboxes.forEach((cb) => {
      if (cb.checked) selectedSets.push(charSets[cb.value]);
    });

    if (selectedSets.length === 0) {
      alert("Pick at least one option!");
      return null;
    }

    // Guarantee at least one from each chosen set
    let password = selectedSets.map((set) => cryptoRandChar(set)).join("");

    // Fill remaining length
    while (password.length < length) {
      const randomSet = selectedSets[cryptoRandomIndex(selectedSets.length)];
      password += cryptoRandChar(randomSet);
    }

    return cryptoShuffle(password);
  }

  /* ------------------------------------------------------------
       PASSWORD GENERATION (SPECIAL MODE)
    ------------------------------------------------------------ */

  function generateSpecialPassword(length) {
    if (length < 6) {
      alert("Special type needs at least length 6");
      return null;
    }

    let password = "";

    password += cryptoRandChar(charSets.uppercase);
    password += cryptoRandChar(charSets.lowercase);

    for (let i = 0; i < length / 2 - 2; i++) {
      const set = Math.random() < 0.5 ? charSets.uppercase : charSets.lowercase;
      password += cryptoRandChar(set);
    }

    password += cryptoRandChar(charSets.symbols);

    while (password.length < length) {
      password += cryptoRandChar(charSets.numbers);
    }

    return cryptoShuffle(password);
  }

  /* ------------------------------------------------------------
       GENERATE PASSWORD BUTTON
    ------------------------------------------------------------ */

  btn1.addEventListener("click", () => {
    copyBtn1.innerText = "Copy";
    const length = Number(passLength.value);
    let password = null;

    if (mode === "checkbox") {
      if (length < 2) return alert("Password length ≥ 2");
      password = generateCheckboxPassword(length);
    } else if (mode === "special") {
      password = generateSpecialPassword(length);
    } else {
      return alert("Choose a mode (Checkbox or Special)");
    }

    if (password) {
      pass.placeholder = password;
      pass.classList.add("placeholder-black");
      btn1.innerText = "Regenerate";
    }
  });

  /* ------------------------------------------------------------
       COPY PASSWORD
    ------------------------------------------------------------ */

  copyBtn1.addEventListener("click", () => {
    if (pass.placeholder === "Generated Password Here") {
      return alert("Nothing to copy!");
    }

    navigator.clipboard
      .writeText(pass.placeholder)
      .then(() => (copyBtn1.innerText = "Copied!"))
      .catch((err) => console.error("Copy failed: ", err));
  });

  /* ------------------------------------------------------------
       PIN GENERATION
    ------------------------------------------------------------ */

  btn2.addEventListener("click", () => {
    copyBtn2.innerText = "Copy";

    const length = Number(pinLengthInput.value);
    if (length < 2) return alert("PIN length ≥ 2");

    let pinValue = "";
    for (let i = 0; i < length; i++) {
      pinValue += cryptoRandomIndex(9) + 1; // 1-9
    }

    pin.placeholder = pinValue;
    pin.classList.add("placeholder-black");
    btn2.innerText = "Regenerate";
  });

  /* ------------------------------------------------------------
       COPY PIN
    ------------------------------------------------------------ */

  copyBtn2.addEventListener("click", () => {
    if (!pin.placeholder || pin.placeholder === "0") {
      return alert("Nothing to copy!");
    }

    navigator.clipboard
      .writeText(pin.placeholder)
      .then(() => (copyBtn2.innerText = "Copied!"))
      .catch((err) => console.error("Copy failed: ", err));
  });
});
