/**
 * Represents a color selector that manages color buttons.
 * @class
 */
class ColorSelector {
    /**
     * Constructs a ColorSelector instance.
     * @constructor
     * @param {string} buttonClass - The class name of color buttons in the DOM.
     */
    constructor(buttonClass) {
        this.colorSelected = "white";
        this.setupColorButtons(buttonClass);

        let defaultButton = document.querySelector(`.${buttonClass}[style*="background-color: white"]`);
        if (defaultButton) {
            defaultButton.classList.add('active');
        }
        
        this.colorSelected = "white";
    }
    
    /**
     * Sets up event listeners for color buttons.
     * @private
     * @param {string} buttonClass - The class name of color buttons in the DOM.
     */
    setupColorButtons(buttonClass) {
        let collectionButton = document.getElementsByClassName(buttonClass);
        for (let index = 0; index < collectionButton.length; index++) {
            const element = collectionButton[index];
            element.addEventListener("click", (event) => this.onClickColor(event));
        }
    }
    
    /**
     * Handles the click event on a color button.
     * @private
     * @param {Event} event - The click event object.
     */
    onClickColor(event) {
        let array = document.getElementsByClassName("color-button");
        for (let index = 0; index < array.length; index++) {
            array[index].classList.remove('active');
        }
    
        let target = 'target' in event ? event.target : event.srcElement;
        target.classList.add('active');
    
        this.colorSelected = target.style.backgroundColor;
    }

    /**
     * Gets the currently selected color.
     * @public
     * @returns {string} The selected color.
     */
    getColorSelected() {
        return this.colorSelected;
    }
}

// Export the ColorSelector class
export { ColorSelector };