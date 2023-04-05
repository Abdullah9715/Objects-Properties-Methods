function showoutput(output) {
    document.getElementById("output").innerHTML = output;
}

function getFieldValue(fieldID) {
    return document.getElementById(fieldID).value
}

function getRandomnumber() {
    return Math.random().toString(36).slice(2)
}

var emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
console.log(emailFormat.test("abc@gmail.com"))

// age calculate
function calculateage() {
    let dob = document.getElementById("dob").value;
    dob = new Date(dob);
    let currentDate = new Date();
    let month_diff = currentDate.getTime() - dob.getTime();
    let age_dt = new Date(month_diff);
    let year = age_dt.getFullYear();
    let age = Math.abs(year - 1970);
    return age + " years";
}

// Toastify



function toastify(msg, type) {

    let bgColor;
    switch (type) {
        case "success":
            bgColor = "linear-gradient(to right ,#1D976C, #93F9B9)"
            break;
        case "error":
            bgColor = "linear-gradient(to right ,#93291e, #ed213a)"
            break;
        default:
            bgColor = "linear-gradient(to bottom, #ffffcc 0%, #000000 100%);"
    }
    Toastify({
        text: msg,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: bgColor,
        },
        onClick: function() {} // Callback after click
    }).showToast();
}


// User add function

var users = [];

function user(firstName, lastName, email, dob, status, role) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.dob = dob;
    this.id = getRandomnumber();
    this.datecreated = new Date().getTime();
    this.status = status;
    this.role = role;
}

function handleSubmit() {
    event.preventDefault();


    let firstName = document.getElementById("fistName").value;
    let lastName = document.getElementById("lastName").value;
    let email = getFieldValue("email");
    let dob = getFieldValue("dob");

    if (firstName.length < 3) {
        toastify("Enter First Name")
        return;
    }

    if (!emailFormat.test(email)) {
        toastify("Enter Corrcert email")
        return;
    }
    if (dob.length < 3) {
        toastify("Enter Date of Birth")
        return;
    }

    let user = {
        firstName,
        lastName,
        fullName: firstName + " " + lastName,
        email,
        dob,
        status: "active",
        role: "student",
        Id: getRandomnumber(),
        Age: calculateage(),

    }
    for (let i = 0; i < users.length; i++) {
        if (user.email == users[i].email) {
            toastify(" This user is already registered", "warning");
            return;
        }
    }
    users.push(user)
    showTable()
    toastify("User Added Scussesfully")
}
// Show table

function showTable() {
    if (!users.length) {
        toastify("no user available")
        return;
    }
    let tablestartingCode = '<div class="table-responsive"><table class="table">';
    let tablehead = '<thead> <tr> <th scope="col">#</th><th scope="col">FirstName</th><th scope="col">LastName</th><th scope="col">Email</th> <th scope="col">Date of birth</th> <th scope="col">Age</th></tr></thead>'
    let tableEndcode = '</table></div>'
    let tablebody = '';
    for (let i = 0; i < users.length; i++) {
        tablebody += '<tr><th>' + (i + 1) + '</th><td>' + users[i].firstName + '</td><td>' + users[i].lastName + '</td><td>' + users[i].email + '</td><td>' + users[i].dob + '</td><td>' + users[i].Age + '</td><tr>';
    }
    let table = tablestartingCode + tablehead + "<tbody>" + tablebody + '</tbody>' + tableEndcode
    showoutput(table);


}
//  print in console

function printConsole() {
    if (!users.length) {
        return toastify("there is no user Exist", "warning")
    } else {
        toastify("you have been printed to console", "success")
        return console.table(users)
    }
}

//Clear Output Field 
document.getElementById("clearoutput").onclick = function() {
    document.getElementById("output").innerHTML = "";

}