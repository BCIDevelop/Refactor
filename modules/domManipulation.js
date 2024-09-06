const contactList = document.getElementById('contactList');

export const addContactDOM = function(contacts){
    contacts.forEach(contact => {
        const li = document.createElement('li');
        li.classList.add('contact-item');
        li.setAttribute('data-id', contact.id);
        li.innerHTML = `<strong>${contact.name}</strong> - ${contact.phone} <button class="edit-btn">Edit</button> <button class="delete-btn">Delete</button>`;
        contactList.appendChild(li);
      });
}