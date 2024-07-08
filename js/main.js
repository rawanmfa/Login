var signupName = document.querySelector('#signupName');
var signupEmail = document.querySelector('#signupEmail');
var signupPassword = document.querySelector('#signupPassword');
var signupbtn = document.querySelector('#signupbtn');
var loginEmail = document.querySelector('#loginEmail');
var loginPassword = document.querySelector('#loginPassword');
var Loginbtn = document.querySelector('#Loginbtn');
var welcome = document.querySelector('.welcome')
var data;

if (localStorage.getItem("data")==null) {
    data=[];
}else{
    data=JSON.parse(localStorage.getItem("data"));
}

function signUP() {
    var existingMessage = document.querySelector('.text-danger, .text-success');
    if (existingMessage) {
        existingMessage.remove();
    }
    var signP = document.createElement('p');
    var dataItem={
        name:signupName.value,
        email:signupEmail.value,
        pass:signupPassword.value,
    }
    if (isEmpty() == false) {
        signP.appendChild(document.createTextNode('All inputs are required'));
        signP.classList.add('text-danger', 'm-3');
        signupbtn.parentNode.insertBefore(signP, signupbtn);
    } else if (exist() == false) {
        signP.appendChild(document.createTextNode('Email already exists'));
        signP.classList.add('text-danger', 'm-3');
        signupbtn.parentNode.insertBefore(signP, signupbtn);
    } else {
        data.push(dataItem);
        clearForm();
        signP.appendChild(document.createTextNode('Success'));
        signP.classList.add('text-success', 'm-3');
        signupbtn.parentNode.insertBefore(signP, signupbtn);
        localStorage.setItem("data", JSON.stringify(data));
    }
}
// signupbtn.addEventListener('click',signUP);

function clearForm() {
    signupName.value=null;
    signupEmail.value=null;
    signupPassword.value=null;
}
function clearloginform() {
    loginEmail.value=null;
    loginPassword.value=null;
}
function isEmpty() {
    return !(signupName.value == "" || signupEmail.value == "" || signupPassword.value == "");
}
function exist() {
    for (var i = 0; i < data.length; i++) {
        if (data[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
            return false;
        }
        else{
            return true;
        }
    }
}

function isLoginEmpty() {
    return !(loginEmail.value == "" || loginPassword.value == "");
}
function Login() {
    var existingloginMessage = document.querySelector('.text-danger');
    if (existingloginMessage) {
        existingloginMessage.remove();
    }
    var loginP = document.createElement('p');
    var isLoginSuccessful = false;

    if (isLoginEmpty() == false) {
        loginP.appendChild(document.createTextNode('All inputs are required'));
        loginP.classList.add('text-danger', 'm-3');
        Loginbtn.parentNode.insertBefore(loginP, Loginbtn);
    } else {
        for (var i = 0; i < data.length; i++) {
            if (data[i].email.toLowerCase() == loginEmail.value.toLowerCase() && data[i].pass.toLowerCase() == loginPassword.value.toLowerCase()) {
                isLoginSuccessful = true;
                welcome.classList.remove('d-none');
                document.querySelector('#username').innerHTML = `Welcome ${data[i].name}`;
                clearloginform();
                break;
            }
        }
        if (!isLoginSuccessful) {
            loginP.appendChild(document.createTextNode('Incorrect email or password'));
            loginP.classList.add('text-danger', 'm-3');
            Loginbtn.parentNode.insertBefore(loginP, Loginbtn);  
        }
    }
}
function Logout() {
    welcome.classList.add('d-none');
}
// Loginbtn.addEventListener('click',Login);