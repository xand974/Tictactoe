const btn = document.querySelectorAll('button');

btn.forEach(element => {
    element.addEventListener('mouseover', () => {
        element.classList.toggle('animBtn');

    });
    element.addEventListener('mouseleave', () => {
        element.classList.toggle('animBtn');

    });
})
