import Selectr from 'mobius1-selectr/dist/selectr.min.js';
import { DOMHelpers as $d } from '@Utils';

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