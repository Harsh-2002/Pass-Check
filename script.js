function setTheme() {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.classList.toggle('dark-mode', isDarkMode);
    themeToggle.querySelector('i').classList.toggle('fa-moon', !isDarkMode);
    themeToggle.querySelector('i').classList.toggle('fa-sun', isDarkMode);
}

window.matchMedia('(prefers-color-scheme: dark)').addListener(setTheme);

const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const result = document.getElementById('result');
const suggestions = document.getElementById('suggestions');
const generatePasswordBtn = document.getElementById('generatePassword');
const copyPasswordBtn = document.getElementById('copyPassword');
const strengthPercentage = document.getElementById('strengthPercentage');
const mainHeading = document.getElementById('mainHeading');
const passwordLabel = document.getElementById('passwordLabel');

function isCommonPattern(pwd) {
    const lowerPwd = pwd.toLowerCase();
    if (/0123|1234|2345|3456|4567|5678|6789|7890|abcd|bcde|cdef|defg|efgh|fghi|ghij|hijk|ijkl|jklm|klmn|lmno|mnop|nopq|opqr|pqrs|qrst|rstu|stuv|tuvw|uvwx|vwxy|wxyz/.test(lowerPwd)) return true;
    if (/(.)\1{2,}/.test(lowerPwd)) return true;
    if (/qwerty|asdfgh|zxcvbn/.test(lowerPwd)) return true;
    const commonWords = ['password', 'letmein', 'admin', 'welcome', 'login', 'master', 'hello', 'monkey', 'dragon', 'baseball', 'football', 'secret', 'qwerty', 'abc123'];
    if (commonWords.some(word => lowerPwd.includes(word))) return true;
    if (/[a-z]{3,}\d{4}/.test(lowerPwd)) return true;
    if (/19\d{2}|20\d{2}/.test(pwd)) return true;
    if (/\d{2}[-/]\d{2}[-/]\d{2,4}/.test(pwd)) return true;
    // {{ edit_1 }}
    // Add more common sequential patterns
    if (/9876|8765|7654|6543|5432|4321|3210/.test(lowerPwd)) return true;

    // Add keyboard patterns
    if (/qaz|wsx|edc|rfv|tgb|yhn|ujm|ik,|ol./.test(lowerPwd)) return true;

    // Add leet speak variations of common words
    const leetCommonWords = ['p@ssw0rd', 'l3tm31n', 'adm1n', 'w3lc0me', 'l0g1n', 'm@st3r', 'h3ll0', 'm0nk3y', 'dr@g0n', 'b@s3b@ll', 'f00tball', 's3cr3t', 'qw3rty', '@bc123'];
    if (leetCommonWords.some(word => lowerPwd.includes(word))) return true;
    // {{ edit_1 }}

    return false;
}

function calculateEntropy(pwd) {
    let charset = 0;
    if (/[a-z]/.test(pwd)) charset += 26;
    if (/[A-Z]/.test(pwd)) charset += 26;
    if (/[0-9]/.test(pwd)) charset += 10;
    if (/[^a-zA-Z0-9]/.test(pwd)) charset += 33;
    return Math.log2(Math.pow(charset, pwd.length));
}

function formatTime(years) {
    if (years < 1) {
        const days = years * 365;
        if (days < 1) {
            const hours = days * 24;
            if (hours < 1) {
                const minutes = hours * 60;
                if (minutes < 1) {
                    const seconds = minutes * 60;
                    return `${seconds.toFixed(2)} seconds`;
                }
                return `${minutes.toFixed(2)} minutes`;
            }
            return `${hours.toFixed(2)} hours`;
        }
        return `${days.toFixed(2)} days`;
    }
    if (years < 1000) {
        return `${years.toFixed(2)} years`;
    }
    if (years < 1e6) {
        return `${(years / 1000).toFixed(2)} thousand years`;
    }
    if (years < 1e9) {
        return `${(years / 1e6).toFixed(2)} million years`;
    }
    if (years < 1e12) {
        return `${(years / 1e9).toFixed(2)} billion years`;
    }
    if (years < 1e15) {
        return `${(years / 1e12).toFixed(2)} trillion years`;
    }
    return "more than a quadrillion years";
}

function calculateCrackTime(pwd) {
    if (isCommonPattern(pwd)) {
        return "Very quickly (common pattern detected)";
    }
    const entropy = calculateEntropy(pwd);
    const attemptsPerSecond = 1000000000;
    const seconds = Math.pow(2, entropy) / attemptsPerSecond;
    const years = seconds / 31536000;
    return formatTime(years);
}

function getStrengthColor(crackTime) {
    if (crackTime.includes("quickly")) return "var(--meter-weak)";
    if (crackTime.includes("seconds") || crackTime.includes("minutes")) return "var(--meter-medium)";
    if (crackTime.includes("hours") || crackTime.includes("days")) return "var(--meter-moderate)";
    return "var(--meter-strong)";
}

function updateUI() {
    mainHeading.textContent = "Password Strength Calculator";
    passwordLabel.textContent = "Enter Password:";
    generatePasswordBtn.textContent = "Generate Password";
    copyPasswordBtn.textContent = "Copy Password";
}

function generateStrongPassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    let password = '';
    for (let i = 0; i < 16; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    passwordInput.value = password;
    passwordInput.setAttribute('type', 'text');
    togglePasswordBtn.innerHTML = '<i class="fas fa-eye-slash"></i>';
    updateStrength();
}

function copyToClipboard() {
    passwordInput.select();
    document.execCommand('copy');
    alert('Password copied to clipboard!');
}

function updateStrength() {
    const pwd = passwordInput.value;
    if (pwd.length === 0) {
        strengthPercentage.textContent = 'Strength: 0%';
        strengthPercentage.style.color = '#666';
        result.textContent = 'Enter a password to check its strength';
        result.style.color = '#666';
        suggestions.textContent = '';
        return;
    }

    const crackTime = calculateCrackTime(pwd);
    const color = getStrengthColor(crackTime);
    
    result.textContent = `Estimated time to crack: ${crackTime}`;
    result.style.color = color;
    
    let strength = 0;
    if (crackTime.includes("quadrillion") || crackTime.includes("trillion")) strength = 100;
    else if (crackTime.includes("billion") || crackTime.includes("million")) strength = 90;
    else if (crackTime.includes("thousand")) strength = 80;
    else if (crackTime.includes("years")) strength = 70;
    else if (crackTime.includes("days")) strength = 50;
    else if (crackTime.includes("hours")) strength = 30;
    else if (crackTime.includes("minutes")) strength = 20;
    else strength = 10;
    
    strengthPercentage.textContent = `Strength: ${strength}%`;
    strengthPercentage.style.color = color;

    let suggestionText = "Use a mix of uppercase, lowercase, numbers, and special characters. Aim for at least 12 characters.";
    suggestions.textContent = suggestionText;
}

generatePasswordBtn.addEventListener('click', generateStrongPassword);
copyPasswordBtn.addEventListener('click', copyToClipboard);

passwordInput.addEventListener('input', updateStrength);

function togglePasswordVisibility() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePasswordBtn.querySelector('i').classList.toggle('fa-eye');
    togglePasswordBtn.querySelector('i').classList.toggle('fa-eye-slash');
}

togglePasswordBtn.addEventListener('click', togglePasswordVisibility);

const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.querySelector('i').classList.toggle('fa-moon');
    themeToggle.querySelector('i').classList.toggle('fa-sun');
});

updateUI();
updateStrength();

setTheme();