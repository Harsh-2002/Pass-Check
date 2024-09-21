# Password Strength Calculator

## Introduction
This project is a Password Strength Calculator that helps users create strong and secure passwords. It's a web-based tool that checks how strong your password is and gives you tips to make it better.

## How It Works
Our Password Strength Calculator uses a clever system to figure out how strong your password is. Here's how it does it:

1. **Pattern Detection**: First, it checks if your password has any common patterns that hackers can easily guess. Things like:
   - Simple number sequences (like "123456")
   - Keyboard patterns (like "qwerty")
   - Common words (like "password" or "admin")
   - Repeated characters
   - Years or dates

2. **Entropy Calculation**: If your password doesn't have common patterns, it then calculates something called "entropy". Entropy is a fancy way of saying how random and unpredictable your password is. The more random, the better!

3. **Crack Time Estimation**: Using the entropy, the tool estimates how long it might take a computer to crack your password. This ranges from "very quickly" to "more than a quadrillion years"!

4. **Strength Rating**: Based on the estimated crack time, your password gets a strength rating. This is shown as a percentage and a color (red for weak, orange for medium, and green for strong).

## Special Features
- **Password Generator**: Don't want to think of a password? No worries! You can use the "Generate Password" button to create a strong password for you.
- **Copy to Clipboard**: Easy copying of your password with just one click.
- **Show/Hide Password**: You can toggle between showing and hiding your password as you type.

## The Code Behind It All
Our project uses HTML, CSS, and JavaScript to create a smooth and interactive experience. Here's a breakdown:

- **HTML (index.html)**: This is the structure of our webpage. It sets up all the elements you see, like input fields and buttons.
- **CSS (styles.css)**: This makes everything look nice! It handles colors, layout, and even makes sure the page looks good on mobile phones.
- **JavaScript (script.js)**: This is where the magic happens! It contains all the logic for checking password strength, generating passwords, and updating the page.

## Thought Process
When building this tool, we wanted to create something that's not just useful, but also educational. Here's what we focused on:

1. **User-Friendly**: We made sure the tool is easy to use for everyone, even if you're not a tech expert.
2. **Real-Time Feedback**: As you type your password, you get instant feedback on its strength.
3. **Educational**: We don't just tell you if your password is weak or strong; we explain why and give tips to improve it.
4. **Security-Focused**: All the password checking happens right in your browser. We never send your password over the internet.
5. **Adaptable**: The dark mode and mobile-friendly design make sure you can use this tool comfortably anywhere, anytime.

## How to Use
1. Open the page `https://passcheck.arson.me/` in your web browser.
2. Type a password in the input field or use the "Generate Password" button.
3. See the strength of your password instantly!
4. Use the tips provided to make your password even stronger.

## For Developers
If you're a developer and want to understand or improve the code:
- The main logic is in `script.js`. Look at functions like `isCommonPattern()`, `calculateEntropy()`, and `updateStrength()` to see how we check password strength.
- The `styles.css` file uses CSS variables, making it easy to change colors and adapt the design.
- We've used modern JavaScript features, so make sure you're using an up-to-date browser or build tool.

## Conclusion
We hope this Password Strength Calculator helps you create stronger, safer passwords. Remember, in today's digital world, a strong password is your first line of defense against hackers. Stay safe out there!

Feel free to contribute to this project or suggest improvements. Together, we can make the internet a safer place, one strong password at a time!
