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

const classBtn = document.getElementsByClassName('.divBtn');

const btnTicTacToe = document.querySelectorAll('button');
const textX = document.querySelectorAll('p');


//Banniere : Qui commence le jeu
const banPlayer = document.getElementById('banPlayer');
const banPlayerTwo = document.getElementById('banPlayerTwo');
//En jeu
let isPlaying = true;


//Gagnant
var interPlay =  setInterval(PlayerWon , 3000);
var inter =  setInterval(Winner, 1600);

let hasWon = false;


//Lettre
var x = "X";
var o = "O";

//Ordi Joue
console.log(isPlaying);


//Declaration des fonstions 


WhoSTart();
PlayerWon();
Winner();



//Qui commence ? 
//Faire une fonction qui commence 

function WhoSTart()
{
    var j = Math.floor(Math.random() * 2);
    if(j == 1)
    {
        banPlayerTwo.style.display = "none";
        SetStartOne();
        console.log("Player plays")
        PlayerPlay();
    }
    else
    {
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
    }, 1000)
}

function SetStartTwo()
{
    var interStartTwo = setTimeout(function() 
    {
        banPlayerTwo.style.display = "none";
    }, 1000)
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
           btnTicTacToe[3].innerHTML == x && btnTicTacToe[4].innerHTML == x && btnTicTacToe[4].innerHTML == x || 
           btnTicTacToe[6].innerHTML == x && btnTicTacToe[7].innerHTML == x && btnTicTacToe[8].innerHTML == x ||
           btnTicTacToe[0].innerHTML == x && btnTicTacToe[4].innerHTML == x && btnTicTacToe[8].innerHTML == x ||
           btnTicTacToe[2].innerHTML == x && btnTicTacToe[4].innerHTML == x && btnTicTacToe[6].innerHTML == x)
        {
            console.log("player a gagné");
            hasWon = true;

        }
    }
}



function Winner()
{

    if(hasWon == false)
    {
        interPlay;
        console.log("still playing");
    
    }
    else
    {
        setTimeout(PrintTheAWinner, 1000);
        console.log("we have a winner");
        clearInterval(inter);
        clearInterval(interPlay);
    }
}

function PrintTheAWinner()
{
    console.log("PLAYER IS THE WINNER");

}






