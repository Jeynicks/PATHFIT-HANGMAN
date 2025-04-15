const hangmanVid = document.querySelector(".hangman-box video");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");
const scorePoints = document.querySelector(".score-points h4");
const loadingVideo = document.getElementById("loadingVideo");
const loadingSound = document.getElementById("loadingSound");

document.addEventListener("DOMContentLoaded", function () {
    const loadingScreen = document.getElementById("loading-screen");
    const contentContainer = document.getElementById("content-container");
    const loadingBar = document.getElementById("loading-bar");
    const loadingSound = document.getElementById("loadingSound");

    const totalTime = 6500;
    const interval = 20;
    const increment = (interval / totalTime) * 100;

    let currentWidth = 0;

    loadingSound.play();

    const loadingInterval = setInterval(function () {
        currentWidth += increment;
        loadingBar.style.width = currentWidth + "%";

        if (currentWidth >= 100) {
            clearInterval(loadingInterval);
            loadingScreen.style.opacity = 0;
            setTimeout(function () {
                loadingScreen.style.display = "none";
                contentContainer.style.display = "block";
            }, 500);

            loadingSound.pause();
            loadingSound.currentTime = 0;
        }
    }, interval);
});


let currentWord, correctLetters = [], wrongGuessCount = 0, score = 0;
const maxGuess = 6;
let currentWordIndex = 0; 

