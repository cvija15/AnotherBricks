const playButton = document.getElementById("play");
const mouseIcon  = document.getElementById("mouse-icon")
const keyboardIcon = document.getElementById("keyboard-icon")

playButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});


//set keyboard as default inpui device if null
if(localStorage.getItem("input-dcvice")==null){
    localStorage.setItem("input-dcvice", "keyboard");
}
//input-device listener for options (keyboard/mouse)
mouseIcon.addEventListener('click', () => {
    localStorage.setItem("input-dcvice", "mouse");
});
keyboardIcon.addEventListener('click', () => {
    localStorage.setItem("input-dcvice", "keyboard");
});

