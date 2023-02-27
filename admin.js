let mainsection=document.getElementById("Sanketh-order-append")
let paginationButton=document.getElementById("Sanketh-orderpagination-part")
let filterBy=document.getElementById("Sanketh-order-filter")




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
        
        mainsection.innerHTML=renderData(data)
        
       
        



        let deliveredButton=document.querySelectorAll(".Sanketh-delivered-link")
        console.log(deliveredButton)
        for(let deliveredlink of deliveredButton){
            deliveredlink.addEventListener("click",(e)=>{
                e.preventDefault()
                let deliveredID=e.target.id
                console.log(deliveredID)
                alert("Product has been delivered!")
                deliveredItem(deliveredID)
            })
        }
        // filterData(data)
    })
    .catch(error=> console.log(error))
}

function deliveredItem(id){
    let remove=fetch(`https://63ca7e2e4f53a00420242ac5.mockapi.io/User/${id}`,{
        method:'DELETE',
    })
    .then(res=>{
        return res.json()
    }).then(data =>{
        remove=remove.filter((ele)=>{
            return ele.id!==data.id
        })
        renderData("1")
    }).catch(error=>{
    
    })
    }


function renderData(data){
    let cardlist=data.map((item)=>{
    return getcard(item.id,item.Cname,item.Caddress,item.Czip,item.Cphone,item.image,item.title,item.price,item.status)

    }).join("")
    return `<div class="Sanketh-card-list">${cardlist}</div>`;
   
}



function getcard(id,CustomerName,CustomerAddress,Pincode,PhoneNo,image,ProductName,price){
    return `<hr>
    <tr >
     <td>${id}</td>
     <td>${CustomerName}</td>
     <td>${CustomerAddress}</td>
     <td>${Pincode}</td>
     <td>${PhoneNo}</td>
     <td><img src="${image}" class="order_card__img" ></td>
     <td>${ProductName}</td>
     <td>${price}</td>
     <td id="status">Order:${getRandomItem(words)}</td>
     <td><button class="Sanketh-delivered-link" id=${id} >Delivered</button>
    </tr>
    <br>`
    
    }



    const words=['Confirmed','Shipped','Out for Delivery','Delivered']
    function getRandomItem(words){
        let randomIndex=Math.floor(Math.random()*words.length);
        let item=words[randomIndex]
        return item
    }



    function addbutton(){
        let btn="";
        for(let i=1;i<=6;i++){
            btn=btn+getButton(i,i)
        }
        paginationButton.innerHTML=btn
    }
    addbutton()
    
    function getButton(pno,text){
        return `<button class="Sanketh-orderpagination-buttons" data-page-number="${pno}">${text}</button>`
    }
    
    let buttons =document.querySelectorAll(".Sanketh-orderpagination-buttons")
    
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


    // filterBy.addEventListener("change",()=>{
    //     fetchandRenderfilterdata()
    // })

    // function filterData(data){
    // let filterValue=filterBy.value
    // let status=document.getElementById("status")
    // if(filterValue=""){
    //    fetchandRender(data)
    // }else{
    //     data=data.filter(()=>{
    //         return status.innerText==filterValue
    //     })
    //   mainsection.innerHTML=renderData(data)
    // }
    // }
    
    const debounce = (func, delay) => {
        let debounceTimer;
        return function (...args) {
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => func(...args), delay);
        };
      };

    let input = document.getElementById("inputorder");
  
    async function fetchItems(query) {
      console.log(`fetch request made`)
      let res = await fetch(`https://63ca7e2e4f53a00420242ac5.mockapi.io/User?q=${query}`);
      let data = await res.json();
      console.log(data)
      let searchParams=input.value;
      let filtered=data.filter((element)=>{
          if(element.title.toUpperCase().includes(searchParams.toUpperCase())===true){
            return true
          }else {
            return false
          }
          
        })
        console.log(filtered)
        mainsection.innerHTML=renderData(filtered)
    }
    
    let betterFetchItems = debounce(fetchItems, 1000);
    
    input.addEventListener("keyup", function (e) {
      betterFetchItems(e.target.value);
    
    });
    









    