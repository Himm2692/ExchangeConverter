let msg = document.querySelector(".msg")
let button = document.querySelector(".button")
let url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"
const dropdowns = document.querySelectorAll(".dropdown select");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");

for (select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option")
        newOption.innerText = currCode
        newOption.value = currCode
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected"
        }else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
          }
          select.append(newOption)
    }
   
    select.addEventListener("change",(e)=>{
        updateFlag(e.target)
    })
}


let updateExchangeRate =async ()=>{
    let amount = document.querySelector(".amount input")
    let amtVal = amount.value
    if(amtVal === "" || amtVal< 1){
        amtVal = 1
        amount.value = "1"
    }
const baseUrl = `${url}/${fromCurr.value.toLowerCase()}.json` 
let response = await fetch(baseUrl)
let data = await response.json()
let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]
let finalAmount = amtVal * rate
msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value} `
}

let updateFlag = (e)=>{
  let currCode = e.value
  let countryCode = countryList[currCode]
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
  let img = e.parentElement.querySelector("img")
  img.src = newSrc
}


button.addEventListener("click",async (e)=>{
    e.preventDefault()
    updateExchangeRate()
})

window.addEventListener("load",()=>{
    updateExchangeRate()
})
