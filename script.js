const display = document.querySelector('.display');
const openForm = document.querySelector('.open-form');
const form = document.querySelector('form');
const elementsToBlur = document.querySelectorAll('.header, .main');

openForm.addEventListener('click', () => {
    if (openForm.textContent === "+"){
        openForm.textContent = "-"
        elementsToBlur.forEach(element => {
            element.style.filter = "blur(5px)";
          });
        form.style.transform = "scale(1)"
        form.style.opacity = "1"
    } 
    else {
        openForm.textContent = "+"
        form.style.transform = "scale(0)"
        elementsToBlur.forEach(element => {
            element.style.removeProperty('filter')
        })
    }
})

let myLibrary = [];

document.addEventListener('submit', (e)=>{
    e.preventDefault();
    let title = e.target[0].value;
    let author = e.target[1].value;
    let read = e.target[2].checked;
    let bookEntry = new Book(title, author, read)
    e.target[0].value = '';
    e.target[1].value = '';
    e.target[2].checked = false;

})

class Book{
    constructor(title, author, read){
        this.title = title;
        this.author = author;
        this.read = read;
        this.addToLibrary();
    }
    info = () => {
        return `<textarea class="inpTitle">${this.title}</textarea> by 
                <textarea class="inpAuthor">${this.author}</textarea> <span>${this.isRead()}</span>`;
    }
    isRead = () => {
        return this.read ? 'already read' : 'not read yet'
    }
    addToLibrary = () => {
        myLibrary.push(this);
        this.idx = myLibrary.indexOf(this);
        this.createCard();
    }
    createCard = () => {
        let newCard = document.createElement('div');
        let eraseBtn = document.createElement('button');
        let readBtn = document.createElement('button');
        newCard.classList.add('card');
        newCard.setAttribute("data-idx",`${this.idx}`)
        newCard.innerHTML = this.info();
        eraseBtn.classList.add(`erase`)
        eraseBtn.setAttribute("data-idx",`${this.idx}`)
        eraseBtn.textContent = 'x'
        eraseBtn.addEventListener('click', (e)=>{
            this.removeEntry(parseInt(e.target.getAttribute('data-idx')))
        })
        readBtn.classList.add('read')
        readBtn.setAttribute("data-idx",`${this.idx}`)
        if(this.read ? readBtn.innerHTML = '&#128214;'
                    : readBtn.innerHTML = '&#128213;')
        readBtn.addEventListener('click', (e) => {
            this.toggleRead(parseInt(e.target.getAttribute('data-idx')));
        })
        display.append(newCard);
        newCard.append(eraseBtn);
        newCard.append(readBtn);
    }
    removeEntry = (idx) => {
        myLibrary.splice(myLibrary.indexOf(this),1);
        display.removeChild(document.querySelector(`[data-idx="${idx}"]`))
    }
    toggleRead = (idx) => {
        this.read = !this.read;
        let span = document.querySelector(`[data-idx="${idx}"] span`);
        let btn = document.querySelector(`[data-idx="${idx}"] .read`)
        if(myLibrary[idx].read) {
            btn.innerHTML = '&#128214;'
            span.textContent = 'already read'
        }
        else {
            btn.innerHTML = '&#128213;';
            span.textContent = 'not read yet'
        }
    }
}


