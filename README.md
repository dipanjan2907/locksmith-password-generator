🔐 Locksmith — Password & PIN Generator

Locksmith is a sleek and powerful password and PIN generator built using HTML, CSS, and JavaScript.
It allows you to create strong, secure, and random passwords or numeric PINs in seconds — no external libraries needed. This version uses cryptographically secure randomness to ensure maximum security.
Deployed at https://dipanjan2907.github.io/locksmith-password-generator/

🧠 Features

Smooth animated gradient background for a modern, premium feel

✅ Generate strong, customizable passwords

🔢 Generate secure numeric PINs

🧩 Choose character sets: uppercase, lowercase, numbers, symbols

🧠 Special “Smart Type” mode: generates balanced passwords with guaranteed character diversity

🔒 Uses cryptographically secure random number generation (crypto.getRandomValues)

🎲 Uses secure Fisher–Yates shuffle for unbiased password randomness

📋 One-click copy to clipboard for passwords and PINs

🎨 Beautiful gradient UI with hover effects

⚙️ Tech Stack

HTML5 — Structure

CSS3 — Styling & Animations

JavaScript (Vanilla) — Core Logic with cryptographically secure random functions

🖥️ How to Run

Clone this repository:

git clone https://github.com/dipanjan2907/locksmith-password-generator.git
cd locksmith-password-generator

Open index.html in your favorite browser.

🔍 How It Works

Character Sets
You can select uppercase, lowercase, numbers, and symbols for password generation.

Modes

Checkbox Mode: Choose which character sets to include; guarantees at least one character from each selected set.

Special Type Mode: Automatically generates a balanced password using uppercase, lowercase, symbols, and numbers for strong security.

Cryptographically Secure Randomness

Uses crypto.getRandomValues() for generating secure random numbers instead of Math.random().

Each character and PIN digit is selected securely, ensuring unpredictability.

Fisher–Yates Shuffle

Shuffles generated passwords securely to avoid any predictable patterns.

Ensures each permutation is equally likely.

📋 Copy to Clipboard

Simply click the “Copy” button next to the generated password or PIN.

Secure and easy for quick use.

🛠️ Contribution

Contributions are welcome!

Fork the repository

Create a new branch (git checkout -b feature/YourFeature)

Make improvements

Submit a Pull Request

Any improvements to the UI, new password generation features, or optimizations are highly appreciated.

⚖️ Security Note

This tool is secure for personal use, as it uses OS-level cryptography for generating passwords and PINs.
However, always ensure your environment is secure when using generated passwords.
