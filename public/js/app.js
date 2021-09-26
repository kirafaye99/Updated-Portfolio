const contactForm = document.querySelector('.contact-form');
let name = document.getElementById('name');
let email = document.getElementById('email');
let phone = document.getElementById('phone');
let message = document.getElementById('message');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log('submit clicked');

    let formData = {
        name: name.value,
        email: email.value,
        phone: phone.value,
        message: message.value
    }

    // console.log(formData);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function(){
        console.log(xhr.responseText);
        if(xhr.responseText == 'success'){
            alert('Message sent!');
            name.value = '';
            email.value = '';
            phone.value = '';
            message.value = '';
        } else{
            alert('Oops! Something went wrong!')
        }
    }

    xhr.send(JSON.stringify(formData));
})