
//Defining class that's being pulled
var itemClassName = "slideshow-item";
items = document.getElementsByClassName(itemClassName),
    totalItems = items.length,
    slide = 0,
    moving = true;


// Set classes
function setInitialClasses() {
    // Targets the previous, current, and next items
    // This assumes there are at least three items.
    items[totalItems - 1].classList.add("prev");
    items[0].classList.add("active");
    items[1].classList.add("next");
}
// Set event listeners
function setEventListeners() {
    var next = document.getElementsByClassName('slideshow__button--next')[0],
        prev = document.getElementsByClassName('slideshow__button--prev')[0];
    next.addEventListener('click', moveNext);
    prev.addEventListener('click', movePrev);

}

// funcion to move to the next slide
function moveNext() {
    if (!moving) {
        // If it's the last slide, reset to 0, else +1
        if (slide === (totalItems - 1)) {
            slide = 0;
        } else {
            slide++;
        }
        // Call function to move slideshow to next slide
        moveSlideshowTo(slide);
    }
}
// funciton to move to the previous slide
function movePrev() {
    if (!moving) {
        // If it's the first slide, set as the last slide, else -1
        if (slide === 0) {
            slide = (totalItems - 1);
        } else {
            slide--;
        }

        // call function to move slideshow to previous slide
        moveSlideshowTo(slide);
    }
}
function disableInteraction() {
    // Set 'moving' to true for the same duration as our transition.
    moving = true;
    setTimeout(function () {
        moving = false
    }, 500);
}

function moveSlideshowTo(slide) {
    if (!moving) {
        // temporarily disable interactivity
        disableInteraction();
        var newPrevious = slide - 1,
            newNext = slide + 1,
            oldPrevious = slide - 2,
            oldNext = slide + 2;
        if ((totalItems - 1) > 3) {
            // Checks and updates if the new slides are out of bounds
            if (newPrevious <= 0) {
                oldPrevious = (totalItems - 1);
            } else if (newNext >= (totalItems - 1)) {
                oldNext = 0;
            }
            // Checks and updates if slide is at the beginning/end
            if (slide === 0) {
                newPrevious = (totalItems - 1);
                oldPrevious = (totalItems - 2);
                oldNext = (slide + 1);
            } else if (slide === (totalItems - 1)) {
                newPrevious = (slide - 1);
                newNext = 0;
                oldNext = 1;
            }
            items[oldPrevious].className = itemClassName;
            items[oldNext].className = itemClassName;

            items[newPrevious].className = itemClassName + " prev";
            items[slide].className = itemClassName + " active";
            items[newNext].className = itemClassName + " next";
        }
    }
}

function initSlideshow() {
    setInitialClasses();
    setEventListeners();
    moving = false;
}

initSlideshow();
setInterval(moveNext, 4000);