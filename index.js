// Code for account info details
let paragraphAC = document.getElementById("abhay_account_para");
let userInfo = JSON.parse(localStorage.getItem("logedinPerson")) || [];

if(userInfo.length !== 0) {
    let str = ` <i class="fa-regular fa-user abhayPara"></i>
    ${userInfo[0].ufname}`
    paragraphAC.innerHTML = str
 
}else {
    let str = ` <i class="fa-regular fa-user abhayPara"></i>
    My Account & Orders`
    paragraphAC.innerHTML = str
}
// Code for account info details



// Code for Dark Mode

let topN = document.getElementById("abhay_nav_uppermost")
let midN = document.getElementById("abhay_nav_middle")
let botN = document.getElementById("abhay_nav_bottom")
let butD = document.getElementById("dark_mode")
let body = document.querySelector("body")
let account = document.getElementById("abhay_accounts")
let cart = document.getElementById("abhay_addToCart")
let search = document.getElementById("search")
let para = document.querySelectorAll(".abhayPara")
let footer = document.querySelector("footer")

butD.addEventListener("click", ()=>{
    if(butD.innerHTML === "Night") {
        topN.style.backgroundColor = "#1b1a1a";
        midN.style.backgroundColor = "#3a3a3b";
        botN.style.backgroundColor = "#3a3a3b"
        body.style.backgroundColor = "#242525"
        footer.style.backgroundColor = "#3a3a3b"
        botN.style.border = "none"
        account.style.backgroundColor = "#2a2b2a"
        cart.style.backgroundColor = "#2a2b2a"
        search.style.backgroundColor = "#2a2b2a"
        for(let i = 0; i < para.length; i++) {
            para[i].style.color = "white"
        }
        butD.innerText = "Day"
    }else if(butD.innerHTML === "Day") {
        topN.style.backgroundColor = "#303e35";
        midN.style.backgroundColor = "#edf1ef";
        botN.style.backgroundColor = "white"
        body.style.backgroundColor = "white"
        footer.style.backgroundColor = "#303e35"
        botN.style.border = "1px solid #bfc4c1"
        account.style.backgroundColor = "white"
        cart.style.backgroundColor = "white"
        search.style.backgroundColor = "white"
        for(let i = 0; i < para.length; i++) {
            para[i].style.color = "black"
        }
        butD.innerText = "Night"
    }
})
// Code for Dark Mode


// Code for hover button creation

let signinOuter = document.getElementById("abhay_accounts")
let singin = document.getElementById("abhay_account_details")
signinOuter.addEventListener("mouseenter", ()=>{
    let userInfo = JSON.parse(localStorage.getItem("logedinPerson")) || []
    console.log(userInfo)
    let divO = document.createElement("div");
    if(userInfo.length !== 0) {
        console.log("bhari")
        let div1 = document.createElement("button");
        div1.setAttribute("class", "loginOp")
        div1.innerText = "Log out"
        div1.addEventListener("click", ()=>{
            userInfo = [];
            localStorage.setItem("logedinPerson", JSON.stringify(userInfo))
            window.location.href = "/index.html";
        })
        if(butD.innerText === "Day") {
            divO.style.backgroundColor = "#1b1a1a"
        }
        divO.append(div1)
        singin.append(divO)
    }else {
console.log("khali")
    
    let div1 = document.createElement("button");
    div1.setAttribute("class", "loginOp")
    div1.innerText = "Sign in"
    div1.addEventListener("click", ()=>{
        window.location = "login.html"
    })
    let div2 = document.createElement("button");
    div2.innerText = "Create Account"
    div2.setAttribute("class", "signupOp")
    div2.addEventListener("click", ()=>{
        window.location.href = "signup.html";
    })
if(butD.innerText === "Day") {
    divO.style.backgroundColor = "#1b1a1a"
}
    divO.append(div1, div2)
   singin.append(divO)
}
})
signinOuter.addEventListener("mouseleave", ()=>{
    singin.innerText = ""
})
// Code for hover button creation

// Code for redirect to home
let imagelink = document.getElementById("abhay_homeLink")
imagelink.addEventListener("click", ()=>{
    window.location.href = "index.html"
})
// Code for redirect to home


