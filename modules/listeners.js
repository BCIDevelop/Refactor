
let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
const contactList = document.getElementById('contactList');
const addContactBtn = document.getElementById('addContactBtn');
const contactForm = document.getElementById('contacts');
const filterInput = document.getElementById('filter');
import { sanitizeInputs, testInputs } from "../utils/regexUtils.js";

const addButtonHandler = function (e) {
  const updatedName = document.getElementById('name').value.trim();
  const updatedPhone = document.getElementById('phone').value.trim();
  const contactId = e.target.parentElement.getAttribute('data-id');
  testInputs(updatedName,updatedPhone)
  contacts = contacts.map(contact => contact.id === Number(contactId) ? { ...contact, name: updatedName, phone: updatedPhone } : contact );
  localStorage.setItem('contacts', JSON.stringify(contacts));
  contactList.innerHTML = '';
  contacts.forEach( contact => {
    const li = document.createElement('li');
    li.classList.add('contact-item');
    li.setAttribute('data-id', contact.id);
    li.innerHTML = `<strong>${contact.name}</strong> - ${contact.phone} <button class="edit-btn">Edit</button> <button class="delete-btn">Delete</button>`;
    contactList.appendChild(li);
  });
  contactForm.reset();
  addContactBtn.textContent = 'Add Contact';
}


export const submitHandler = function(e){
    e.preventDefault();
    const nameValue = document.getElementById('name').value;
    const name = sanitizeInputs(nameValue)
    const phoneValue = document.getElementById('phone').value
    const phone = sanitizeInputs(phoneValue)
    const terms = document.getElementById('terms').checked;
    testInputs(name,phone)
    if (!name || !phone || !terms) {
      const error = document.createElement('span');
      error.classList.add('error');
      error.textContent = 'Please fill in all fields and accept the terms';
      addContactBtn.insertAdjacentElement('afterend', error);
      setTimeout(() => { error.remove(); }, 1500);
      return;
    }
    const newContact = { id: Date.now(), name, phone };
    contacts.push(newContact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    contactList.innerHTML = '';
    contacts.forEach(contact => {
      const li = document.createElement('li');
      li.classList.add('contact-item');
      li.setAttribute('data-id', contact.id);
      li.innerHTML = `<strong>${contact.name}</strong> - ${contact.phone} <button class="edit-btn">Edit</button> <button class="delete-btn">Delete</button>`;
      contactList.appendChild(li);
    });
    contactForm.reset();
  }

  export const filterClickHandler = function (e) {
    if (e.target.classList.contains('delete-btn')) {
      const contactId = e.target.parentElement.getAttribute('data-id');
      contacts = contacts.filter( contact => contact.id !== Number(contactId));
      localStorage.setItem('contacts', JSON.stringify(contacts));
      contactList.innerHTML = '';
      contacts.forEach(contact => {
        const li = document.createElement('li');
        li.classList.add('contact-item');
        li.setAttribute('data-id', contact.id);
        li.innerHTML = `<strong>${contact.name}</strong> - ${contact.phone} <button class="edit-btn">Edit</button> <button class="delete-btn">Delete</button>`;
        contactList.appendChild(li);
      });
    } else if (e.target.classList.contains('edit-btn')) {
      const contactId = e.target.parentElement.getAttribute('data-id');
      const contactToEdit = contacts.find( contact => contact.id === Number(contactId));
      document.getElementById('name').value = contactToEdit.name;
      document.getElementById('phone').value = contactToEdit.phone;
      addContactBtn.textContent = 'Update Contact';
      addContactBtn.addEventListener('click' ,addButtonHandler);
    }
  }

  export const filterInputHandler = function () {
    const filterValue = '';
    const filteredContacts =[] 
    contactList.innerHTML = '';
    filteredContacts.forEach(contact => {
      const li = document.createElement('li');
      li.classList.add('contact-item');
      li.setAttribute('data-id', contact.id);
      li.innerHTML = `<strong>${contact.name}</strong> - ${contact.phone} <button class="edit-btn">Edit</button> <button class="delete-btn">Delete</button>`;
      contactList.appendChild(li);
    });
  }

  export const clearFilterClickHandler = function () {
    filterInput.value = '';
    contactList.innerHTML = '';
  }