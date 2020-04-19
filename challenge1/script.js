//alert('hey there');

function ageInDays(){
    var birthyear=prompt("enter your birth year");
    var days=(2020-birthyear)*365;
    var h1=document.createElement('h1');
    var textAnswer=document.createTextNode('You are '+days+" days old");
    h1.setAttribute('id','days');
    h1.appendChild(textAnswer);
    document.getElementById('flex-bot-result').appendChild(h1);
    
}

function reset(){
    document.getElementById('days').remove();
}

function GenerateCat(){
    var image=document.createElement('img');
    var div=document.getElementById('flex-cat-gen');
    image.src="https://cdn2.thecatapi.com/images/992.jpg";
    div.appendChild(image);
}
//RPS JS

function rpsGame(yourChoice){
    console.log(yourChoice);

    var humanChoice,botChoice;
    humanChoice=yourChoice.id;
    botChoice=numberToChoice(randomToRpsInt());
    console.log('Computer Choice: ',botChoice);

    
    //alert(botChoice);
    results=decideWinner(humanChoice,botChoice);
    console.log(results);
    
    message=finalMessage(results);  //"message":"you won","color":"green"
    console.log(message);
    
    rpsFrontEnd(yourChoice.id,botChoice,message); 
}

function randomToRpsInt(){
    return Math.floor(Math.random()*3);
}

function numberToChoice(number){
    return ['rock','paper','scissors'][number];
}

function decideWinner(yourChoice,botChoice){
    var rpsDatabase={
        'rock':{'scissors':1,'rock':0.5,'paper':0},
        'paper':{'rock':1,'paper':0.5,'scissors':0},
        'scissors':{'paper':1,'scissors':0.5,'rock':0}
    }

    var yourScore=rpsDatabase[yourChoice][botChoice];
    var botScore=rpsDatabase[botChoice][yourChoice];

    return [yourScore,botScore];
}


function finalMessage([yourScore,botScore]){
    if(yourScore === 0) return{'message': 'you lost' , 'color' : 'red' };
    else if(yourScore === 0.5) return{'message':'you tied','color':'yellow'};
    else return{'message':'you won','color':'green'};
    
}

