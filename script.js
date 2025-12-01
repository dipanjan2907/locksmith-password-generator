document.addEventListener("DOMContentLoaded", () => {
  // Selectors
  const pass = document.querySelector("#passgen .result-display");
  const passLength = document.querySelector("#passgen .length-slider");
  const passLengthDisplay = document.getElementById("pass-length-val");
  const copyBtn1 = document.querySelector("#c1");
  const btn1 = document.querySelector(".btn1");

  const pin = document.querySelector("#pingen .result-display");
  const pinLength = document.querySelector("#pingen .length-slider");
  const pinLengthDisplay = document.getElementById("pin-length-val");
  const btn2 = document.querySelector(".btn2");
  const copyBtn2 = document.querySelector("#c2");

  const checkboxes = document.querySelectorAll(".opt");

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
       PASSWORD GENERATION
    ------------------------------------------------------------ */
  function generatePassword(length) {
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
       GENERATE PASSWORD BUTTON
    ------------------------------------------------------------ */

  btn1.addEventListener("click", () => {
    copyBtn1.innerHTML = '<i class="far fa-copy"></i>'; // Reset icon
    const length = Number(passLength.value);

    if (length < 2) return alert("Password length ≥ 2");

    const password = generatePassword(length);

    if (password) {
      pass.value = password; // Use value instead of placeholder for better UX
      // pass.placeholder = password; // Fallback if we want to keep placeholder style
      // But value is better for copying.
      // Let's stick to value.
      btn1.innerText = "Regenerate Password";
    }
  });

  // Update length display
  passLength.addEventListener("input", () => {
    passLengthDisplay.innerText = passLength.value;
  });

  /* ------------------------------------------------------------
       COPY PASSWORD
    ------------------------------------------------------------ */

  copyBtn1.addEventListener("click", () => {
    if (!pass.value && pass.placeholder === "Generated Password") {
      return alert("Nothing to copy!");
    }

    const textToCopy = pass.value || pass.placeholder;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        copyBtn1.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
          copyBtn1.innerHTML = '<i class="far fa-copy"></i>';
        }, 2000);
      })
      .catch((err) => console.error("Copy failed: ", err));
  });

  /* ------------------------------------------------------------
       PIN GENERATION
    ------------------------------------------------------------ */

  btn2.addEventListener("click", () => {
    copyBtn2.innerHTML = '<i class="far fa-copy"></i>';
    const length = Number(pinLength.value);
    if (length < 2) return alert("PIN length ≥ 2");

    let pinValue = "";
    for (let i = 0; i < length; i++) {
      pinValue += cryptoRandomIndex(9) + 1; // 1-9
    }

    pin.value = pinValue;
    btn2.innerText = "Regenerate PIN";
  });

  // Update PIN length display
  pinLength.addEventListener("input", () => {
    pinLengthDisplay.innerText = pinLength.value;
  });

  /* ------------------------------------------------------------
       COPY PIN
    ------------------------------------------------------------ */

  copyBtn2.addEventListener("click", () => {
    if (!pin.value && pin.placeholder === "Generated PIN") {
      return alert("Nothing to copy!");
    }

    const textToCopy = pin.value || pin.placeholder;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        copyBtn2.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
          copyBtn2.innerHTML = '<i class="far fa-copy"></i>';
        }, 2000);
      })
      .catch((err) => console.error("Copy failed: ", err));
  });
});
