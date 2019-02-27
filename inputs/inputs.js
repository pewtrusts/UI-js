import { DOMHelpers as $d } from '@Utils';
import Element from './../element/';

export class TextInput extends Element {
    constructor(selector = 'input', options){
        super(selector, options);
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
   /* constructor(){
        super(...arguments);
    }*/
    prerender(){
        
        var input = super.prerender();
        if ( this.prerendered ) {
            return input;
        }
        this.data.forEach(each => {
            
            var option = $d.c('option');
            option.setAttribute('value', each.value);
            option.innerHTML = each.name;
            input.appendChild(option)
        });
        
        return input;
    }
    init(){
        
        this.data.forEach((each, i)=> {
            
            this.el.options[i].pctModel = each; // HERE
        });
    }
}