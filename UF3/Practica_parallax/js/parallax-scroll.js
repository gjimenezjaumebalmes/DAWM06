(function() {

const person = document.querySelector('.parallax__person');
const container = document.querySelector('.parallax');

window.addEventListener('scroll', parallax);

function parallax(){
    const value = window.scrollY;
    container.style.backgroundPositionY = `${value/1.1}px`;
    person.style.backgroundPositionY = `${value/2}px`;
}

})();