const resetGame = () => {
    const victorySound = document.getElementById("victorySound");
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanVid.src = `hangman/hangman-${wrongGuessCount}.mp4`;
    guessesText.innerText =`${wrongGuessCount} / ${maxGuess}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    
    wordDisplay.innerHTML = currentWord.split("").map(letter => {
        if(letter === " ") {
            correctLetters.push(" ");
            return `<li class="letter guessed">&nbsp;</li>`;
        } else {
            return `<li class="letter"></li>`;
        }
    }).join("");
    
    gameModal.classList.remove("show");
    victorySound.pause();
    victorySound.currentTime = 0;
    defeatSound.pause();
    defeatSound.currentTime = 0;

    scorePoints.innerText = `Score: ${score}/${wordList.length}`;
};
const wordList = [
    {
        word: "physical activity",
        hint: "It is any movement that requires energy from the muscles. In other words it is any movement made by a person"
    },
    {
        word: "physical exercise",
        hint: "It is defines as movement that is planned, systematic, repetitive, and itentional, It can also be used to develop or maintain physical fitness."
    },
    {
        word: "Rhythm",
        hint: "The pattern and emphasis of beats."
    },
    {
        word: "breathing",
        hint: "The use of inhalation and exhalation to give fluidity and harmony to a person's movement."
    },
    {
        word: "sedentary activity",
        hint: "It is asscoiated with the following unfavorable health effects."
    },
    {
        word: "obesity",
        hint: "(weight gain) It is increasing in children and adolescents."
    },
    {
        word: "motion",
        hint: "It is the movement of body or an object across space, speed and acceleration are major elements of motion "
    },
    {
        word: "force",
        hint: "It is the pushs or pull that causes a person or an object to accelerate, decelerate, stop, or change direction"
    },
    {
        word: "balance",
        hint: "It refers to stability. The alignment of the body's centr of gravity over the base of suppport is a fundamental principle of balance."
    },
    {
        word: "kinematics",
        hint: "The study of motion patterns describes effect of forces on a system, including linear and angular variations in velocity through time, position, displacement speed and acceleration."
    },
    {
        word: "kinetics",
        hint: "The study of what enerates motin and forces and durations at work."
    },
    {
        word: "statics",
        hint: "The study of systems at equilibrium, whether at rest or moving at a constant velocity."
    },
    {
        word: "biomechanics",
        hint: "It ca help us understand how muscles function and move this information can be applied to diseases and disorders involving movement."
    },
    {
        word: "locomotor movements",
        hint: "It refers to the body's movements, where body travels from one location to another point."
    },
    {
        word: "uneven rhythm movements",
        hint: "consist of unequal actions. These movements include skipping, galloping, and sliding"
    },
    {
        word: "non locomotor movements",
        hint: "It is sometimes called axial movemnts, refer to the body's movements without allowing the body to travel."
    },
    {
        word: "body management skills",
        hint: "it involves balancing, mainting equillibrium and postural control of the body."
    },
    {
        word: "locomotor skills",
        hint: "It involves transporting the body in any directions."
    },
    {
        word: "object control skills",
        hint: "It requires controlling implements and objects such as balls"
    },
    {
        word: "movement strategies",
        hint: "It refers to various approaches that will help you or your team successfully achieve a movement outcome or goal."
    },
    {
        word: "balance",
        hint: "The capacity to sustain the body's line of gravity within the support base with minimal postural sway."
    },
    {
        word: "centering",
        hint: "Your bdy's core, where all bdyd movements emanate and hold you as you move."
    },
    {
        word: "center of gravity",
        hint: "The balance point or that point where all body's weight is distributed equally across all sides.",
    },
    {
        word: "physical fitness",
        hint: "It refers to your body systems' capacity to function effectively together to allw you to be healthy and perform daily living activities."
    },
    {
        word: "helth related fitness",
        hint: "It standardized the lowest finess requirements for keeping good health, reducing the risk of chronic illness."
    },
    {
        word: "skill related fitness",
        hint: "Are fitness programs that are used to improve athletic ability."
    },
    {
        word: "muscular strength",
        hint: "It is the capacity of the muscle to produce force during a relatively shrt periood of time."
    },
    {
        word: "muscular endurance",
        hint: "It is the highest amount of force that a muscle group is able to pull or push in a single contraction."
    },
    {
        word: "body composition",
        hint: "It is how much of your body is made up of fat."
    },
    
    {
    word: "emotional wellness",
    hint: "It is about understanding your feelings, coping with problems and stress effectively."
},
{
    word: "environmental wellness",
    hint: "It helps us to live in harmony with our surroundings by doing something to preserve it."
},
{
    word: "financial wellness",
    hint: "It relates to the process of learning how to handle your financial expenses effectively."
},
{
    word: "intellectual wellness",
    hint: "It involves keeping an open mind as you come across new ideas and improving your knowledge further."
},
{
    word: "occupational wellness",
    hint: "It encourages personal fulfillment and enrichment of one's life through work."
},
{
    word: "physical wellness",
    hint: "It relates to keeping a safe body and finding treatment when appropriate."
},
{
    word: "sexual wellness",
    hint: "It applies to individual's active involvement in his or her life by discussing the various issues surrounding sexuality and sexual health."
},
{
    word: "social wellness",
    hint: "It is the ability to interact successfully in our global community and to live up to the expectations and demands of our personal roles."
},
{
    word: "spiritual wellness",
    hint: "It helps you to develop a set of spiritual values that will help you achieve purpose and meaning."
}
    
];



let completedAllWords = false;

const getNextWord = () => {
   
    if (currentWordIndex >= wordList.length) {

        currentWordIndex = 0;
        score = 0;
        scorePoints.innerText = `Score: ${score}/${wordList.length}`;
    }
    

    const { word, hint } = wordList[currentWordIndex];
    
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    
    resetGame();
    

    currentWordIndex++;
};

const gameOver = (isVictory) => {
    setTimeout(() => {
        const modalText = isVictory ? `Congratulations you guessed the word:` : `The correct word was:`;
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats!!!' : 'Game Over!'}`;
        
        if (currentWordIndex >= wordList.length) {
            gameModal.querySelector("p").innerText = `Final score: ${score}/${wordList.length}`;
            playAgainBtn.innerText = 'Play Again';

        } else {

            gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        }


        const victorySound = document.getElementById("victorySound");
        const defeatSound = document.getElementById("defeatSound");

        if (isVictory) {
            victorySound.loop = true;
            victorySound.play();
        } else {
            defeatSound.loop = true;
            defeatSound.play();
        }

        gameModal.classList.add("show");
    }, 300);
};

const initGame = (button, clickedLetter) => {
    click.currentTime = 1.5;
    click.play();
    click.volume = 0.5;
    
    if(currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push(letter);
                click.currentTime = 0.2;
                click.play();
                click.volume = 0.5;
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        wrongGuessCount++;    
        hangmanVid.src = `hangman/hangman-${wrongGuessCount}.mp4`; 
    }

    button.disabled = true;
    guessesText.innerText =`${wrongGuessCount} / ${maxGuess}`;

    if(wrongGuessCount === maxGuess) return gameOver(false);
    // Change this line in initGame function
    if(correctLetters.length === currentWord.replace(/ /g, "").length + (currentWord.match(/ /g) || []).length) {
        score++; 
        scorePoints.innerText = `Score: ${score}/${wordList.length}`;
        gameOver(true);
    }
};


for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}


getNextWord();
playAgainBtn.addEventListener("click", getNextWord);
