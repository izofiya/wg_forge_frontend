import orders from '../data/orders.JSON';
import users from '../data/users.JSON';

export function summOrdersCount () {
    let count = 0
    orders.map(el => {
        if(el) {
            count ++;
        }
    });
    return count;
};
export function summOrdersTotal () {
    let summ = 0;
    if(orders.length) {
    orders.map(ord => {
        summ += +ord.total;
    })} else {
        summ = 'n/a';
    }
    return '$' + summ.toFixed(2);
};
export function getMedianValue() {
    let arrOrders = [];
    orders.map(ord => {
        arrOrders.push(+ord.total);
    });
    const sorted =  arrOrders.sort();
    const middle = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
        return '$' + ((sorted[middle - 1] + sorted[middle]) / 2).toFixed(2);
    }
    return sorted[middle];
};
export function getAverageCheck () {
    let summ = 0;
    let count = 0;
    if(orders.length) {
        orders.map(ord => {
            count ++;
            summ += +ord.total;
        })} else {
            summ = 'n/a';
        };
    return '$' + (summ / count).toFixed(2);
};
export function getAverageCheckFemale() {
    let summ = 0;
    let arrUsers = [];
    let countFemale = 0;
    users.map(user => {
        if(user.gender === 'Female') {
            arrUsers.push(user);
        }
    });
    orders.map(ord => {
        arrUsers.map(elem => {
            countFemale ++;
            if(ord.user_id === elem.id) {
                summ += +ord.total;
            }
        })
    })
    return '$' + (summ / countFemale).toFixed(2);
};
export function getAverageCheckMale() {
    let summ = 0;
    let arrUsers = [];
    let countMale = 0;
    users.map(user => {
        if(user.gender === 'Male') {
            arrUsers.push(user);
        }
    });
    orders.map(ord => {
        arrUsers.map(elem => {
            if(ord.user_id === elem.id) {
                countMale ++;
                summ += +ord.total;
            }
        })
    });
    return '$' + (summ / countMale).toFixed(2);
};
export function createFooterTable() {
    let tfoot = document.createElement('tfoot');
           
        let tr1 = document.createElement('tr');
        let tdOrdersCount = document.createElement('td');
        let tdOrdersCount2 = document.createElement('td');
        tdOrdersCount.textContent = 'Orders Count';
        tdOrdersCount2.textContent = summOrdersCount();
        tr1.appendChild(tdOrdersCount);
        tr1.appendChild(tdOrdersCount2);
        tfoot.appendChild(tr1);

        let tr2 = document.createElement('tr');
        let tdOrdersTotal = document.createElement('td');
        let tdOrdersTotal2 = document.createElement('td');
        tdOrdersTotal.textContent = 'Orders Total';
        tdOrdersTotal2.textContent = summOrdersTotal();
        tr2.appendChild(tdOrdersTotal);
        tr2.appendChild(tdOrdersTotal2);
        tfoot.appendChild(tr2);

        let tr3 = document.createElement('tr');
        let tdMedianValue = document.createElement('td');
        let tdMedianValue2 = document.createElement('td');
        tdMedianValue.textContent = 'Median Value';
        tdMedianValue2.textContent = getMedianValue();
        tr3.appendChild(tdMedianValue);
        tr3.appendChild(tdMedianValue2);
        tfoot.appendChild(tr3);

        let tr4 = document.createElement('tr');
        let tdAverageCheck = document.createElement('td');
        let tdAverageCheck2 = document.createElement('td');
        tdAverageCheck.textContent = 'Average Check';
        tdAverageCheck2.textContent = getAverageCheck();
        tr4.appendChild(tdAverageCheck);
        tr4.appendChild(tdAverageCheck2);
        tfoot.appendChild(tr4);

        let tr5 = document.createElement('tr');
        let tdAverageCheckFemale = document.createElement('td');
        let tdAverageCheckFemale2 = document.createElement('td');
        tdAverageCheckFemale.textContent = 'Average Check (Female)';
        tdAverageCheckFemale2.textContent = getAverageCheckFemale();
        tr5.appendChild(tdAverageCheckFemale);
        tr5.appendChild(tdAverageCheckFemale2);
        tfoot.appendChild(tr5);

        let tr6 = document.createElement('tr');
        let tdAverageCheckMale = document.createElement('td');
        let tdAverageCheckMale2 = document.createElement('td');
        tdAverageCheckMale.textContent = 'Average Check (Male)';
        tdAverageCheckMale2.textContent = getAverageCheckMale();
        tr6.appendChild(tdAverageCheckMale);
        tr6.appendChild(tdAverageCheckMale2);
        tfoot.appendChild(tr6);
        
        let tdAll = tfoot.querySelectorAll('td');
        for(var i = 0; i < tdAll.length; i++) {
           tdAll[i].style.border = '1px solid grey';
           tdAll[i].style.padding = '15px';
           tdAll[i].style.backgroundColor = '#b1aeec';
        };
    return tfoot;
};
