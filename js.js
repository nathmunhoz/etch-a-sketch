const container = document.getElementById('container');

let currentMode = '';
let currentSize = 16;

// button handlers
document.getElementById('colorBtn').addEventListener('click', () => {
    currentMode = 'color';
    createGrid(currentSize);
});
document.getElementById('rainbowBtn').addEventListener('click', () => {
    currentMode = 'rainbow';
    createGrid(currentSize);
});

function createGrid(size){
    container.innerHTML = ''; // clear existing grid
    
    // grid auto-adjust its layout based on how many squares per side, and each should take 1 fraction of the available height/width
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    // one random color for "color" mode
    // outside the loop, so all squares will have the same color
    let uniformHue = Math.floor(Math.random() * 360);

    for (let i = 0; i < size * size; i++){
        const square = document.createElement('div');
        square.classList.add('grid-square');
        container.appendChild(square);

        // hue (0-360) - controls color type
        let hue;

        if (currentMode === 'color'){
            hue = uniformHue; // use the same hue for all
            square.style.backgroundColor = `hsl(${hue}, 100%, 70%)`;           
        } else if (currentMode === 'rainbow') {
            hue = Math.floor(Math.random() * 360); // different hue each time
            square.style.backgroundColor = `hsl(${hue}, 100%, 70%)`;
        };

        // store the info
        square.dataset.hue = hue;
        square.dataset.lightness = 60;

        square.addEventListener('mouseover', () => {
            let currentLightness = parseInt(square.dataset.lightness);
            const hue = square.dataset.hue;
    
            if (currentLightness > 0){
                currentLightness -= 20;
            }
    
            square.dataset.lightness = currentLightness;
            
            // you want to change the square that triggered the event
            square.style.backgroundColor = `hsl(${hue}, 100%, ${currentLightness}%)`;
        });
    };
};

// write this function as a parameter in the createGrid
function newGrid(){
    const button = document.getElementById('button')
    
    button.addEventListener('click', () => {
        let size = null;
        
        while (true){
            const input = prompt('Input a new number of squares per side:');

            if (input === null){
                console.log('User canceled input.');
                return
            };

            size = parseInt(input);

            if (!isNaN(size) && size > 0 && size <= 100) {
                break; // valid input
            } else {
                alert('Invalid input. Please enter a number between 1 and 100.');
            };
        };

        createGrid(size); // create the new grid
    });

};

newGrid();
createGrid(16); // load default grid