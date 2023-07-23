var SITE_NAME = document.getElementById("siteName");
var SITE_URL = document.getElementById("siteUrl");
// Get the modal and the button to open the modal
const modal = document.getElementById("myModal");
const openModalBtn = document.getElementById("openModalBtn");

var bookMarks = [];
if (localStorage.getItem("BookMarks") != null) {
    bookMarks = JSON.parse(localStorage.getItem("BookMarks"));
    displayBookMarks();
}

function addBookMark() {
    if (checkName() == true && checkUrl() == true) {


        var item = {
            siteName: SITE_NAME.value,
            siteUrl: SITE_URL.value,
        }
        bookMarks.push(item);
        localStorage.setItem("BookMarks", JSON.stringify(bookMarks));
        clearForm();
    }
    else {
        modal.style.display = "block";
    }
    displayBookMarks();


    console.log(bookMarks);
}
window.addEventListener("click", function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
function displayBookMarks() {
    var temp = "";
    for (let i = 0; i < bookMarks.length; i++) {
        temp += ` 
        <tr>
        <td>${i + 1}</td>
        <td>${bookMarks[i].siteName}</td>
        <td><a class="btn btn-gerrn" href="${bookMarks[i].siteUrl}" target="_blank"><i class="fa-solid fa-eye"></i> Visit</a></td>
        <td><button class="btn btn-danger" onclick="deleteBookMarks(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
      </tr>`
    }
    document.getElementById("data").innerHTML = temp
}


function deleteBookMarks(x) {
    console.log(x);
    bookMarks.splice(x, 1);
    localStorage.setItem("BookMarks", JSON.stringify(bookMarks));
    displayBookMarks();

}

function clearForm() {
    SITE_NAME.value = ""
    SITE_URL.value = ""
}


function checkName() {
    var regexName = /^[A-Za-z]{3,15}$/
    var res = regexName.test(SITE_NAME.value)
    console.log(res);
    if (res == false) {
        document.getElementById("siteName").classList.add("is-invalid")
        return false;
    } else {
        document.getElementById("siteName").classList.replace("is-invalid", "is-valid")

        return true;
    }
}
function checkUrl() {
    var regexName = /^(https?:\/\/)?([a-zA-Z0-9.-]+)(\.[a-zA-Z]{2,})(:[0-9]+)?(\/[^\s]*)?$/;
    var res = regexName.test(SITE_URL.value)
    console.log(res);
    if (res == false) {
        document.getElementById("siteUrl").classList.add("is-invalid")
        return false;
    } else {
        document.getElementById("siteUrl").classList.replace("is-invalid", "is-valid")

        return true;
    }
}
openModalBtn.addEventListener("click", function () {
    modal.style.display = "block";
});

window.addEventListener("click", function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
const closeBtn = modal.querySelector(".close");
closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
});
