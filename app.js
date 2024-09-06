import { submitHandler ,filterClickHandler,filterInputHandler,clearFilterClickHandler} from "./modules/listeners.js";

let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
const contactList = document.getElementById('contactList');
const filterInput = document.getElementById('filter');
const clearFilterBtn = document.getElementById('clearFilterBtn');
const contactForm = document.getElementById('contacts');

contactForm.addEventListener('submit',submitHandler)

contactList.addEventListener('click', filterClickHandler)

filterInput.addEventListener('input', filterInputHandler);

clearFilterBtn.addEventListener('click',clearFilterClickHandler );

contacts.forEach(function (contact) {
  const li = document.createElement('li');
  li.classList.add('contact-item');
  li.setAttribute('data-id', contact.id);
  li.innerHTML = `<strong>${contact.name}</strong> - ${contact.phone} <button class="edit-btn">Edit</button> <button class="delete-btn">Delete</button>`;
  contactList.appendChild(li);
});