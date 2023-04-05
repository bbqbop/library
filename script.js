const display = document.querySelector('.display');
const openForm = document.querySelector('.open-form');
const form = document.querySelector('form');
const elementsToBlur = document.querySelectorAll('.header, .main');
const toggleForm = function() {
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
}

openForm.addEventListener('click', toggleForm)
document.addEventListener('submit', (e)=>{
    e.preventDefault();
    let title = e.target[1].value;
    let author = e.target[2].value;
    let length = e.target[3].value;
    let read = e.target[4].checked;
    let bookEntry = new Book(title, author, length, read)
    e.target[1].value = '';
    e.target[2].value = '';
    e.target[3].value = '';
    e.target[4].checked = false;
    toggleForm();
})

let myLibrary = [];
let primaryKey = 0;
class Book{
    constructor(title, author, length, read){
        this.title = title;
        this.author = author;
        this.length = length ? parseInt(length) : 0;
        this.read = read;
        this.addToLibrary();
    }
    info = () => {
        return `<textarea class="inpTitle" data-idx=${this.idx}>${this.title}</textarea> 
                by 
                <textarea class="inpAuthor" data-idx=${this.idx}>${this.author}</textarea> 
                <div class="inpLength" data-idx=${this.idx}><input type="number" value="${this.length}"><span>pages</span></div> 
                <span>${this.isRead()}</span>`;
    }
    isRead = () => {
        return this.read ? 'Finished reading' : 'Currently reading'
    }
    isLength = (element) => {
        let span = element.lastChild
        if(this.length){
            span.style.display = 'inline'
        } else span.style.display = 'none'
    }
    addToLibrary = () => {
        myLibrary.push(this);
        this.idx = primaryKey;
        this.createCard();
        primaryKey++;
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
        eraseBtn.textContent = '+'
        eraseBtn.style.transform = 'rotate(-45deg)'
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
        this.updateEntry();
    }
    removeEntry = (idx) => {
        myLibrary.splice(myLibrary.indexOf(this),1);
        display.removeChild(document.querySelector(`[data-idx="${idx}"]`))
    }
    toggleRead = (idx) => {
        this.read = !this.read;
        let span = document.querySelector(`[data-idx="${idx}"] span`);
        let btn = document.querySelector(`[data-idx="${idx}"] .read`)
        btn.innerHTML = this.read ? '&#128214;' : '&#128213;'
        span.textContent = this.isRead();
    }
    updateEntry = () => {
        const inpTitle = document.querySelector(`.inpTitle[data-idx="${this.idx}"]`);
        const inpAuthor = document.querySelector(`.inpAuthor[data-idx="${this.idx}"]`);
        const inpLength = document.querySelector(`.inpLength[data-idx="${this.idx}"]`);
        inpTitle.addEventListener('change', (e)=>{
            this.title = e.target.value
        })
        inpAuthor.addEventListener('change', (e)=>{
            this.author = e.target.value
        })
        inpLength.firstElementChild.addEventListener('change', (e) => {
            this.length = parseInt(e.target.value);
            this.isLength(inpLength)
        })
        this.isLength(inpLength)
    }
}

// drag openForm Button

let isDown = false;
openForm.addEventListener('mousedown', (e) => {
    isDown = true;
})
document.addEventListener('mouseup', (e) => {
    isDown = false;
})
document.addEventListener('mousemove', (e) => {
    if (isDown) {
        let posX = e.clientX;
        let posY = e.clientY;
        if(posX >= window.innerWidth - 50){
            posX = window.innerWidth - 50;
        }
        if(posY >= window.innerHeight - 50){
            posY = window.innerHeight - 50;
        }
        if(posY <= 0){
            posY = 0
        }
        let rect = openForm.getBoundingClientRect();
        openForm.style.left = posX + 'px';
        openForm.style.top = posY + 'px';
    }

})

