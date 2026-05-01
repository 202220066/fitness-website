
fetch("data.json")
    .then(response => response.json())
    .then(data => {
        let programTable = document.getElementById("programTable");
        if (programTable) {
            data.programs.forEach(program => {
                programTable.innerHTML += `
                    <tr>
                        <td>${program.name}</td>
                        <td>${program.duration}</td>
                        <td>${program.level}</td>
                    </tr>
                `;
            });
        }
    });
// T L
fetch("data.json")
    .then(response => response.json())
    .then(data => {
        let trainerList = document.getElementById("trainerList");
        if (trainerList) {
            data.trainers.forEach((trainer, index) => {
                let imageName = "images/trainer.jpg";
                if (index === 0) imageName = "images/trainer1.jpg";
                if (index === 1) imageName = "images/trainer2.jpg";
                if (index === 2) imageName = "images/trainer3.jpg";
                trainerList.innerHTML += `
                    <div class="card">
                        <img src="${imageName}" style="width:100%; height:200px; object-fit:cover; border-radius:10px;">
                        <h3>${trainer.name}</h3>
                        <p><strong>Specialty:</strong> ${trainer.specialty}</p>
                        <p><strong>Experience:</strong> ${trainer.experience}</p>
                    </div>
                `;
            });
        }
    });
// M F
function validateMembershipForm() {
    let name = document.getElementById("fullName").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let program = document.getElementById("program").value;
    let payment = document.getElementById("payment").value;
    if (name === "" || email === "" || phone === "" || username === "" || password === "" || program === "" || payment === "") {
        alert("Please fill all fields");
        return false;
    }
    let members = JSON.parse(localStorage.getItem("members")) || [];
    members.push({
        name: name,
        email: email,
        phone: phone,
        username: username,
        password: password,
        program: program,
        payment: payment
    });
    localStorage.setItem("members", JSON.stringify(members));
    alert("Membership registered successfully!");
    return false;
}
// C F
function validateContactForm() {
    let name = document.getElementById("contactName").value;
    let email = document.getElementById("contactEmail").value;
    let message = document.getElementById("message").value;
    if (name === "" || email === "" || message === "") {
        alert("Please fill all fields");
        return false;
    }
    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages.push({
        name: name,
        email: email,
        message: message
    });
    localStorage.setItem("messages", JSON.stringify(messages));
    alert("Message saved successfully!");
    return false;
}
// A L
function adminLogin() {
    let user = document.getElementById("adminUser").value;
    let pass = document.getElementById("adminPass").value;
    if (user === "admin" && pass === "1234") {
        document.getElementById("adminData").style.display = "block";
        let members = JSON.parse(localStorage.getItem("members")) || [];
        let messages = JSON.parse(localStorage.getItem("messages")) || [];
        let membershipData = document.getElementById("membershipData");
        let contactData = document.getElementById("contactData");
        membershipData.innerHTML = "";
        contactData.innerHTML = "";
        members.forEach(member => {
            membershipData.innerHTML += `
                <div class="admin-box">
                    <p><strong>Name:</strong> ${member.name}</p>
                    <p><strong>Email:</strong> ${member.email}</p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><strong>Username:</strong> ${member.username}</p>
                    <p><strong>Program:</strong> ${member.program}</p>
                    <p><strong>Payment:</strong> ${member.payment}</p>
                </div>
            `;
        });
        messages.forEach(msg => {
            contactData.innerHTML += `
                <div class="admin-box">
                    <p><strong>Name:</strong> ${msg.name}</p>
                    <p><strong>Email:</strong> ${msg.email}</p>
                    <p><strong>Message:</strong> ${msg.message}</p>
                </div>
            `;
        });
        return false;
    } else {
        alert("Wrong username or password");
        return false;
    }
}
// M L
function memberLogin() {
    let user = document.getElementById("loginUser").value;
    let pass = document.getElementById("loginPass").value;
    let members = JSON.parse(localStorage.getItem("members")) || [];
    let found = members.find(member => member.username === user && member.password === pass);
    if (found) {
        document.getElementById("memberInfo").innerHTML = `
            <div class="admin-box">
                <h3>Welcome ${found.name}</h3>
                <p><strong>Email:</strong> ${found.email}</p>
                <p><strong>Phone:</strong> ${found.phone}</p>
                <p><strong>Program:</strong> ${found.program}</p>
                <p><strong>Payment:</strong> ${found.payment}</p>
            </div>
        `;
    } else {
        alert("Wrong username or password");
    }
}