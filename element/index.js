import { DOMHelpers as $d } from '@Utils';
export default class Element {
    constructor(selector, options){
        if ( typeof selector !== 'string' ){
            throw `First parameter must be a string referencing the CSS-like selector of the element to be created 
                    ("div#divID.divClass").`;
        } 
        this.selector = selector;
        this.model = options.model;
        this.parent = options.parent; // parent is a JS object
        this.renderToSelector = options.renderToSelector;
        this.container = $d.q(this.renderToSelector);
        this.children = options.children;
        this.rerender = ( options.rerenderOnDataMismatch && options.model.isMismatched );
        this.data = options.data;
        this.createComponent = options.createComponent || null; // null option for backward compatibility. previous version don't send this property
        this.el = this.prerender(arguments); // will call the instance's prerender
        this.isReady = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
        
    }
    prerender(){
        
        var existing = $d.q(this.selector);
        if ( existing && !this.rerender ) {
                // ie is existing and no need to rerender
            this.prerendered = true;
            
            return existing;
        } else if ( existing ) { // ie is existing but there is a need to rerender
            
            existing.innerHTML = '';
            return existing;
        }
        var el = $d.c(this.selector);
        return el;
    }
    init(){
        
    }
}