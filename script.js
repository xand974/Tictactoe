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

const player = document.querySelectorAll('p');