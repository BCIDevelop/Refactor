
let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
const contactList = document.getElementById('contactList');
const addContactBtn = document.getElementById('addContactBtn');
const contactForm = document.getElementById('contacts');
export const submitHandler = function(e){
    e.preventDefault();
    const name = document.getElementById('name').value.replace(/[&<>"'/]/g, function (match) {
      const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '/': '&#x2F;' };
      return map[match];
    }).trim();
  
    const phone = document.getElementById('phone').value.replace(/[&<>"'/]/g, function (match) {
      const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '/': '&#x2F;' };
      return map[match];
    }).trim();
  
    const terms = document.getElementById('terms').checked;
  
    if (!/^[A-Za-z\s]+$/.test(name)) {
      const nameError = document.createElement('span');
      nameError.classList.add('error');
      nameError.textContent = 'Name should contain only letters.';
      document.getElementById('name').insertAdjacentElement('afterend', nameError);
      setTimeout(function () { nameError.remove(); }, 1500);
      return;
    }
  
    if (!/^[0-9]+$/.test(phone)) {
      const phoneError = document.createElement('span');
      phoneError.classList.add('error');
      phoneError.textContent = 'Phone should contain only numbers.';
      document.getElementById('phone').insertAdjacentElement('afterend', phoneError);
      setTimeout(function () { phoneError.remove(); }, 1500);
      return;
    }
  
    if (!name || !phone || !terms) {
      const error = document.createElement('span');
      error.classList.add('error');
      error.textContent = 'Please fill in all fields and accept the terms';
      addContactBtn.insertAdjacentElement('afterend', error);
      setTimeout(function () { error.remove(); }, 1500);
      return;
    }
  
    const newContact = { id: Date.now(), name: name, phone: phone };
    contacts.push(newContact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
  
    contactList.innerHTML = '';
    contacts.forEach(function (contact) {
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
      contacts = contacts.filter(function (contact) {
        return contact.id !== Number(contactId);
      });
      localStorage.setItem('contacts', JSON.stringify(contacts));
      contactList.innerHTML = '';
      contacts.forEach(function (contact) {
        const li = document.createElement('li');
        li.classList.add('contact-item');
        li.setAttribute('data-id', contact.id);
        li.innerHTML = `<strong>${contact.name}</strong> - ${contact.phone} <button class="edit-btn">Edit</button> <button class="delete-btn">Delete</button>`;
        contactList.appendChild(li);
      });
    } else if (e.target.classList.contains('edit-btn')) {
      const contactId = e.target.parentElement.getAttribute('data-id');
      const contactToEdit = contacts.find(function (contact) {
        return contact.id === Number(contactId);
      });
      document.getElementById('name').value = contactToEdit.name;
      document.getElementById('phone').value = contactToEdit.phone;
  
      addContactBtn.textContent = 'Update Contact';
      addContactBtn.onclick = function () {
        const updatedName = document.getElementById('name').value.trim();
        const updatedPhone = document.getElementById('phone').value.trim();
  
        if (!/^[A-Za-z\s]+$/.test(updatedName)) {
          const nameError = document.createElement('span');
          nameError.classList.add('error');
          nameError.textContent = 'Name should contain only letters.';
          document.getElementById('name').insertAdjacentElement('afterend', nameError);
          setTimeout(function () { nameError.remove(); }, 1500);
          return;
        }
  
        if (!/^[0-9]+$/.test(updatedPhone)) {
          const phoneError = document.createElement('span');
          phoneError.classList.add('error');
          phoneError.textContent = 'Phone should contain only numbers.';
          document.getElementById('phone').insertAdjacentElement('afterend', phoneError);
          setTimeout(function () { phoneError.remove(); }, 1500);
          return;
        }
  
        contacts = contacts.map(function (contact) {
          return contact.id === Number(contactId) ? { ...contact, name: updatedName, phone: updatedPhone } : contact;
        });
  
        localStorage.setItem('contacts', JSON.stringify(contacts));
        contactList.innerHTML = '';
        contacts.forEach(function (contact) {
          const li = document.createElement('li');
          li.classList.add('contact-item');
          li.setAttribute('data-id', contact.id);
          li.innerHTML = `<strong>${contact.name}</strong> - ${contact.phone} <button class="edit-btn">Edit</button> <button class="delete-btn">Delete</button>`;
          contactList.appendChild(li);
        });
  
        contactForm.reset();
        addContactBtn.textContent = 'Add Contact';
      };
    }
  }

  export const filterInputHandler = function () {
    const filterValue = '';
    const filteredContacts =[] 
    contactList.innerHTML = '';
    filteredContacts.forEach(function (contact) {
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