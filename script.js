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

const btnTicTacToe = document.querySelectorAll('button');
const textX = document.querySelectorAll('p');
var isPlaying = true;

var x = "X";
var o = "O";

//Ordi Joue
console.log(isPlaying);



//Qui commence ? 
//Faire une fonction qui commence 

function WhoSTart()
{
    var j = Math.floor(Math.random() * 2);
    if(j == 1)
    {
        console.log("Player plays")
        PlayerPlay();
    }
    else
    {
        console.log("Computer plays");
        ComputerPlay();
        isPlaying = false;
    }
}

WhoSTart();





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
                        break;
                    }
                }
                console.log("la");
                ComputerPlay();
            }
        })
        
    });
   
}



//Si le joueur est en train de jouer, ne rien faire, sinon ordi joue 





