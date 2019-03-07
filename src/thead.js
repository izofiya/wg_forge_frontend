
let arrTableTh = ['Transaction ID', 'User Info', 'Order Date', 'Order Amount', 'Card Number', 'Card Type', 'Location'];

export function createTable () {
    let table = document.createElement('table');
    return table;
};
export function createSearch () {
    let trSearch = document.createElement('tr');
    let th = document.createElement('th');
    th.textContent = 'Search: ';
    let thInput = document.createElement('th');
    let input = document.createElement('input');
    input.addEventListener('change', onChange);
    input.type = 'text';
    input.id = 'search';
    th.style.padding = '16px';
    th.style.backgroundColor = '#b1aeec';
    thInput.appendChild(input);
    trSearch.appendChild(th);
    trSearch.appendChild(thInput);
return trSearch;
}; 
export function onChange (e) {
    let search = e.target.value;
    console.log(search);  
};
export function createThead () {
    let thead = document.createElement('thead');
    let trSearch2 = createSearch();
    let tr = document.createElement('tr');
    thead.appendChild(trSearch2);
    thead.appendChild(tr);
    arrTableTh.map(elem => {
        let th = document.createElement('th');
        th.style.border = '2px solid black';
        tr.appendChild(th);
        th.textContent = elem;
    });
    return thead;
};