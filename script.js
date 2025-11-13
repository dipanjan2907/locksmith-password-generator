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

  // Switch to special mode
  radiobtn.addEventListener("click", (event) => {
    if (event.target.checked) {
      checkboxes.forEach((cb) => (cb.checked = false));
      mode = "special";
    }
  });

  // Switch to checkbox mode
  checkboxes.forEach((cb) => {
    cb.addEventListener("click", () => {
      radiobtn.checked = false;
      mode = "checkbox";
    });
  });

  // Password Generation Logic
  btn1.addEventListener("click", () => {
    let password = "";
    // pass.placeholder = "";
    copyBtn1.innerText = "Copy";
    let length = Number(passLength.value);

    if (mode === "checkbox") {
      if (length > 1) {
        let chars = "";
        const selectedSets = [];

        checkboxes.forEach((cb) => {
          if (cb.checked) {
            chars += charSets[cb.value];
            selectedSets.push(charSets[cb.value]);
          }
        });

        if (!chars) {
          alert("Please select at least one option!");
          return;
        }

        // guarantee at least one char from each selected set
        selectedSets.forEach((set) => {
          password += set[Math.floor(Math.random() * set.length)];
        });

        while (password.length < length) {
          const randomSet =
            selectedSets[Math.floor(Math.random() * selectedSets.length)];
          password += randomSet[Math.floor(Math.random() * randomSet.length)];
        }

        // Shuffle
        password = password
          .split("")
          .sort(() => 0.5 - Math.random())
          .join("");

        pass.classList.add("placeholder-black");
        btn1.innerText = "Regenerate";
        pass.placeholder = password;
      } else alert("Password Length must not be less than 2");
    } else if (mode === "special") {
      if (length >= 6) {
        function randChar(set) {
          return set[Math.floor(Math.random() * set.length)];
        }
        password += randChar(charSets.uppercase);
        password += randChar(charSets.lowercase);
        for (let i = 0; i < length / 2 - 2; i++) {
          const set =
            Math.random() < 0.5 ? charSets.uppercase : charSets.lowercase;
          password += randChar(set);
        }
        password += randChar(charSets.symbols);
        for (let i = password.length; i < length; i++) {
          password += randChar(charSets.numbers);
        }
        if (password.length < length) password += randChar(charSets.symbols);

        pass.classList.add("placeholder-black");
        btn1.innerText = "Regenerate";
        pass.placeholder = password;
      } else alert("Password Length must not be less than 6");
    } else {
      alert("Please select a mode (checkboxes or Special Type)");
    }
  });

  // Copy for password
  copyBtn1.addEventListener("click", () => {
    if (pass.placeholder !== "Generated Password Here") {
      navigator.clipboard
        .writeText(pass.placeholder)
        .then(() => (copyBtn1.innerText = "Copied!"))
        .catch((err) => console.error("Copy failed: ", err));
    } else alert("Nothing to copy!");
  });

  // PIN GENERATION
  btn2.addEventListener("click", () => {
    copyBtn2.innerText = "Copy";
    let l = Number(pinLengthInput.value);
    if (l > 1) {
      btn2.innerText = "Regenerate";
      let tpin = "";
      for (let i = 0; i < l; i++) {
        const randomDigit = Math.floor(Math.random() * 9) + 1;
        tpin += randomDigit;
      }
      tpin = Number(tpin);
      pin.placeholder = tpin;
      pin.classList.add("placeholder-black");
    } else alert("PIN Length must not be less than 2");
  });
  copyBtn2.addEventListener("click", () => {
    if (pin.placeholder > 0) {
      navigator.clipboard
        .writeText(pin.placeholder) // directly copy the value
        .then(() => {
          copyBtn2.innerText = "Copied!";
        })
        .catch((err) => {
          console.error("Copy failed: ", err);
        });
    } else alert("Nothing to copy!");
  });
});
