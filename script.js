const btn = document.querySelectorAll('button');
const myTitle = document.querySelector('h1');

//Anim Boutton
btn.forEach(element => {
    element.addEventListener('mouseover', () => {
        element.classList.toggle('animBtn');

    });
    element.addEventListener('mouseleave', () => {
        element.classList.toggle('animBtn');

    });
})


//Anim Titre
myTitle.addEventListener('mouseenter', () => {
    myTitle.classList.add('animH1');
})

myTitle.addEventListener('mouseleave', () => {
    myTitle.classList.remove('animH1');
})





//Jeu Tic Tac Toe


                //Variable 

const btnTicTacToe = document.querySelectorAll(".divBtn");
const textX = document.querySelectorAll('p');

//Anim Banniere Fin de Jeu : Le gagnant

const banWinPlayerOne = document.getElementById('P1W');
const banWinPlayerTwo = document.getElementById('P2W');


//Banniere : Qui commence le jeu
const banPlayer = document.getElementById('banPlayer');
const banPlayerTwo = document.getElementById('banPlayerTwo');
//En jeu
let isPlaying = true;
var hasPlayerWon;

//Gagnant
var interPlay =  setInterval(PlayerWon , 500);
var inter =  setInterval(Winner, 1000);
var interPlayTwo = setInterval(ComputerWon, 500);
let hasWon = false;

//Recommencer
const reco = document.querySelector('.RecoDiv');
reco.addEventListener('click' , NewGame);

function NewGame() 
{
    document.location.reload();
}


//Lettre
var x = "X";
var o = "O";

//Ordi Joue
console.log(isPlaying);




//Recup de nom
var namePlayerOne = "";
var namePlayerTwo = "";

const PlayerOneh4 = document.getElementById('p1Txt');
const PlayerTwoh4 = document.getElementById('p2Txt');

namePlayerOne = prompt("entrez le nom du joueur 1 : " );
namePlayerTwo = prompt("entrez le nom du joueur 2 : ");

PlayerOneh4.innerHTML = `${namePlayerOne} starts !`;
PlayerTwoh4.innerHTML = `${namePlayerTwo} starts !`;




            //Declaration des fonstions 


WhoSTart();
PlayerWon();
Winner();
ComputerWon();


//Qui commence ? 
//Faire une fonction qui commence 

function WhoSTart()
{
    var j = Math.floor(Math.random() * 2);
    if(j == 1)
    {
        banPlayer.classList.add('animBan');
        banPlayerTwo.style.display = "none";
        SetStartOne();
        console.log("Player plays")
        PlayerPlay();
    }
    else
    {
        banPlayerTwo.classList.add('animBan');
        console.log("Computer plays");
        ComputerPlay();
        isPlaying = false;
        SetStartTwo();
        banPlayer.style.display = "none";

    }
}



//Banniere anim

function SetStartOne()
{
    var interStart = setTimeout(function() 
    {
        banPlayer.style.display = "none";
    }, 1500)
}

function SetStartTwo()
{
    var interStartTwo = setTimeout(function() 
    {
        banPlayerTwo.style.display = "none";
    }, 1500)
}

//Script second joueur
//tableau de toutes les valeurs de 0 à 8
//Si on click sur un bouton, ajouter la valeur au tableau
function ComputerPlay()
{
    console.log("computer is playing");

    btnTicTacToe.forEach(element => 
    {
        element.addEventListener('click', () => 
        {
            if(!isPlaying)
            {
                element.innerHTML = o;
                element.classList.remove('XColor');
                element.classList.add('OColor');
                console.log(btnTicTacToe);
                for (var i = 0; i <= btnTicTacToe.length; i++) 
                {
                    if (element.innerHTML = o) 
                    {
                        element.disabled = true;
                        isPlaying = true;
                        console.log("Player has played");
                        console.log(isPlaying);
                        break;
                    }
                }
                PlayerPlay();
            }

        })

        
    })
}

    //FONCTIONNE PAS 

    /*btnTicTacToeComputer.forEach(elementO =>
    {
        elementO.addEventListener('click', () => 
            {
                if (isPlaying == false) 
                {
                    elementO.innerHTML == o;
                    isPlaying = true;
                for(var i = 0; i<= btnTicTacToeComputer.length; i++)
                {
                    if(elementO.innerHtml == o){
                        console.log("computer has played")
                        console.log(isPlaying);
                        console.log("player plays");
                        console.log(ComputerPlay());
                        break;
                    }
                }
            }
            
        });
        
    })*/



