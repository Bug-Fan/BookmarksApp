const addBookmark = document.querySelector("#show-modal");
const bookmarkForm = document.querySelector(".modal-container");
const closeIcon = document.getElementsByClassName("fas fa-times close-icon")[0];
const submit = document.querySelector("#Submit");
let localBookMarks = [];

bookmarkForm.style.position = 'relative';
bookmarkForm.querySelector('.modal').style.marginLeft = bookmarkForm.querySelector('.modal').style.marginRight = '30%';

const createNewBookMark = function () {    
    let flag = 0;
    event.preventDefault();

    const siteName = document.querySelector("#website-name").value;
    let siteAddress = document.querySelector("#website-url").value;

    if (siteName === '' || siteAddress === ''){
        alert("Please enter complete data.");
        return;
    }

    if (siteAddress.includes('https://'))
        console.log('Hi');
    else
        siteAddress = `https://${siteAddress}`;
    
    for (item of localBookMarks){
        if (item[0] === siteName){
            flag = 1;
            break;
        }
    }
    if (flag !== 1)
        localStorage.setItem(siteName, siteAddress);
    else 
        alert(`${siteName} already exists!`);

    location.reload();

}

const showBookMarks = function (element, container) {

    const newBookmark = document.createElement('div');
    newBookmark.className = 'item';
    newBookmark.innerHTML = `<center><h3><a href="${element[1]}" target="_blank">${element[0]}</a></h3></center><br><button onclick="deleteBookMark('${element[0]}')">Delete</button>`;
    container.append(newBookmark);

}

const displayAllBookMarks = function () {
    
    const container = document.querySelector(".container");
    localBookMarks = Array.from(Object.entries(localStorage));

    localBookMarks.forEach(element => {
        showBookMarks(element, container);
    });;
}

const deleteBookMark = function () {

    localStorage.removeItem(arguments[0]);
    alert(`${arguments[0]} deleted!`);
    location.reload();

}

const toggleBookMarkForm = function () {

    if (event.currentTarget === addBookmark) 
        bookmarkForm.style.display = 'block'
    else if (event.currentTarget === closeIcon)
        bookmarkForm.style.display = 'none';

}

addBookmark.addEventListener('click', toggleBookMarkForm);

closeIcon.addEventListener('click', toggleBookMarkForm);

submit.addEventListener('click', createNewBookMark);

document.addEventListener('DOMContentLoaded', displayAllBookMarks);