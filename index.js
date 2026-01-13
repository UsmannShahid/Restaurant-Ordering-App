import { menuArray } from "./data.js"

const menuSec = document.getElementById('menu')
const cart = document.getElementById('cart')

document.addEventListener('click', handleClick)

let orderArr = []

function handleClick(e) {
    const addBtn = e.target.closest('.add-btn')
    if(addBtn){
        cart.classList.remove('hide')

        orderArr.push({
            itemName: addBtn.dataset.itemName,
            price: Number(addBtn.dataset.itemPrice),
        })  
        renderOrder()
    } 

    const removeBtn = e.target.closest('.remove-btn')
    if(removeBtn){
        orderArr = orderArr.filter(item => item.itemName !== removeBtn.dataset.itemName)
        renderOrder()
        if (orderArr.length === 0){
            cart.classList.add('hide')
        }
    }
}


function renderOrder(){
    document.getElementById('order-items-cont').innerHTML = orderArr.map((item => {
            
            return ` 
            <div class="order-item-details">
                <div class="order">
                    <h3 class="order-item">${item.itemName}</h3>
                    <button data-item-name="${item.itemName}" class="remove-btn">remove</button>
                </div>
                <div class="order-item-price">
                    <p class="item-price">$${item.price}</p>
                </div>
            </div>
            `
        
        })).join(' ')

    document.getElementById('total-count').innerHTML = `
        <h3 class="total-price">
        $${orderArr.reduce((total, product) =>  total + Number(product.price), 0)}
        </h3>`
        
}



function menuRender() {
  return menuArray.map((item) => {
    return `
      <div id="menu-item" class="menu-item">
            <div class="menu-item-details">
                <div class="emoji-cont">
                    <p class="emoji">${item.emoji}</p>
                </div>
                <div class="item-details">
                    <h3 class="item-name">${item.name}</h3>
                    <p class="item-ingredients">${item.ingredients.map(ingredient => ingredient).join(', ')}</p>
                    <p class="item-price">$${item.price}</p>
                </div>
            </div>
            <div class="add-btn-cont">
                <button class="add-btn" id="${item.id}" data-item-name="${item.name}" data-item-price="${item.price}">+</button>
            </div>
        </div>
    `
  }).join(' ')
}

menuSec.innerHTML = menuRender()

// Payment Form Display
const paymentSec = document.getElementById('payment')

document.getElementById('complete-order-btn').addEventListener('click', showPayment)

function showPayment() {
    paymentSec.classList.remove('hide')
}

// Payment Form

const paymentForm = document.getElementById('payment-form')
const successMsg = document.getElementById('success')


paymentForm.addEventListener('submit', function(e){
    e.preventDefault()
    successMsg.innerHTML = `
    <div class="success-cont">
        <p class="success-msg">Thanks ${paymentForm.name.value}! Your order is on its way!</p>
    </div>
    `
    console.log(paymentForm.name.value)
    paymentSec.classList.add('hide')
    cart.classList.add('hide')
})