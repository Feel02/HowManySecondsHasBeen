let interval;

function startCalculation() {
    const birthdate = document.getElementById('birthdate').value;
    const birthtime = document.getElementById('birthtime').value;
    if (!birthdate || !birthtime) {
        alert('Please enter your birthdate and birthtime');
        return;
    }

    // Save to localStorage
    localStorage.setItem('birthdate', birthdate);
    localStorage.setItem('birthtime', birthtime);

    calculateAge(birthdate, birthtime);
}

function calculateAge(birthdate, birthtime) {
    clearInterval(interval); // Clear any existing intervals

    const birthDateTime = new Date(`${birthdate}T${birthtime}`).getTime();

    interval = setInterval(() => {
        const currentTime = new Date().getTime();
        const ageInSeconds = Math.floor((currentTime - birthDateTime) / 1000);
        document.getElementById('output').innerText = `You have been alive for ${ageInSeconds} seconds`;

        const ageInMinutes = Math.floor(ageInSeconds / 60);
        const ageInDays = Math.floor(ageInSeconds / (60 * 60 * 24));
        const ageInWeeks = Math.floor(ageInSeconds / (60 * 60 * 24 * 7));
        const ageInYears = Math.floor(ageInSeconds / (60 * 60 * 24 * 365.25));
        const ageInDecades = Math.floor(ageInSeconds / (60 * 60 * 24 * 365.25 * 10));

        document.getElementById('minutes').innerText = `You have been alive for ${ageInMinutes} minutes`;
        document.getElementById('days').innerText = `You have been alive for ${ageInDays} days`;
        document.getElementById('weeks').innerText = `You have been alive for ${ageInWeeks} weeks`;
        document.getElementById('years').innerText = `You have been alive for ${ageInYears} years`;
        document.getElementById('decades').innerText = `You have been alive for ${ageInDecades} decades`;

        updateProgressBar(ageInYears);
    }, 1000);
}

function updateProgressBar(ageInYears) {
    const progressContainer = document.getElementById('progress-container');
    const yearsPerBlock = 16;
    const requiredBlocks = Math.ceil(ageInYears / yearsPerBlock);

    // Remove any extra blocks if age is reduced
    while (progressContainer.children.length > requiredBlocks) {
        if(progressContainer.children.length > 5){
            progressContainer.removeChild(progressContainer.lastChild);
        }
        else{
            break;
        }
    }

    // Add new blocks if needed
    while (progressContainer.children.length < requiredBlocks) {
        const block = document.createElement('div');
        block.classList.add('progress-block');

        const line = document.createElement('div');
        line.classList.add('line');

        const fill = document.createElement('div');
        fill.classList.add('progress-fill');
        fill.classList.add('progress-fill-golden');
        block.appendChild(line);
        block.appendChild(fill);
        progressContainer.appendChild(block);
    }

    // Update fill percentages for each block
    Array.from(progressContainer.children).forEach((block, index) => {
        
        const yearsInCurrentBlock = ageInYears - (index * yearsPerBlock);
        let fillPercentage = 0;

        if (yearsInCurrentBlock >= yearsPerBlock) {
            fillPercentage = 100;
        } else if (yearsInCurrentBlock > 0) {
            fillPercentage = (yearsInCurrentBlock / yearsPerBlock) * 100;
        }

        if(index > 4){
            setTimeout(() => {
                block.querySelector('.progress-fill-golden').style.width = `${fillPercentage}%`;
            }, index * 1000); // Delay each block's fill animation by 1 second
        }
        else{
            setTimeout(() => {
                block.querySelector('.progress-fill').style.width = `${fillPercentage}%`;
            }, index * 1000); // Delay each block's fill animation by 1 second
        }
    });
}

// Load saved data from localStorage
window.onload = function() {
    const savedBirthdate = localStorage.getItem('birthdate');
    const savedBirthtime = localStorage.getItem('birthtime');

    if (savedBirthdate && savedBirthtime) {
        document.getElementById('birthdate').value = savedBirthdate;
        document.getElementById('birthtime').value = savedBirthtime;
        calculateAge(savedBirthdate, savedBirthtime);
    }
};
