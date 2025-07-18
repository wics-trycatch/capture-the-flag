// Flag data with first two flags removed
const flagData = [
    {
        flagNum: 1,
        pageId: "flag1",
        question: "What is WiCS's first goal?",
        answer: "promote",
        hint: "SFU WiCS has a website!",
        type: "normal"
    },
    {
        flagNum: 2,
        pageId: "promote",
        question: "Who was the last SFU WiCS Mentor Lunch with?",
        answer: "hazra",
        hint: "We post all our events on @sfuwics on instagram.",
        type: "normal"
    },
    {
        flagNum: 3,
        pageId: "hazra",
        question: "The last name of the first computer programmer.",
        answer: "lovelace",
        hint: "She is a female!",
        type: "normal"
    },
    {
        flagNum: 4,
        pageId: "lovelace",
        question: "What are these examples of: int c, string s, bool t",
        answer: "variables",
        hint: "Another word for elements!",
        type: "normal"
    },
    {
        flagNum: 5,
        pageId: "variables",
        question: "Find the colour for this text",
        answer: "546671",
        hint: "Right click on the text and click on \"Inspect\" menu item. Don't include the #",
        type: "normal"
    },
    {
        flagNum: 6,
        pageId: "546671",
        question: "What does try/CATCH represent?",
        answer: "Computing and Technology Conference for Her",
        hint: "The answer may be on a website linked on this page",
        type: "normal"
    },
    {
        flagNum: 7,
        pageId: "Computing and Technology Conference for Her",
        question: "There's another number system: 61 73 63 69 69",
        answer: "ascii",
        hint: "Whereas binary is base 2, this system is base 16",
        type: "normal"
    },
    {
        flagNum: 8,
        pageId: "ascii",
        question: "ASCII is a very common character encoding that makes it easier for reading text over the Internet. What is the ASCII decimal value for ampersand?",
        answer: "38",
        hint: "There are ASCII tables online that shows the conversion",
        type: "normal"
    },
    {
        flagNum: 9,
        pageId: "38",
        question: "Consider the following array, char str[] = \"Women in Computing Science\"; What is the value of str[17]?",
        answer: "g",
        hint: "The first index of an array actually starts at 0 instead of 1",
        type: "normal"
    },
    {
        flagNum: 10,
        pageId: "g",
        question: "String str = \"there are lots of fun things you can do with strings!\"; str = str.substring(10,21);",
        answer: "lots of fun",
        hint: "Google how substring works in Java, and take a look at the other functions that you can do with strings!",
        type: "last page"
    }
];

let currentFlagIndex = 0;
let winners = [];

// Initialize the game
function startGame() {
    document.getElementById('launchPage').classList.add('hidden');
    showFlag(0);
}

// Show a specific flag
function showFlag(index) {
    currentFlagIndex = index;
    const flag = flagData[index];
    
    document.getElementById('flagTitle').textContent = `Flag ${flag.flagNum}`;
    document.getElementById('flagProgress').textContent = `${flag.flagNum}/${flagData.length}`;
    document.getElementById('flagQuestion').textContent = flag.question;
    document.getElementById('flagHint').textContent = flag.hint;
    document.getElementById('answerInput').value = '';
    document.getElementById('currentUrl').textContent = `?page=flag&pageId=${flag.pageId}`;
    
    // Special styling for flag 5 (color inspection) - adjusted index due to removed flags
    const questionElement = document.getElementById('flagQuestion');
    if (flag.flagNum === 5) {
        questionElement.classList.add('special-color');
    } else {
        questionElement.classList.remove('special-color');
    }
    
    // Hide hint initially
    document.getElementById('flagHint').style.display = 'none';
    
    // Show flag page
    document.getElementById('flagPage').classList.add('active');
    document.getElementById('errorPage').classList.remove('active');
    document.getElementById('finishPage').classList.remove('active');
    
    // Set page title
    document.title = `Flag ${flag.flagNum}`;
    
    // Focus on input
    setTimeout(() => {
        document.getElementById('answerInput').focus();
    }, 100);
}

// Show hint
function showHint() {
    document.getElementById('flagHint').style.display = 'block';
}

// Check the user's answer
function checkAnswer() {
    const userAnswer = document.getElementById('answerInput').value.toLowerCase().trim();
    const correctAnswer = flagData[currentFlagIndex].answer.toLowerCase();
    
    if (userAnswer === correctAnswer) {
        // Correct answer
        if (currentFlagIndex < flagData.length - 1) {
            // More flags to go
            showFlag(currentFlagIndex + 1);
        } else {
            // Last flag completed
            showFinishPage();
        }
    } else {
        // Wrong answer
        showErrorPage();
    }
}

// Show error page
function showErrorPage() {
    document.getElementById('flagPage').classList.remove('active');
    document.getElementById('errorPage').classList.add('active');
    document.title = 'Oops!';
}

// Go back to current flag
function goBackToFlag() {
    document.getElementById('errorPage').classList.remove('active');
    document.getElementById('flagPage').classList.add('active');
    document.getElementById('answerInput').focus();
}

// Show finish page
function showFinishPage() {
    document.getElementById('flagPage').classList.remove('active');
    document.getElementById('finishPage').classList.add('active');
    document.title = 'Congrats!';
}

// Submit winner information
function submitInfo() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    
    if (firstName.length === 0 || lastName.length === 0 || email.length === 0) {
        alert("Oops! Please fill out all the fields");
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        return;
    }
    
    // Store winner info
    const winner = {
        date: new Date().toISOString(),
        firstName: firstName,
        lastName: lastName,
        email: email
    };
    
    winners.push(winner);
    console.log('Winner registered:', winner);
    console.log('All winners:', winners);
    
    alert("Your email has been successfully submitted!");
    
    // Clear form
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('email').value = '';
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Allow Enter key to submit answers
    document.getElementById('answerInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });
    
    // Allow Enter key to submit winner info
    ['firstName', 'lastName', 'email'].forEach(id => {
        document.getElementById(id).addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                submitInfo();
            }
        });
    });
    
    // Add right-click context menu prevention for flag 5 (inspect element hint) - adjusted index
    document.addEventListener('contextmenu', function(e) {
        if (currentFlagIndex === 4) { // Flag 5 (0-indexed)
            // Allow right-click for the inspect element challenge
            return true;
        }
    });
});

// Helper functions for debugging
function getCurrentFlag() {
    return flagData[currentFlagIndex];
}

function getAllFlags() {
    return flagData;
}

function getWinners() {
    return winners;
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        flagData,
        getCurrentFlag,
        getAllFlags,
        getWinners
    };
}