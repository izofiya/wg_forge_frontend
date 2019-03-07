import { createTable, createContentTable } from './tableAndTbody.js';
import {  createFooterTable } from './tfoot.js';
import {  createThead } from './thead.js';

export default (function () { 
    let app = document.getElementById('app');  
    let table = createTable();
    let thead = createThead();
    let tbody = createContentTable();
    let tfoot = createFooterTable();
    app.appendChild(table);
    table.appendChild(thead);
    table.appendChild(tbody);
    table.appendChild(tfoot);
}());