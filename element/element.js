import $d from './../../helpers/dom-helpers.js';
export default class Element {
    constructor(selector, model = null){
        if ( typeof selector !== 'string' ){
            throw `First parameter must be a string referencing the CSS-like selector of the element to be created 
                    ("div#divID.divClass").`;
        } 
        this.selector = selector;
        this.model = model;
        this.el = this.prerender(arguments); // will call the instance's prerender
        this.isReady = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        })
    }
    prerender(){
        var existing = $d.q(this.selector);
        if ( existing ) {
            this.prerendered = true;
            
            return existing;
        }
        var el = $d.c(this.selector);
        return el;
    }
    init(){
        
    }
}