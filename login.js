/* User and Admin login */

let RegisterUserDataBase=JSON.parse(localStorage.getItem("userdatabase")) || [];


let UserEmailAddress=document.querySelector("#abhay_email_input");
let UserPassword=document.querySelector("#abhay_password_input");
let UserLoginButton=document.querySelector("#abhay_login_button");

UserLoginButton.addEventListener("click",function(e){

    e.preventDefault()

    if(UserEmailAddress.value==="admin" && UserPassword.value==="admin"){

        window.location="/admin.html"
    } else if(UserEmailAddress.value && UserPassword.value){
let logedInPerson = []
        let obj={
            username:UserEmailAddress.value,
            password:UserPassword.value
        }
        let found=0;

        for(let user of RegisterUserDataBase){
            if(user.useremail===obj.username && user.userpass===obj.password){
                logedInPerson.push(user)
               found=1;
               break;

            }
        }

        if(found===1){
            localStorage.setItem("logedinPerson", JSON.stringify(logedInPerson))
            window.location.href = "/product.html"
        }

        else{
            console.log("wrong details.")
            alert("User dosen't exists, Register yourself")
        }

    }
    else{
        console.log("wrong details.")
        alert("Please add full Details")
    }

})



/* User and Admin login */



// Code for redirect to home
let imagelink = document.getElementById("abhay_homeLink")
imagelink.addEventListener("click", ()=>{
    window.location.href = "index.html"
})
// Code for redirect to home
