const container = document.getElementById('container');

function createGrid(size){
    for (let i = 0; i < size * size; i++){
        const square = document.createElement('div');
        square.classList.add('grid-square');
        container.appendChild(square);

        // hue (0-360) - controls color type
        const hue = Math.floor(Math.random() * 360);
        const color = `hsl(${hue}, 100%, 70%)`;
        square.style.backgroundColor = color;

        // store the info
        square.dataset.hue = hue;
        square.dataset.lightness = 70;
    };
};

createGrid(16)

const grid = document.querySelectorAll('.grid-square');

grid.forEach(square => {
    square.addEventListener('mouseover', (e) => {
        let currentLightness = parseInt(square.dataset.lightness);
        const hue = square.dataset.hue;

        if (currentLightness > 0){
            currentLightness -= 20;
        }

        square.dataset.lightness = currentLightness;
        
        // you want to change the square that triggered the event
        square.style.backgroundColor = `hsl(${hue}, 100%, ${currentLightness}%)`;
    });
})

// create a function to the button - step 4
