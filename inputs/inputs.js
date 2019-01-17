import Selectr from '../../vendor/selectr.js'; 
import $d from './../../helpers/dom-helpers.js';
import Element from './../element/element.js';

export class TextInput extends Element {
    constructor(selector = 'input'){
        super(selector);
    }
    prerender(){
        var input = super.prerender();
        if ( this.prerendered ) {
            return input; 
        }
        input.setAttribute('type', 'text');
        return input;
    }
    init(){
        
    }
}

export class Dropdown extends Element {
    constructor(){
        super(...arguments);
    }
    prerender(){
        
        var input = super.prerender();
        if ( this.prerendered ) {
            return input;
        }
        this.model.forEach(each => {
            
            var option = $d.c('option');
            option.setAttribute('value', each.value);
            option.innerHTML = each.name;
            input.appendChild(option)
        });
        
        return input;
    }
    init(){
        
        this.model.forEach((each, i)=> {
            
            this.el.options[i].pctModel = each; // HERE
        });
    }
}

export class Mobius1Selectr { // probably acts on a dropdown but does not inherit from Dropdown
    constructor(selector, config){
        this.el = selector instanceof HTMLElement ? selector : $d.q(selector);  // pass in either the element itself or its selector
        this.config = config;
        this.init();
    }
    init(){
       
       this.Selectr = new Selectr(this.el, this.config);
    }
}