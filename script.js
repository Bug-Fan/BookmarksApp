const addBookmark = document.querySelector("#show-modal");
const bookmarkForm = document.querySelector(".modal-container");
const closeIcon = document.getElementsByClassName("fas fa-times close-icon")[0];
const submit = document.querySelector("#Submit");
let localBookMarks = [];

bookmarkForm.style.position = 'relative';
bookmarkForm.querySelector('.modal').style.marginLeft = bookmarkForm.querySelector('.modal').style.marginRight = '30%';

const createNewBookMark = function () {   

    event.preventDefault();
    
    let flag = 0;
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
        
        if (Object.keys(JSON.parse(item))[0] === siteName){
        
            flag = 1;
            break;
        
        }
    
    }
    if (flag !== 1){

        let newObj = new Object();
        newObj[`${siteName}`] = siteAddress;
        localBookMarks.push(JSON.stringify(newObj))
        localStorage.setItem("bookmarkApp", localBookMarks);
    
    }
    else 
        alert(`${siteName} already exists!`);

    location.reload();

}

const showBookMarks = function (element, container) {

    const newBookmark = document.createElement('div');
    newBookmark.className = 'item';
    newBookmark.innerHTML = `<center><h3><a href="${Object.values(element)}" target="_blank">${Object.keys(element)}</a></h3></center><br><button onclick="deleteBookMark('${Object.keys(element)}')">Delete</button>`;
    container.append(newBookmark);
}

const displayAllBookMarks = function () {

    if (localStorage.bookmarkApp === undefined){
        
        localStorage.setItem('bookmarkApp', '');
        return;

    }

    if (localStorage.bookmarkApp === '')
        console.log("No bookarks available");
    
    else {

        const container = document.querySelector(".container");
        localBookMarks = localStorage.bookmarkApp.split(',');
        
        localBookMarks.forEach(element => {
            showBookMarks(JSON.parse(element), container);
        });

    }

}

const deleteBookMark = function () {

    for (item of localBookMarks)
        if (Object.keys(JSON.parse(item))[0] === arguments[0])
            localBookMarks.splice(localBookMarks.indexOf(JSON.parse(item)), 1);
    
    localStorage.setItem('bookmarkApp', localBookMarks);
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