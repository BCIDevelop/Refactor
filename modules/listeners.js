
let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
const contactList = document.getElementById('contactList');
const addContactBtn = document.getElementById('addContactBtn');
const contactForm = document.getElementById('contacts');
const filterInput = document.getElementById('filter');
import { sanitizeInputs, testInputs ,filterContacts} from "../utils/regexUtils.js";
import { addContactDOM } from "./domManipulation.js";
let myListener 

const addButtonHandler = function (e,contactId) {
  const updatedName = document.getElementById('name').value.trim();
  const updatedPhone = document.getElementById('phone').value.trim();
  if(!testInputs(updatedName,updatedPhone)) return
  contacts = contacts.map(contact => contact.id === Number(contactId) ? { ...contact, name: updatedName, phone: updatedPhone } : contact );
  localStorage.setItem('contacts', JSON.stringify(contacts));
  contactList.innerHTML = '';
  addContactDOM(contacts)
  contactForm.reset();
  addContactBtn.textContent = 'Add Contact';
  addContactBtn.removeEventListener('click',myListener)
  contactForm.addEventListener('submit' ,submitHandler);
}
 
export const submitHandler = function(e){
    e.preventDefault();
    const nameValue = document.getElementById('name').value;
    const name = sanitizeInputs(nameValue)
    const phoneValue = document.getElementById('phone').value
    const phone = sanitizeInputs(phoneValue)
    const terms = document.getElementById('terms').checked;
    if(!testInputs(name,phone)) return
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
    addContactDOM(contacts)
    contactForm.reset();
  }

  export const contactClickHandler = function (e) {
    if (e.target.classList.contains('delete-btn')) {
      const contactId = e.target.parentElement.getAttribute('data-id');
      contacts = contacts.filter( contact => contact.id !== Number(contactId));
      localStorage.setItem('contacts', JSON.stringify(contacts));
      contactList.innerHTML = '';
      addContactDOM(contacts)
    } else if (e.target.classList.contains('edit-btn')) {
      const contactId = e.target.parentElement.getAttribute('data-id');
      const contactToEdit = contacts.find( contact => contact.id === Number(contactId));
      document.getElementById('name').value = contactToEdit.name;
      document.getElementById('phone').value = contactToEdit.phone;
      addContactBtn.textContent = 'Update Contact';
      contactForm.removeEventListener('submit',submitHandler)
      myListener =function(e){
        addButtonHandler(e,contactId)
      }
      addContactBtn.addEventListener('click' ,myListener)
    }
  }

  export const filterInputHandler = function () {
    console.log(filterInput.value)
    const filterValue = filterInput.value;
    const filteredContacts =contacts.filter(element=> filterContacts(filterValue,element.name) || filterContacts(filterValue,element.phone)) 
    contactList.innerHTML = '';
    addContactDOM(filteredContacts)

  }

  export const clearFilterClickHandler = function () {
    filterInput.value = '';
    contactList.innerHTML = '';
    addContactDOM(contacts)
  }