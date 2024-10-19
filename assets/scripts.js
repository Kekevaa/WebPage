
//PAGE TIMOUT ------------------------------------------------------------------------------
class InactivityTimer {
    constructor(timeoutDuration = 10000, redirectUrl = 'index.html') {
        this.timeoutDuration = timeoutDuration;
        this.redirectUrl = redirectUrl;
        this.inactivityTimeoutID = null;
        this.init();
    }

    isHomePage() {
        return window.location.pathname === '/index.html';
    }

    askToRedirect() {
        const userConfirmed = confirm("You have been inactive for 1 minute. Do you want to go to the home page?");
        if (userConfirmed) {
            window.location.href = this.redirectUrl;
            alert('Moving to home page');
        } else {
            this.resetInactivityTimer();
        }
    }

    resetInactivityTimer() {
        clearTimeout(this.inactivityTimeoutID);
        this.inactivityTimeoutID = setTimeout(() => this.askToRedirect(), this.timeoutDuration);
    }

    startInactivityTimer() {
        if (!this.isHomePage()) {
            this.resetInactivityTimer();
            this.addEventListeners();
        }
    }

    addEventListeners() {
        const events = ['mousemove', 'keypress', 'click', 'touchstart', 'scroll'];
        events.forEach(event => {
            document.addEventListener(event, () => this.resetInactivityTimer(), { passive: true });
        });
    }

    init() {
        this.startInactivityTimer();
    }
}

const inactivityTimer = new InactivityTimer();
//---------------------------------------------------------------------------------------------

//CURRENT TIME IN OULU-------------------------------------------------------------------------
function updateCurrentTime() {
    const currentDate = new Date();
    
    const options = { month: 'long', day: 'numeric' }; 
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    
    const formattedTime = currentDate.toLocaleTimeString('fi-FI');

    document.getElementById('dateTimeInfo').textContent = " " + formattedDate + ", " + formattedTime; 
}

function startClock() {
    updateCurrentTime(); 
    setInterval(updateCurrentTime, 1000);
}

window.onload = function() {
    startClock();
    
};
//-----------------------------------------------------------------------------------------

//RANDOM FACT GENERATOR--------------------------------------------------------------------
const facts = [
    "Did you know? The first computer virus was created in 1986.",
    "The first programming language was called 'Fortran'.",
    "There are over 700 programming languages in use today!",
    "The term 'bug' in programming was inspired by a real insect found in a computer.",
    "JavaScript was created in just 10 days by Brendan Eich.",
    "Python was named after the comedy series Monty Python, not the snake.",
    "The first website ever created is still live: info.cern.ch.",
    "NASA’s Curiosity Rover, which landed on Mars, runs on a version of VxWorks OS.",
    "Around 70% of mobile developers worldwide use JavaScript as their main programming language.",
    "A programmer once outsourced his own job to a developer in China and paid them 1/5 of his salary!",
    "NASA still uses 1970s programs in their spacecraft."
];

let clickCount = 0;
const initialMessage = "Click the button to get a random fact!";
document.getElementById('fun-fact').textContent = initialMessage;

function generateFunFact() {
    clickCount++;
    if (clickCount < 10) {
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        document.getElementById('fun-fact').textContent = randomFact;

    } else {
        document.getElementById('fun-fact').textContent = "🎉 You found an Easter egg! Here's a joke for you: Why don't skeletons fight each other? Because they don't have the guts! 😄";
        clickCount = 0;
    }
}

document.getElementById('getFactButton').addEventListener('click', generateFunFact);
//------------------------------------------------------------------------------------------

