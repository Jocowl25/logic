function and(a,b){
    return a&&b
}
function or(a,b){
    return a||b
}
function ifThen(a,b){
    return !(a&&!b)
}
function onlyIf(a,b){
    return (a==b)
}
const alphabet="QWERTYUIOPASDFGHJKLZXCVBNM".split("")
const operators="~,->,<->,&,v,(,)".split(",")
const letters=[];
const varButton=document.querySelector('.varAddButton')
const varlist=document.querySelector(".varList")
const varInput=document.querySelector(".varAddInput")
const premInput=document.querySelector(".prem")
const concInput=document.querySelector(".conc")
const premButton=document.querySelector(".premButton")
const concButton=document.querySelector(".concButton")
const premList=document.querySelector(".premList")

varButton.addEventListener("click",()=>{
    if(alphabet.includes(varInput.value)&&!letters.includes(varInput.value)){
    letters.push(varInput.value)
    varlist.innerHTML+=varInput.value+" "
    }
})

    varInput.addEventListener("change",()=>{
        varInput.value=varInput.value.toUpperCase();
})
premInput.addEventListener("change",()=>{
        premInput.value=premInput.value.toUpperCase();
})
concInput.addEventListener("change",()=>{
        concInput.value=concInput.value.toUpperCase();
})

    premButton.addEventListener("click",()=>{
        premInput.value=premInput.value.toUpperCase()
        let input=premInput.value.split("")
        if(parsePremise(input)){
            premList.innerHTML+=premInput.value+"<br>"
        }
        })

function parsePremise(input){ //TO DO: fix this
    for(let i=0;i<input.length;i++){
            if(!letters.includes(input[i])&&!operators.includes(input[i])){
                alert("invalid something or other")
                return false;
            }
        }
    return true
}