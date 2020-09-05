let cartDiv = document.getElementById('cartItemDiv')

let cartItem = JSON.parse(window.localStorage.getItem('cartItem'))
// console.log(cartItem)

const changeqty = (id,th)=>{
   let cart = cartItem.map(item =>{
        if(item.id == id){
            item.qty = th.value
        }
        return item
     })
     console.log(cart)
     window.localStorage.removeItem('cartItem')
     window.localStorage.setItem('cartItem', JSON.stringify(cart))
     location.reload()
}

const removeit =(id )=>{
    let cart = cartItem.map(item =>{
        if(item.id == id){
            return 0
        }
        return item
     })
     console.log(cart)
     window.localStorage.removeItem('cartItem')
     window.localStorage.setItem('cartItem', JSON.stringify(cart))
     location.reload()
}

cartItem.map(item =>{
    if(item){
        let dtv =document.createElement('div')
        dtv.innerHTML =`
                                <div class="mt-3 px-3 row" style ="border-bottom: 1px solid black; width:">
                                <div class=" col-lg-3 col-md-3 col-3" style="background-size: 100% 100%;">
                                    <img src="../${item.image}" alt="${item.name}">
                                </div>
                                <div class=" col-lg-9 col-md-9 col-9 pl-5">
                                    <div class="row">
                                        <h4> ${item.name} </h4>  <h4 class=" ml-auto"> $ ${item.price} </h4>
                                    </div>
                                    QTY : <input type="number" name="qty" id="qty"  min="1" onchange="changeqty(${item.id},this)" value=${item.qty} class="w-50">
                                    
                                    <form><input type="submit" class="btn btn-danger mt-1" onclick="removeit(${item.id})" value="Remove"></form>
                                </div>
                            </div>
                           `
        cartDiv.append(dtv)
    }
   
})



let detaildiv = document.getElementById('details_cart')
let totleNum =0 
let gt = 0
cartItem.map(item =>{
       if(item){
        totleNum += parseInt( item.qty)
        gt += parseInt((item.qty * item.price))
        detaildiv.innerHTML=`
                                <div class=" container-fluid p-4 mt-5" style=" border: 1px solid black; border-radius : 2rem;">
                                <h2>Subtotal ( ${totleNum} items ) : $ ${gt}</h2>
                                <a href="/checkout/${gt}" class="mt-4 btn btn-success w-100">Proceed To Checkout</a>
                                </div>
                            `
       }
   
})



