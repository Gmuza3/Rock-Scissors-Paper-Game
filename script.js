let score = document.querySelector('.score-num');
const paper = document.querySelector('.paper-img img');
const scissor = document.querySelector('.scissors-img img');
const rock = document.querySelector('.rock-img img');

const firstPick = document.querySelector('#first-choice');
const secondPick = document.querySelector('#second-choice');

const rulesButt = document.querySelector('.btn-primary');
const closeButt = document.querySelector('.close-btn');
const tryAgainButt  =document.querySelector('.btn-tryAgain')

const rulesActive = document.querySelector('.rules-active');
const overlay = document.querySelector('.overlay');

const main =document.querySelector('main')
const matchActive = document.querySelector('.active')
const firstItemStyles = document.querySelector('.active .first-zone div')
const secondItemStyles = document.querySelector('.active .second-zone div')

const resultH2 = document.querySelector('.result-zone h2')

const arr = [paper,scissor,rock];
let count = 1;

let storedScore = JSON.parse(localStorage.getItem('store') || 0)
score.innerHTML = storedScore


function getRandomPic(arr){
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex]
}

function updateScore(newScore){
    storedScore = newScore;
    localStorage.setItem("store",JSON.stringify(storedScore));
    score.innerHTML = storedScore;
}

const getChoiceFromSrc =(src) =>{
    if(src.includes('paper')) return 'paper';
    if(src.includes('rock')) return 'rock';
    if(src.includes('scissor')) return 'scissor';
}

const compareFighters = (a,b) =>{
    const choiceA = getChoiceFromSrc(a.src);
    const choiceB = getChoiceFromSrc(b.src);

    if (choiceA === 'paper' && choiceB === 'rock' ||
        choiceA === 'rock' && choiceB === 'scissor' ||
        choiceA === 'scissor' && choiceB === 'paper') {
             firstItemStyles.classList.add('hover-winner');
             if(storedScore < 30){
                updateScore(storedScore + count);
             }
             else{
                clearScore()
             }
             
             resultH2.innerHTML = 'You Win !'
    } else if (choiceB === 'paper' && choiceA === 'rock' ||
               choiceB === 'rock' && choiceA === 'scissor' ||
               choiceB === 'scissor' && choiceA === 'paper') {
               secondItemStyles.classList.add('hover-winner');
               resultH2.innerHTML = 'you lose !'
               if(storedScore>0){
                updateScore(storedScore - count)
               }
               else{
                clearScore()
               }
               
    } else if (choiceA === choiceB) {
        firstItemStyles.classList.add('hover-winner');
        secondItemStyles.classList.add('hover-winner');
        updateScore(storedScore);
        resultH2.innerHTML = 'Draw !'
    }
}

rulesButt.addEventListener('click', () => {
    rulesActive.style.display = 'flex';
    overlay.style.display = 'block';
});

closeButt.addEventListener('click', () => {
    rulesActive.style.display = 'none';
    overlay.style.display = 'none';
});

const secondPickLogic =() =>{
    const randomPicture = getRandomPic(arr)
        secondPick.src = randomPicture.src;
        const key = getChoiceFromSrc(randomPicture.src);
        secondItemStyles.classList.add(`${key}-active`);
        compareFighters(firstPick,secondPick)
}

paper.addEventListener('click',() =>{
    firstItemStyles.classList.add('paper-active');
    firstPick.src = './Images/icon-paper.svg';
    main.style.display = 'none';
    matchActive.style.display = 'flex';
    secondPickLogic();
})
scissor.addEventListener('click',() =>{
    firstItemStyles.classList.add('scissor-active');
    firstPick.src = './Images/icon-scissors.svg';
    main.style.display = 'none';
    matchActive.style.display = 'flex';
    secondPickLogic();
})
rock.addEventListener('click',() =>{
    firstItemStyles.classList.add('rock-active');
    firstPick.src = './Images/icon-rock.svg';
    main.style.display = 'none';
    matchActive.style.display = 'flex';
    secondPickLogic();
})

function resetGame() {
    firstItemStyles.classList.remove('paper-active', 'scissor-active', 'rock-active', 'hover-winner');
    secondItemStyles.classList.remove('paper-active', 'scissor-active', 'rock-active', 'hover-winner');
    
    firstPick.src = '';
    secondPick.src = '';
    
    main.style.display = 'flex';
    matchActive.style.display = 'none';
    
    resultH2.innerHTML = '';
}

tryAgainButt.addEventListener('click', () => {
    resetGame();
});

function clearScore() {
    localStorage.removeItem('score');
    score.innerHTML = 0;
}
