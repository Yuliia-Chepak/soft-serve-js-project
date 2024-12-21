document.addEventListener('DOMContentLoaded', () => {
    const ageField = document.getElementById("age");
    const ball = document.getElementById('ball'); 
    const face = document.getElementById('face'); 
    const eyes = document.getElementsByClassName('eye'); 

    const handleMouseMove = event => {
        if (document.activeElement !== ageField) {
            for (let eye of eyes) {
                const x = eye.getBoundingClientRect().left + 10;
                const y = eye.getBoundingClientRect().top + 10;
                const rad = Math.atan2(event.pageX - x, event.pageY - y);
                const rot = (rad * (180 / Math.PI) * -1) + 180;
                eye.style.transform = `rotate(${rot}deg)`;
            }
        }
    };

    const handleFocusAge = () => {
        face.style.transform = 'translateX(30px)';
        for (let eye of eyes) {
            eye.style.transform = `rotate(100deg)`; 
        }
    };

    const handleFocusOutAge = (event) => {
        face.style.transform = 'translateX(0)';
        if (event.target.checkValidity()) {
        } else {
            for (let eye of eyes) {
                eye.style.transform = `rotate(215deg)`; 
            }
        }
    };

    ageField.addEventListener('input', () => {
        for (let eye of eyes) {
            eye.style.transform = `rotate(180deg)`; 
        }
    });

    document.addEventListener("mousemove", event => handleMouseMove(event));
    ageField.addEventListener('focus', handleFocusAge);
    ageField.addEventListener('focusout', handleFocusOutAge);
});
