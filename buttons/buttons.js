import Element from './../element/';
export class Button extends Element {
    constructor(_selector, options){
        
        var selector = _selector === 'defer' ? 'button#' + options.data.key : _selector;
        
        super(selector, options);
        if ( typeof options.data !== 'object' || options.data.key === undefined || options.data.name === undefined || typeof selector !== 'string' ){
             throw 'Parameter 1 needs to be be a string (selector); param 2 needs to be an object with key and name values';
        }
        this.defaultEventHandler = function(){
             // TO DO: here put in pubSub or setState as default 
        };
    }
    prerender(){
        var btn = super.prerender();
        if ( this.prerendered && !this.rerender ) {
            return btn;
        }
        
        btn.setAttribute('value', this.data.key);
        btn.innerHTML = this.data.name;
        return btn;
    }
    init(){
        this.el.addEventListener('click', this.defaultEventHandler);
    }
}

export class SubmitButton extends Element {
    constructor(selector = 'button'){
        super(selector);
        this.defaultEventHandler = function(){
             // TO DO: here put in pubSub or setState as default 
        };
    }
    prerender(){
        var btn = super.prerender();
        if ( this.prerendered ) {
            return btn;
        }
        btn.setAttribute('type', 'submit');
        return btn;
    }
    init(){
        this.el.addEventListener('click', this.defaultEventHandler);
    }
}