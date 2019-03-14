import { DOMHelpers as $d } from '@Utils';
import Element from './../element/';
import s from './styles.scss';

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
    constructor(selector, options){
        console.log(selector);
        var el = selector.split('.')[0].split('#')[0],
            klass,
            id;

        if ( el !== 'div' ) {
            if ( selector.split('.').length > 1 ){
                klass = selector.split('.')[0].split('#')[0]; 
            }
            if ( selector.split('#').length > 1 ){
                id = selector.split('#')[0].split('.')[0]; 
            }  
            console.log('Dropdown element must be a div; coercing . . .');
            el = 'div';
            selector = el + ( id !== undefined ? '#' + id : '' ) + ( klass !== undefined ? '.' + klass : '' );
        }

        super(selector, options);

        this.options = this.el.querySelector('ul');
        this.body = document.querySelector('body');
        this._isOpen = false;
    }
    set isOpen(bool){

        this._isOpen = bool;
        function bodyClickHandler(){
            this.isOpen = false;
        }
        if ( bool ){
            this.el.classList.add(s.isOpen);
            this.body.UIControlIsOpen = true;
            this.body.addEventListener('click', bodyClickHandler.bind(this));
        } else {
            this.el.classList.remove(s.isOpen);
            this.body.UIControlIsOpen = false;
            this.body.removeEventListener('click', bodyClickHandler.bind(this));   
        }
    }
    get isOpen() {
        return this._isOpen;
    }
    prerender(){
        
        var wrapper = super.prerender();
        if ( this.prerendered ) {
            return wrapper;
        }
        var input = $d.c('div');
        var optionsList = $d.c('ul');
        this.data.forEach(each => {
            
            var option = $d.c('li');
            option.setAttribute('data-value', each.value);
            option.innerHTML = each.name;
            if ( each.selected ){
                option.setAttribute('selected', 'selected');
            }
            optionsList.appendChild(option)
        });
        wrapper.appendChild(input)
        wrapper.appendChild(optionsList)
        wrapper.classList.add(s.PCTDropdown);
        return wrapper;
    }
    init(){
       console.log(this);
       this.el.addEventListener('click', this.clickHandler.bind(this));
    }
    clickHandler(e){
        if ( this.isOpen || !this.body.UIControlIsOpen ){
            e.stopPropagation();
            this.isOpen = !this.isOpen;
        }
    }
}