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
    set selectedOption(item) {
        this._selectedOption = item;
        this.isOpen = false;
        this.input.textContent = this._selectedOption.innerText;

        if ( this.onChange ) {
            this.onChange();
        } else {
            console.log('Instance of Dropdown class needs an onChange method to handle selection of a new value');
        }
    }
    get selectedOption() {
        return this._selectedOption;
    }
    prerender(){
        
        var wrapper = super.prerender();
        if ( this.prerendered ) {
            return wrapper;
        }
        var input = $d.c('div.js-input-div');

        var optionsList = $d.c('ul');
        this.data.forEach(each => {
            
            var option = $d.c('li');
            option.setAttribute('data-value', each.value);
            option.setAttribute('aria-role', 'option');
            option.innerHTML = each.name;

            option.id = 'dropdown-item-' + each.value;
            if ( each.selected ){
                option.setAttribute('aria-selected', 'true');
                option.classList.add('selected');
                input.textContent = each.name;
            }
            optionsList.appendChild(option)
        });
        wrapper.appendChild(input)
        wrapper.appendChild(optionsList)
        wrapper.classList.add(s.PCTDropdown);
        wrapper.setAttribute('aria-role','listbox');
        wrapper.setAttribute('tabindex', '0');
        return wrapper;
    }
    init(){
       console.log(this);
       this.input = this.el.querySelector('.js-input-div');
       this.el.querySelectorAll('li').forEach(item => {
            item.addEventListener('click', e => {
                e.stopPropagation();
                this.itemClickHandler(item);
            });
       }); 
       this._selectedOption = this.el.querySelector('li.selected');
       this.toBeSelected = this.el.querySelector('li.selected');
       this.el.addEventListener('click', this.clickHandler.bind(this));
       this.el.addEventListener('keydown', e => {
            console.log(e.keyCode);
            if ( e.keyCode === 9 ) {
                this.tabHandler.call(this,e);
                return;
            }
            if ( [32,38,40].indexOf(e.keyCode) > -1 ){ // 32 space, 38 up arrow, 40 down arrow
                e.preventDefault(); // prevent scrolling on space and arrow
                this.spaceAndArrowHandler.call(this, e);
                return;
            }
            if ( [13,27].indexOf(e.keyCode > -1 ) ){ // 13 enter, 27 escape
                if ( this.isOpen ) {
                    this.enterAndEscapeHandler.call(this, e);
                }
                return;
            }
        });
       
    }
    itemClickHandler(item){
        console.log(this,item);
        this.toBeSelected.classList.remove('selected');
        this.toBeSelected.removeAttribute('aria-selected');
        this.toBeSelected = item;
        this.toBeSelected.classList.add('selected');
        this.toBeSelected.setAttribute('aria-selected', 'true');
        this.el.setAttribute('activedescendant', item.id);
        this.selectedOption = this.toBeSelected;
    }
    enterAndEscapeHandler(e){ // only called is this.isOpen
        if ( e.keyCode === 27 ) { // esc key
            console.log('escape key');
            this.toBeSelected.classList.remove('selected');
            this.selectedOption.classList.add('selected');
            this.toBeSelected = this.selectedOption;
            this.isOpen = false;    
        } else {
            this.selectedOption = this.toBeSelected;
        }
    }
    spaceAndArrowHandler(e){
        if ( e.keyCode === 32 ) { // space
            if ( !this.isOpen ) {
                this.isOpen = true;
            } else {
                // here call to fn that selects the toBeSlected option
            }
            return;
        }
        // arrow keys
        if ( !this.isOpen ){
            this.isOpen = true;
            return;
        }
        // is open
        {
            let next = e.keyCode === 38 ? this.toBeSelected.previousElementSibling : this.toBeSelected.nextElementSibling; 
            if ( next ) { // if there is an option before/after the currently toBeSelected option, make that the toBeSelected option
                this.toBeSelected.classList.remove('selected');
                this.toBeSelected = next;
                this.toBeSelected.classList.add('selected');
            }
        }
    }
    tabHandler(e){
        if ( this.isOpen ){
            e.preventDefault();
        }
    }
    clickHandler(e){
        if ( this.isOpen || !this.body.UIControlIsOpen ){
            e.stopPropagation();
            this.isOpen = !this.isOpen;
        }
    }
}