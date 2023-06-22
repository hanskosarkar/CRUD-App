console.log("js working fine");

const addBtn = document.getElementById("add-btn");
const modal = document.querySelector(".modal");
const closeIcon = document.getElementById("closeIcon");


addBtn.addEventListener("click", function () {
    modal.classList.add("active");
    registeFormEl.reset("");
    profile_pic.src = "avtar.png";
    registerBtn.disabled = false;
    updateBtn.disabled = true;
    // alert();
});

closeIcon.addEventListener("click", function () {
    modal.classList.remove("active");
});


// All global variables start here

const registerBtn = document.getElementById("registerBtn");
const updateBtn = document.getElementById("updateBtn");
const profile_pic = document.getElementById("profilePic");
const IdEL = document.getElementById("id");
const nameEl = document.querySelector("#name");
const l_nameEl = document.querySelector("#l-name");
const emailEL = document.querySelector("#email");
const officeCodeEL = document.getElementById("office-code");
const jobTitleEL = document.querySelector("#job-title");
const registeFormEl = document.getElementById("registeForm");
const tableData = document.querySelector("#table-data");
let imgUrl;

// All global variables end here


// Register new user -- fucntion Registeruser

registerBtn.addEventListener("click", function (event) {
    event.preventDefault();
    registerData();
    getDataFromLocalStorage();
    registeFormEl.reset("");
    closeIcon.click();

});

function registerData() {
    //userData array stores data of user
    let data = [];
    // data = data !== localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : [];
    data = JSON.parse(localStorage.getItem("userData")) || [];

    // Set the profile picture to default if no custom picture is uploaded
//   const profilePic = uploadField.value !== "" ? imgUrl : "avatar.png";
    
    // alert(imgUrl)
    data.push({
        id: IdEL.value,
        name: nameEl.value,
        l_name: l_nameEl.value,
        email: emailEL.value,
        officeCode: officeCodeEL.value,
        jobTitle: jobTitleEL.value,
        profilePic: uploadField.value !== "" ? imgUrl : "avtar.png"
    });

    //store the data in localstorage
    localStorage.setItem("userData", JSON.stringify(data));

    swal("Good job!", "Registered Successfully!", "success");
}

// retrieve data from localstorage and load the data

const getDataFromLocalStorage = () => {
    let userData;
    if (localStorage.getItem("userData") !== null) {
        userData = JSON.parse(localStorage.getItem("userData"));
    }
    else {
        userData = [];
    }

    tableData.innerHTML = "";
    userData.forEach((data, index) => {
   
        tableData.innerHTML += `
        
        <tr index = ${index}>
            <td>${index + 1}</td>
            <td><img src = "${data.profilePic}" width ="60px" height = "60px" ></td>
            <td>${data.id}</td>
            <td>${data.name}</td>
            <td>${data.l_name}</td>
            <td>${data.email}</td>
            <td>${data.officeCode}</td>
            <td>${data.jobTitle}</td>
            <td>
                <button class="editBtn"><i class="fa fa-eye"></i></button>
                <button class="delBtn" style=" background-color: #EE534F;"><i class="fa fa-trash"></i></button>
            </td>
        </tr>

        `;
    })


    // start code for delete button

    // let allDelBtn = document.getElementsByClassName(".delBtn");
    let allDelBtn = document.querySelectorAll(".delBtn");
    let i;
    for (i = 0; i < allDelBtn.length; i++) {

        allDelBtn[i].addEventListener("click", function () {
            let tr = this.parentNode.parentNode;
            let rowIndex = tr.getAttribute("index");

            // userData.splice(rowIndex, 1);
            // localStorage.setItem("userData", JSON.stringify(userData));
            // tr.remove();

            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this data!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        userData.splice(rowIndex, 1);
                        localStorage.setItem("userData", JSON.stringify(userData));
                        tr.remove();
                        swal(" Your data has been deleted successfully!", {
                            icon: "success",
                        });
                    } else {
                        swal("Your data is safe!");
                    }
                });

        })

    }


    // start update coding 

    let allEditBtn = document.querySelectorAll(".editBtn");
    // console.log(allEditBtn);
    for (i = 0; i < allEditBtn.length; i++) {
        allEditBtn[i].addEventListener("click", function () {
            let tr = this.parentNode.parentNode;
            let td = tr.querySelectorAll("td");
            let rowIndex = tr.getAttribute("index");
            let id = td[2].innerHTML;
            let name = td[3].innerHTML;
            let l_name = td[4].innerHTML;
            let email = td[5].innerHTML;
            let officeCode = td[6].innerHTML;
            let jobTitle = td[7].innerHTML;
            let profilePic = td[1].querySelector("img").src;
            // alert(jobTitle);
            addBtn.click();
            registerBtn.disabled = true;
            updateBtn.disabled = false;
            IdEL.value = id;
            nameEl.value = name;
            l_nameEl.value = l_name;
            emailEL.value = email;
            officeCodeEL.value = officeCode;
            jobTitleEL.value = jobTitle;
            profile_pic.src = profilePic;

            updateBtn.onclick = function (e) {
                e.preventDefault();
                userData[rowIndex] = {
                    id: IdEL.value,
                    name: nameEl.value,
                    l_name: l_nameEl.value,
                    email: emailEL.value,
                    officeCode: officeCodeEL.value,
                    jobTitle: jobTitleEL.value,
                    profilePic: uploadField.value == "" ? profilePic : imgUrl
                }

                localStorage.setItem("userData", JSON.stringify(userData));
                getDataFromLocalStorage();
                registeFormEl.reset("");
                profile_pic.src = "avtar.png";
                closeIcon.click();
                swal("Good job!", " Data updated Successfully!", "success");
            }
        })
    }
}

getDataFromLocalStorage();



const uploadField = document.getElementById("upload-field");

uploadField.addEventListener("change", (event) => {
    if (event.target.files[0].size < 1000000) {
        const file = event.target.files[0];
        const freader = new FileReader();

        freader.onload = (e) => {
            imgUrl = e.target.result;
            profile_pic.src = imgUrl;
        }
        freader.readAsDataURL(file);
    }
    else {
        alert("File size is too large.")
    }
})