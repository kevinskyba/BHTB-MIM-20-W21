(function () {

    var image_dom = document.getElementById('spritesheet2');

    const AUTO_DT = 150;
    const TOTAL_ELEMENTS = 6;
    const ELEMENT_WIDTH = 256;
    const ELEMENT_HEIGHT = 256;

    var current_element = 0;

    window.setInterval(function() {
        current_element++;
        if (current_element >= TOTAL_ELEMENTS) current_element = 0;
        image_dom.setAttribute('style', `background-position: -${current_element*ELEMENT_WIDTH}px 0px`);
    }, AUTO_DT);
})();