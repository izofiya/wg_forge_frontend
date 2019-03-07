import orders from '../data/orders.JSON';
import users from '../data/users.JSON';
import companies from '../data/companies.JSON';

export function createTable () {
    let table = document.createElement('table');
    return table;
};

export function convertDate (valueDate) {
    let dateTable = new Date(valueDate*1000);
    let dd = dateTable.getDate();
    let mm = dateTable.getMonth() + 1;
    let yyyy = dateTable.getFullYear();
    let hours = dateTable.getHours();
    let ampm = hours < 12 ? 'AM' : 'PM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    let min = '0' + dateTable.getMinutes();
    let sec = '0' + dateTable.getSeconds();
    let time = dd + '/' + mm + '/' + yyyy + ', ' + hours + ':' + min.substr(-2) + ':' + sec.substr(-2) + ' ' + ampm;
    return time;
};
export function convertCardNumber (valueCardNumber) {
    let cardNumberTable = valueCardNumber.slice(0, 2) + '********' + valueCardNumber.slice(-4);
    return cardNumberTable;
};
export function userInfo (id) {
    let userValue;
    users.map(user => {
        if(user.id === id) {
           userValue = (user.gender === 'Male') ? ('Mr. ' + user.first_name + ' ' + user.last_name) : ('Ms. ' + user.first_name + user.last_name)
        }
    });
    return userValue;
};
export function convertDateBirthday (valueDate) {
    let dateTable = new Date(valueDate*1000);
    let dd = '0' + dateTable.getDate();
    let mm = '0' + dateTable.getMonth() + 1;
    let yyyy = dateTable.getFullYear();
    let time = dd.substr(-2) + '/' + mm.substr(-2) + '/' + yyyy;
    return time;
};
export function userBlock (orderUserId) {
    let divUserBlock = document.createElement('div');
    divUserBlock.className = 'user-details';
    divUserBlock.style.display = 'none';
        users.map(user => {
            if(user.id === orderUserId) {
            let pBirthday = document.createElement('p');
            pBirthday.textContent = 'Birthday: ' + convertDateBirthday(user.birthday);
            divUserBlock.appendChild(pBirthday);
            let pAvatar = document.createElement('p');
            let pImg = document.createElement('img');
            pImg.src = user.avatar;
            pImg.style.width = '100px';
            pAvatar.appendChild(pImg);
            divUserBlock.appendChild(pAvatar);
            let pCompany = document.createElement('p');
            pCompany.innerHTML = 'Company: ';
            let aCompany = document.createElement('a');

                companies.map(company => {
                    if (user.company_id === company.id) {
                    aCompany.href = company.url;
                    aCompany.target = "_blank";
                    aCompany.textContent = company.title;
                    }
                }); 
            pCompany.appendChild(aCompany);
            divUserBlock.appendChild(pCompany);
            let pIndustry = document.createElement('p');
            
                companies.map(company => {
                    if (user.company_id === company.id) {
                    pIndustry.innerHTML = 'Industry: ' + company.industry + '/' + company.sector;
                    divUserBlock.appendChild(pIndustry);
                    }
                });
            }
        });
        return divUserBlock;
};
export function onClick (evt) {
    if(evt.target.nextElementSibling.style.display === 'none'){
        evt.target.nextElementSibling.style.display = 'block';
    } else if (evt.target.nextElementSibling.style.display === 'block') {
        evt.target.nextElementSibling.style.display = 'none';
    } else {
        evt.target.nextElementSibling.style.display = 'block';
    }
};

export function createContentTable () {
    let tbody = document.createElement('tbody');
    orders.map(order => {
        let tr = document.createElement('tr');
        tr.id = 'order_' + order.id;

        let tdTransactionId = document.createElement('td');
        let tdUserId = document.createElement('td');
        tdUserId.className = "user-data";
        let tdCreatedAt = document.createElement('td');
        let tdTotal = document.createElement('td');
        tdTotal.className = 'amount';
        let tdCardNumber = document.createElement('td');
        let tdCardType = document.createElement('td');
        let tdOrderCountryAndIp = document.createElement('td');
        
        tdTransactionId.textContent = order.transaction_id;
        tdUserId.innerHTML = '<a href="#">' + userInfo(order.user_id) + '</a>';
        tdUserId.appendChild(userBlock(order.user_id));
        tdCreatedAt.textContent = convertDate(order.created_at);
        tdTotal.textContent = '$' + order.total;
        tdCardNumber.textContent = convertCardNumber(order.card_number);
        tdCardType.textContent = order.card_type;
        tdOrderCountryAndIp.textContent = order.order_country + ' (' + order.order_ip + ')';
        
        tr.appendChild(tdTransactionId);
        tr.appendChild(tdUserId);
        tr.appendChild(tdCreatedAt);
        tr.appendChild(tdTotal);
        tr.appendChild(tdCardNumber);
        tr.appendChild(tdCardType);
        tr.appendChild(tdOrderCountryAndIp);
        tdUserId.firstElementChild.addEventListener('click', onClick);
        tbody.appendChild(tr);
        let tdAll = tr.querySelectorAll('td');
         for(var i = 0; i < tdAll.length; i++) {
            tdAll[i].style.border = '1px solid grey';
            tdAll[i].style.padding = '10px';
            tdAll[i].style.backgroundColor = '#eafdec';
         }
    });
    return tbody;
};


