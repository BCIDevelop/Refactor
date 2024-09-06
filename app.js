import { submitHandler ,contactClickHandler,filterInputHandler,clearFilterClickHandler} from "./modules/listeners.js";
import { addContactDOM } from "./modules/domManipulation.js";
let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
const contactList = document.getElementById('contactList');
const filterInput = document.getElementById('filter');
const clearFilterBtn = document.getElementById('clearFilterBtn');
const contactForm = document.getElementById('contacts');

contactForm.addEventListener('submit',submitHandler)

contactList.addEventListener('click', contactClickHandler)

filterInput.addEventListener('input', filterInputHandler);

clearFilterBtn.addEventListener('click',clearFilterClickHandler );

addContactDOM(contacts)
