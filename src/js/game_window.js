const keys = document.querySelectorAll('.key');
const wordBoxContainer = document.querySelector('.guess_word');
const figureBoxes = Array.from(document.querySelectorAll('.box'));
const images = document.querySelectorAll('img');
const body = document.querySelector('body');
const msg1 = document.querySelector('.message_part1');
const msg2 = document.querySelector('.message_part2');
const hangmanBox = document.querySelector('.main_box');

images.forEach(img => img.classList.add('hidden')) // adding a hidden classes to all images elements to remove their default outline

const restartGame = function(color, msg_1, msg_2){
    body.style.backgroundColor = color;
                msg1.innerHTML = msg_1;
                msg2.innerHTML = msg_2;
                wordBoxContainer.innerHTML = `<a href="../html/selection_window.html"">
                        <button class="restart_btn">RESTART</button>
                        </a>
                        `;
};

let num = 0;

const array = [];

///////////////////////////////////////////////

const word = localStorage.getItem('word').toUpperCase();
console.log(word);


// Displaying the word box according to the length of random word

const displayWordBox = function(){
    const numBox = word.length;
    const wordArray = Array.from(word);
    console.log(wordArray);

    for(let i = 0; i < numBox; i++){

        const markup = `
            <div class="alphabet_box" id="${i}" value="${wordArray[i]}">
            <p>_</p>
            </div>
    `;
        wordBoxContainer.insertAdjacentHTML('beforeend', markup);
    }
};

displayWordBox();

// displaying the key value in word box if the it is right///////////////////////
keys.forEach(key => {
    key.addEventListener('click', function(){
        console.log(key.value);
        const kValue = key.value;
        if(array.length < word.length && num < 7) {
            key.style.backgroundColor = '#9C3A3A';
            key.classList.toggle('hover');
        }
        key.value = null;

        // displaying the key value to word box
        
        // if key is right
        if(word.includes(`${kValue}`) && num < 7){
            const boxes = Array.from(document.querySelectorAll('.alphabet_box'));
            console.log(boxes);
          
            // finding the box where kValue needs to be put
            const valueBoxes = boxes.filter(box => box.getAttribute('value') === kValue);
            console.log(valueBoxes);
            
            //   inserting key value into the box
                valueBoxes.forEach(box => {
                 
                    array.push(kValue);

                    box.innerHTML = `
                    <p>${kValue}</p>
                    `;
                });

            console.log(array);

            ////////////////////////////// Displaying Game Won ///////////////////////////////////
            if(array.length === word.length) {
                restartGame('#46A63E', 'You', 'Won!')
                hangmanBox.classList.toggle('hidden');
            }
        };
        
        // if key is wrong
        if(!word.includes(`${kValue}`) && kValue !== 'null' && array.length < word.length && num < 7){
            console.log(figureBoxes);
            num = num + 1;
            console.log(num - 1);

            /////////////  Displaying Game Over  /////////////
            if(num > 6) restartGame('#B42F2F', 'Game', 'Over') // when all the figure turned black alert game over
        
            const boxes = figureBoxes.filter(box => +box.id === (num - 1));
            console.log(boxes);

            // const imgs = boxes.map(box => box.querySelector('img[data-src]'));
            const imgs = boxes.map(box => box.querySelector('img'));
            console.log(imgs);
            
            // imgs.forEach(img => img.src = img.dataset.src);
            imgs.forEach(img => {
                img.src = img.dataset.src;
                img.classList.toggle('hidden')
            }); 
        };
    });
});