function rpsFrontEnd(humanChoice,ComputerChoice,FinalMessage){
    var imagesDataBase = {
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src
    }

    //first of all remove all the images

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var HumanDiv=document.createElement('div');
    var BotDiv=document.createElement('div');
    var messageDiv=document.createElement('div');

    HumanDiv.innerHTML="<img src='" + imagesDataBase[humanChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(39, 50, 206, 1);'>";
    messageDiv.innerHTML="<h1 style='color: "+FinalMessage['color'] + "; font-size: xxlarge; padding: 30px;'>"+FinalMessage['message']+"</h1>";
    BotDiv.innerHTML="<img src='" + imagesDataBase[ComputerChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>";
    
    document.getElementById('flex-box-rps-div').appendChild(HumanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(BotDiv);
}

//Challange 4:change colors

var all_buttons=document.getElementsByTagName('button');


var copyAllButtons=[];

for(let i=0;i<all_buttons.length;++i){
    copyAllButtons.push(all_buttons[i].classList[1]);
}



function buttonColorChange(buttonThingy){
    
    if(buttonThingy.value==='red'){
        buttonsRed();
    }
    else if(buttonThingy.value==='green'){
        buttonsGreen();
    }
    else if(buttonThingy.value==='reset'){
        buttonsReset();
    }
    else if(buttonThingy.value==='random'){
        buttonsRandom();
    }
}

function buttonsRed(){
    for(let i=0;i<all_buttons.length;++i){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');

    }
}

function buttonsGreen(){
    for(let i=0;i<all_buttons.length;++i){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');

    }
}

function buttonsReset(){
    for(let i=0;i<all_buttons.length;++i){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function buttonsRandom(){
    for(let i=0;i<all_buttons.length;++i){
        var choices=['btn-primary','btn-success','btn-danger','btn-warning'];
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[Math.floor(Math.random()*4)]);
    }
}

//Challange 5 Blackjack

let blackjackGame={
    'you':{'scoreSpan':'#your-blackjack-result','div':'#your-box','score':0},
    'dealer':{'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap':{'2':2, '3':3 , '4':4 ,'5':5 , '6':6, '7':7, '8':8, '9':9, '10':10, 'J':10, 'K':10, 'Q':10, 'A':[1,11]},
    'wins':0,
    'loses':0,
    'draws':0,
    'isStand':false,
    'TurnsOver':false,
};

const YOU=blackjackGame['you'];
const DEALER=blackjackGame['dealer'];

//sounds
const HitSound= new Audio('sounds/swish.m4a');
const winsound=new Audio('sounds/cash.mp3');
const losssound=new Audio('sounds/aww.mp3');

document.querySelector('#hit').addEventListener('click',blackjackHit);
document.querySelector('#deal').addEventListener('click',blackjackDeal);
document.querySelector('#stand').addEventListener('click',blackjackStand);

function blackjackHit(){
    if(blackjackGame['isStand']===false){
    let card=randomCard();
    showCard(card,YOU);
    UpdateScore(card,YOU);
    showScore(YOU);
    }
}

function sleep(ms){
    return new Promise(resolve=> setTimeout(resolve,ms));
}


async function blackjackStand(){

    blackjackGame['isStand']=true;

    while(DEALER['score']<=14){
        let card=randomCard();
        showCard(card,DEALER);
        UpdateScore(card,DEALER);
        showScore(DEALER);
        await sleep(1000);
    }
    
    ShowResult(computeWinner());
    blackjackGame['TurnsOver']=true;
    
}

function showCard(card,activePlayer){
    if(activePlayer['score']<=21){
    let cardImage=document.createElement('img');
    cardImage.src=`images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    HitSound.play();
   
    }

}

function blackjackDeal(){
    //ShowResult(computeWinner());
if(blackjackGame['TurnsOver']===true){
    let yourImages=document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages=document.querySelector('#dealer-box').querySelectorAll('img');
    for(let i=0;i<yourImages.length;++i){
        yourImages[i].remove();
    }

    for(let i=0;i<dealerImages.length;++i){
        dealerImages[i].remove();
    }

    YOU['score']=0;
    DEALER['score']=0;

    document.querySelector('#your-blackjack-result').textContent=0;
    document.querySelector('#your-blackjack-result').style.color='white';
    document.querySelector('#dealer-blackjack-result').textContent=0;
    document.querySelector('#dealer-blackjack-result').style.color='white';

    document.querySelector("#BlackJack-result").textContent="Let's Play!!";
    document.querySelector("#BlackJack-result").style.color="black";

    blackjackGame['TurnsOver']=false;
    blackjackGame['isStand']=false;
}

}

function randomCard(){
    let randomIndex=Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
}

function UpdateScore(card,activePlayer){

    if(card==='A'){
        if(activePlayer['score']+blackjackGame['cardsMap'][card][1]<=21){
            activePlayer['score']+=blackjackGame['cardsMap'][card][1];
        }else{
            activePlayer['score']+=blackjackGame['cardsMap'][card][0];
        }
    
    }
    else{
        activePlayer['score']+=blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer){
    if(activePlayer['score']>21){
        document.querySelector(activePlayer['scoreSpan']).textContent='BUST!!!';
        document.querySelector(activePlayer['scoreSpan']).style.color='red';
    }
    else{
        document.querySelector(activePlayer['scoreSpan']).textContent=activePlayer['score'];
    }   
}

// function to compute winner
//update wins draws & loses

function computeWinner(){
     
    let winner;

    if(YOU['score']<=21){

        if(YOU['score']>DEALER['score'] || DEALER['score']>21){
           
            winner=YOU;
        }
        else if(YOU['score']<DEALER['score']){
            winner=DEALER;
            
        }
        else if(YOU['score']===DEALER['score']){
            console.log('DREW!!');
            
        }

    }
    else if(YOU['score']>21 && DEALER['score']<=21){
        winner=DEALER;
       
    }
    else if(YOU['score']>21 && DEALER['score']>21){
        console.log('YOU DREW!!');
        
    }

    //console.log('Winner is '+winner['score']);

    return winner;

}

function ShowResult(winner){
    let message,messageColor;

    if(winner===YOU){
        blackjackGame['wins']++;
        document.querySelector('#wins').textContent=blackjackGame['wins'];
        message='You Won!!';
        messageColor='green';
        winsound.play();
    }else if(winner===DEALER){
        blackjackGame['loses']++;
        document.querySelector('#loses').textContent=blackjackGame['loses'];
        message='You Lost!!';
        messageColor='red';
        losssound.play();
    }else{
        blackjackGame['draws']++;
        document.querySelector('#draws').textContent=blackjackGame['draws'];
        message='You Drew!!';
        messageColor='orange';
    }

    document.querySelector('#BlackJack-result').textContent=message;
    document.querySelector('#BlackJack-result').style.color=messageColor;

}


















