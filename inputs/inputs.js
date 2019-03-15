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
                option.classList.add('selected');
                input.textContent = each.name;
            }
            optionsList.appendChild(option)
        });
        wrapper.appendChild(input)
        wrapper.appendChild(optionsList)
        wrapper.classList.add(s.PCTDropdown);
        wrapper.setAttribute('tabindex', '0');
        return wrapper;
    }
    init(){
       console.log(this);
       this.selectedOption = this.el.querySelector('li.selected');
       this.toBeSelected = this.el.querySelector('li.selected');
       this.el.addEventListener('click', this.clickHandler.bind(this));
       this.el.addEventListener('keydown', e => {
        console.log(e.keyCode);
            if ( [9,32,38,40].indexOf(e.keyCode) > -1 ){ // tab, down arrow of space bar
                if ( e.keyCode !== 9 ) {
                    e.preventDefault();
                }
                this.clickHandler.call(this, e);
            }
            if ( [13,27, 32].indexOf(e.keyCode > -1 ) ){
                if ( this.isOpen ) {
                    this.enterEscapeSpaceHandler.call(this, e);
                }
            }
        });
       
    }
    enterEscapeHandler(e){
        if ( e.keyCode === 27 ) { // esc key
            this.toBeSelected.classList.remove('selected');
            this.selectedOption.classList.add('selected');
            this.toBeSelected = this.selectedOption;
            this.isOpen = false;    
        } else {
            this.selectedOption = this.toBeSelected;
            // **** TO DO: make the statechange here 
            // displayed value is not changing
            // use setter on _selectedOption to trigger the displayed value (textContent) and the stateChange
            this.isOpen = false;
        }
    }
    clickHandler(e){
        console.log(e, this);
        if ( e.type === 'keydown' && e.keyCode === 9 ){ // tab
            if ( this.isOpen ) {
                e.preventDefault();
            }
            return;
        }
        if ( e.type === 'keydown' && [38,40].indexOf(e.keyCode) > -1 && this.isOpen ){
            
            if ( e.keyCode === 38 ) {

                if ( this.toBeSelected.previousElementSibling ) {
                    this.toBeSelected.classList.remove('selected');
                    this.toBeSelected = this.toBeSelected.previousElementSibling
                    this.toBeSelected.classList.add('selected');
                    //this.selectedOption = newSelected;
                }
                return;
            }
            if ( e.keyCode === 40 ) {
                if ( this.toBeSelected.nextElementSibling ) {
                    this.toBeSelected.classList.remove('selected');
                    this.toBeSelected = this.toBeSelected.nextElementSibling
                    this.toBeSelected.classList.add('selected');
                    //this.selectedOption = newSelected;
                }
                return;
            }
        }
        if ( this.isOpen || !this.body.UIControlIsOpen ){
            e.stopPropagation();
            this.isOpen = !this.isOpen;
        }
    }
}