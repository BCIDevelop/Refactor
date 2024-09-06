export const sanitizeInputs = function(stringValue){
    return stringValue.replace(/[&<>"'/]/g, function (match) {
        const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '/': '&#x2F;' };
        return map[match];
      }).trim()
}

export const testInputs = function(name,phone){
    if (!/^[A-Za-z\s]+$/.test(name)) {
        const nameError = document.createElement('span');
        nameError.classList.add('error');
        nameError.textContent = 'Name should contain only letters.';
        document.getElementById('name').insertAdjacentElement('afterend', nameError);
        setTimeout(function () { nameError.remove(); }, 1500);
        return false;
      }

      if (!/^[0-9]+$/.test(phone)) {
        const phoneError = document.createElement('span');
        phoneError.classList.add('error');
        phoneError.textContent = 'Phone should contain only numbers.';
        document.getElementById('phone').insertAdjacentElement('afterend', phoneError);
        setTimeout(function () { phoneError.remove(); }, 1500);
        return false;
      }
      return true

}