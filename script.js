const display = document.querySelector('.display');
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
        return `<h2>${this.title}</h2> by ${this.author} <span>${this.isRead()}</span>`;
    }
    isRead = () => {
        return this.read ? 'already read' : 'not read yet'
    }
    addToLibrary = () => {
        myLibrary.push(this);
        this.idx = myLibrary.indexOf(this)
        this.createCard();
    }
    createCard = () => {
        let newCard = document.createElement('div');
        let eraseBtn = document.createElement('button');
        this.readBtn = document.createElement('button');
        newCard.classList.add(`card${this.idx}`);
        newCard.innerHTML = this.info();
        eraseBtn.classList.add(`${this.idx}`)
        eraseBtn.textContent = 'x'
        eraseBtn.addEventListener('click', ()=>{
            this.removeEntry(this.idx);
        })
        this.readBtn.classList.add(`read${this.idx}`)
        if(this.read ? this.readBtn.innerHTML = '&#128214;'
                    : this.readBtn.innerHTML = '&#128213;')
        this.readBtn.addEventListener('click', () => {
            this.toggleRead(this.idx);
        })
        display.append(newCard);
        newCard.append(eraseBtn);
        newCard.append(this.readBtn);
    }
    removeEntry = (idx) => {
        myLibrary.pop(this.idx)

        display.removeChild(document.querySelector(`.card${idx}`))
    }
    toggleRead = (idx) => {
        let span = document.querySelector(`.card${idx} span`);
        myLibrary[idx].read = myLibrary[idx].read ? false : true;
        if(myLibrary[idx].read) {
            this.readBtn.innerHTML = '&#128214;'
            span.textContent = 'already read'
        }
        else {
            this.readBtn.innerHTML = '&#128213;';
            span.textContent = 'not read yet'
        }
    }
}