//Player joue

function PlayerPlay() 
{
    btnTicTacToe.forEach(element => 
        {
        element.addEventListener('click', () => 
        {
            var elm = element;
            console.log(elm);
            if(isPlaying == true)
            {
                element.innerHTML = x;
                element.classList.remove('OColor');
                element.classList.add('XColor');

                for (var i = 0; i <= btnTicTacToe.length; i++) {
                    if (element.innerHTML = x) 
                    {
                        element.disabled = true;
                        isPlaying = false;
                        console.log("Player has played");
                        console.log(isPlaying);
                        console.log(element);
                        break;
                    }
                }
                console.log("la");
                ComputerPlay();
            }
        })
        
    });
   
}


//Fonction Pour déterminer qui a gagner 


function PlayerWon()
{
    for(var i = 1; i <= btnTicTacToe.length; i++)
    {
        if(btnTicTacToe[0].innerHTML == x && btnTicTacToe[1].innerHTML == x && btnTicTacToe[2].innerHTML == x ||
           btnTicTacToe[3].innerHTML == x && btnTicTacToe[4].innerHTML == x && btnTicTacToe[5].innerHTML == x || 
           btnTicTacToe[6].innerHTML == x && btnTicTacToe[7].innerHTML == x && btnTicTacToe[8].innerHTML == x ||
           btnTicTacToe[0].innerHTML == x && btnTicTacToe[4].innerHTML == x && btnTicTacToe[8].innerHTML == x ||
           btnTicTacToe[2].innerHTML == x && btnTicTacToe[4].innerHTML == x && btnTicTacToe[6].innerHTML == x)
        {
            console.log("player a gagné");
            hasWon = true;
            hasPlayerWon = true;

        }
    }
}



function ComputerWon()
{
    for(var i = 1; i <= btnTicTacToe.length; i++)
    {
        if(btnTicTacToe[0].innerHTML == o && btnTicTacToe[1].innerHTML == o && btnTicTacToe[2].innerHTML == o ||
           btnTicTacToe[3].innerHTML == o && btnTicTacToe[4].innerHTML == o && btnTicTacToe[5].innerHTML == o || 
           btnTicTacToe[6].innerHTML == o && btnTicTacToe[7].innerHTML == o && btnTicTacToe[8].innerHTML == o ||
           btnTicTacToe[0].innerHTML == o && btnTicTacToe[4].innerHTML == o && btnTicTacToe[8].innerHTML == o ||
           btnTicTacToe[2].innerHTML == o && btnTicTacToe[4].innerHTML == o && btnTicTacToe[6].innerHTML == o)
        {
            console.log("player 2 a gagné");
            hasWon = true;
            hasPlayerWon = false;

        }
    }
}


function Winner()
{
    if(hasWon == false)
    {
        interPlayTwo;
        interPlay;
        console.log("still playing");
    
    }
    else
    {
        if(hasPlayerWon == true)
        {
            setTimeout(PrintTheAWinner, 1000);
            console.log("we have a winner : player 1");
            clearInterval(inter);
            clearInterval(interPlay);
            clearInterval(interPlayTwo)
        }
        else if(hasPlayerWon == false)
        {
            setTimeout(PrintTheAWinnerPlayerTwo, 1000);
            console.log("we have a winner : player 2");
            clearInterval(inter);
            clearInterval(interPlay);
            clearInterval(interPlayTwo)
        }
        
    }
}

function PrintTheAWinner()
{
    banWinPlayerOne.style.display = "block";
    banWinPlayerOne.style.transition = "0.3s";
    console.log("PLAYER ONE IS THE WINNER");
    console.log(hasPlayerWon);
    reco.classList.add('animReco');
    reco.style.display = "block";
    console.log(reco);
}

function PrintTheAWinnerPlayerTwo()
{
    banWinPlayerTwo.style.display = "block";
    banWinPlayerTwo.style.transition = "0.3s";
    console.log("PLAYER TWO IS THE WINNER");
    console.log(hasPlayerWon);
    reco.classList.add('animReco');
    reco.style.display = "block";
    console.log(reco);
}




