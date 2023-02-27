let Customermainsection=document.getElementById("Sanketh-customers-append")
let Customerpaginationpart=document.getElementById("Sanketh-customers-pagination-part")




fetchandRender("1")
function fetchandRender(pageno){
    fetch(`https://63ca7e2e4f53a00420242ac5.mockapi.io/User?page=${pageno}&limit=3`,{
    method:`GET`,
    headers:{
        'content-type':'application/json'
    },
    })
    .then((res)=>{
        if(res.ok){
         return res.json()
        }
        // console.log(res.headers.get("X-Total-Count"));
        
    })
    .then((data)=>{
        console.log(data);
        
        Customermainsection.innerHTML=renderData(data)
        
       
        



        let deleteButton=document.querySelectorAll(".Sanketh-delete-link")
        console.log(deleteButton)
        for(let deletelink of deleteButton){
            deletelink.addEventListener("click",(e)=>{
                e.preventDefault()
                let deleteID=e.target.id
                console.log(deleteID)
                alert("Product has been delivered!")
                deleteItem(deleteID)
            })
        }
        // filterData(data)
    })
    .catch(error=> console.log(error))
}


function renderData(data){
    let cardlist=data.map((item)=>{
    return getcard(item.id,item.Cname,item.Caddress,item.Czip,item.Cphone)

    }).join("")
    return `<div class="Sanketh-card-list">${cardlist}</div>`;
   
}



function getcard(id,CustomerName,CustomerAddress,Pincode,PhoneNo){
    return `<hr>
    <tr >
     <td>${id}</td>
     <td>${CustomerName}</td>
     <td>${CustomerAddress}</td>
     <td>${Pincode}</td>
     <td>${PhoneNo}</td>
     <td><button class="Sanketh-delete-link" id=${id} >Delete</button>
    </tr>
    <br>`
    
    }

    function addbutton(){
        let btn="";
        for(let i=1;i<=6;i++){
            btn=btn+getButton(i,i)
        }
        Customerpaginationpart.innerHTML=btn
    }
    addbutton()
    
    function getButton(pno,text){
        return `<button class="Sanketh-customerspagination-buttons" data-page-number="${pno}">${text}</button>`
    }
    
    let buttons =document.querySelectorAll(".Sanketh-customerspagination-buttons")
    
    paginationData()
    function paginationData(){
        for(let btn of buttons){
            btn.addEventListener("click",function(e){
                let pagenumber=e.target.dataset.pageNumber;
                console.log("click")
                fetchandRender(pagenumber)
            })
        }
    }

    const debounce = (func, delay) => {
        let debounceTimer;
        return function (...args) {
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => func(...args), delay);
        };
      };
      
    let input = document.getElementById("inputcustomer");
  
    async function fetchItems(query) {
      console.log(`fetch request made`)
      let res = await fetch(`https://63ca7e2e4f53a00420242ac5.mockapi.io/User?q=${query}`);
      let data = await res.json();
      console.log(data)
      let searchParams=input.value;
      let filtered=data.filter((element)=>{
          if(element.Cname.toUpperCase().includes(searchParams.toUpperCase())===true){
            return true
          }else {
            return false
          }
          
        })
        console.log(filtered)
        Customermainsection.innerHTML=renderData(filtered)
    }
    
    let betterFetchItems = debounce(fetchItems, 1000);
    
    input.addEventListener("keyup", function (e) {
      betterFetchItems(e.target.value);
     
    });