(function () {

    const AUTO_DT = 150;

    const TOTAL_ELEMENTS = 24;
    const ELEMENT_WIDTH = 128;
    const ELEMENT_HEIGHT = 128;

    var image_dom = document.getElementById('spritesheet');
    var current_element = 0;
    updateImage();

    var auto_active = false;
    var auto_interval = 0;

    /**
     * Listener for keydown events
     */
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'l':
                // Left pressed
                rotateCounterClockwise();
                break;
            case 'r':
                // Right pressed'
                rotateClockwise();
                break;
            case 'a':
                toggleAuto();
                break;
        }
    });

    /**
     * Rotates the image clockwise
     */
    function rotateClockwise() {
        current_element++;
        if (current_element >= TOTAL_ELEMENTS) current_element = 0;
        updateImage();
    }

    /**
     * Rotates the image counter=lockwise
     */
    function rotateCounterClockwise() {
        current_element--;
        if (current_element < 0) current_element = TOTAL_ELEMENTS - 1;
        updateImage();
    }

    function toggleAuto() {
        auto_active = !auto_active;
        if (!auto_active) clearInterval(auto_interval);
        else {
            auto_interval = window.setInterval(function() {
                rotateClockwise();
            }, AUTO_DT);
        }
    }

    /**
     * Updates the style of the image so that the spritesheets rect is properly positioned.
     * Should be called after changing current_element.
     */
    function updateImage() {
        image_dom.setAttribute('style', `background-position: -${current_element*ELEMENT_WIDTH}px 0px`);
    }

})();