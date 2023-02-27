let mainsection=document.getElementById("Sanketh-product-append")
let paginationButton=document.getElementById("Sanketh-pagination-part")
let updateButton=document.getElementById("Sanketh-products-update")
let addProductsButton=document.getElementById("Sanketh-products-add")



let IdInputValue=document.getElementById("Sanketh-id-value")
let ImageInputValue=document.getElementById("Sanketh-image-value")
let NameInputValue=document.getElementById("Sanketh-name-value")
let CategoryInputValue=document.getElementById("Sanketh-category-value")
let DescriptionInputValue=document.getElementById("Sanketh-Description-value")
let PriceInputValue=document.getElementById("Sanketh-price-value")

fetchandRender("1")
function fetchandRender(pageno){
    fetch(`https://63c63ce0d307b76967351ede.mockapi.io/product?page=${pageno}&limit=6`,{
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
        



        let deleteButton=document.querySelectorAll(".Sanketh-delete-link")
        console.log(deleteButton)
        for(let deletelink of deleteButton){
            deletelink.addEventListener("click",(e)=>{
                e.preventDefault()
                let deleteID=e.target.id
                console.log(deleteID)
                alert("Product has been deleted!")
                deleteItem(deleteID)
            })
        }





        let editButton=document.querySelectorAll(".Sanketh-edit-link")
        console.log(editButton)
        for(let editLink of editButton){
        editLink.addEventListener("click",(e)=>{
        e.preventDefault();
        console.log("click")
        let editID=e.target.id
        console.log(editID)
        populateEditForms(editID)

      
       
    })
}

    })
    .catch(error=> console.log(error))
}



function renderData(data){
    let cardlist=data.map((item)=>{
    return getcard(item.id,item.image,item.title,item.category,item.Description,item.price)

    }).join("")
    return `<div class="Sanketh-card-list">${cardlist}</div>`;
   
}







function populateEditForms(editID){
    let products="product"
    fetch(`https://63c63ce0d307b76967351ede.mockapi.io/${products}/${editID}`)
    .then((res)=>res.json())
    .then((data)=>{
    //   console.log(data.title) 
    IdInputValue.value = data.id;
    ImageInputValue.value=data.image;
    NameInputValue.value=data.title;
    CategoryInputValue.value=data.category;
    DescriptionInputValue.value=data.Description;
    PriceInputValue.value=data.price

    });

}


function getcard(id,image,name,category,Description, prize){
return `<hr>
<tr >
 <td>${id}</td>
 <td><img src="${image}" class="card__img" ></td>
 <td>${name}</td>
 <td>${category}</td>
 <td>${Description}</td>
 <td>${prize}</td>
 <td><button class="Sanketh-edit-link" id=${id}>Edit</button>
 <td><button class="Sanketh-delete-link" id=${id} >Delete</button>
</tr>
<br>`

}



function deleteItem(id){
let remove=fetch(`https://63c63ce0d307b76967351ede.mockapi.io/product/${id}`,{
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

function addbutton(){
    let btn="";
    for(let i=1;i<=6;i++){
        btn=btn+getButton(i,i)
    }
    paginationButton.innerHTML=btn
}
addbutton()

function getButton(pno,text){
    return `<button class="Sanketh-pagination-buttons" data-page-number="${pno}">${text}</button>`
}

let buttons =document.querySelectorAll(".Sanketh-pagination-buttons")

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

updateButton.addEventListener("click",function(e){
    e.preventDefault()
    alert("Product details has been updated!")
    let id=IdInputValue.value;
    let image=ImageInputValue.value;
    let name=NameInputValue.value;
    let category=CategoryInputValue.value;
    let description=DescriptionInputValue.value;
    let price=PriceInputValue.value
    updateDetails(id,image,name,category,description,price)
    fetchandRender("1")
})


function updateDetails(id,image,name,category,description,price){
    let products="product"
    fetch(`https://63c63ce0d307b76967351ede.mockapi.io/product/${id}`,{
        method:'PUT',
        body:JSON.stringify({
            id:id,
            image:image,
            title:name,
            category:category,
            description:description,
            price:price
        }),
        headers:{
            'Content-type':'application/json'
        }
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        fetchandRender("1")
    })
}


addProductsButton.addEventListener("click",(e)=>{
    e.preventDefault()
    alert("Product has been added!")
    let id=IdInputValue.value;
    let image=ImageInputValue.value;
    let name=NameInputValue.value;
    let category=CategoryInputValue.value;
    let description=DescriptionInputValue.value;
    let price=PriceInputValue.value;
    addProducts(id,image,name,category,description,price)
    fetchandRender("1")

})

function addProducts(id,image,name,category,Description,price){
fetch(`https://63c63ce0d307b76967351ede.mockapi.io/product`,{
    method:"POST",
    body:JSON.stringify({
            id:id,
            image:image,
            title:name,
            category:category,
            Description:Description,
            price:price
    }),
    headers:{
        'Content-type':'application/json'
    }
})
    .then(res => res.json())
    .then(data=>{
        console.log(data)
        fetchandRender("1")
    })
}



// -----------------------------------------debouncing search----------------------------------------------

const debounce = (func, delay) => {
    let debounceTimer;
    return function (...args) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func(...args), delay);
    };
  };
  
  let input = document.getElementById("input");
  
  async function fetchItems(query) {
    console.log(`fetch request made`)
    let res = await fetch(`https://63c63ce0d307b76967351ede.mockapi.io/product?q=${query}`);
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


