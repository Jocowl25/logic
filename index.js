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
const alphabet="QWERTYUIOPASDFGHJKLZXCBNM".split("")
const operators="~,->,<->,&,v,(,)".split(",")
const innerOperators="->,<->,&,v".split(",")
const letters=[];
const premises=[]
let conclusion;
const varButton=document.querySelector('.varAddButton')
const varlist=document.querySelector(".varList")
const varInput=document.querySelector(".varAddInput")
const premInput=document.querySelector(".prem")
const concInput=document.querySelector(".conc")
const premButton=document.querySelector(".premButton")
const concButton=document.querySelector(".concButton")
const premList=document.querySelector(".premList")

varInput.addEventListener("click",()=>{
    varInput.value=""
})

varButton.addEventListener("click",()=>{
    if(alphabet.includes(varInput.value)&&!letters.includes(varInput.value)){
    letters.push(varInput.value)
    varlist.innerHTML+=varInput.value+" "
    }
    if(varInput.value=="V"){
        alert("No v allowed,sorry, I don't want to force a distinction between v and V")
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
        let input=premInput.value
        input=parsePremise(input)
        if(input){
            premList.innerHTML+=input.join("")+"<br>"
            premises.push(input)
        }
        })

        concButton.addEventListener("click",()=>{
        concInput.value=concInput.value.toUpperCase()
        let input=concInput.value
        input=parsePremise(input)
        if(input){
            conclusion=input
            doTheThing()
        }
        })

function doTheThing(){
        console.log(premises)
        console.log(conclusion)
}

function parsePremise(input){ //TO DO: check edge cases
    let inputArr=input.split("")
    for(let i=0;i<inputArr.length;i++){
        if(inputArr[i]=="-"){
            if(inputArr[i+1]==">"){
                if(inputArr[i-1]=="<"){
                    inputArr.splice(i-1,3,"<->")
                }else{
                    inputArr.splice(i,2,"->")
                }
            }
        }
    }
    let parenCount=0;
    for(let i=0;i<inputArr.length;i++){
        if(inputArr[i]=="V"){
                inputArr[i]="v"
            }
        if(letters.includes(inputArr[i])){
            if(letters.includes(inputArr[i-1])||letters.includes(inputArr[i+1])){
                alert(`adjacent letters! see char ${i}`)
                return false;
            }
            if(inputArr[i-1]=="("&&inputArr[i+1]==")"){
                alert(`parens around only letter! see char ${i}`)
                return false
            }
            if((inputArr[i-1]!="~"&&inputArr[i-1]!="(")&&innerOperators.includes(inputArr[i+1])){
                alert(`invalid starting operator! see char ${i}`)
                return false
            }
            continue;
        }
        if(operators.includes(inputArr[i])){
            if((operators.includes(inputArr[i-1]))||operators.includes(inputArr[i+1])){
                if(!( (inputArr[i]!="~"&&inputArr[i+1]!="(") || (inputArr[i-1]!="~"&&inputArr[i]!="(") )){
                alert(`adjacent operations! see char ${i}`)
                return false;
                }
                if(innerOperators.includes(inputArr[i])&&inputArr[i+1]!="~"&&inputArr[i+1]!="("&&inputArr[i-1]!=")"){
                    alert(`adjacent operations! see char ${i}`)
                    return false;
                }
            }
            if(!(inputArr[i-1]==")")&&(!(inputArr[i-1]=="("||inputArr[i-2]=="("))&&(!(inputArr[i+1]==")"||inputArr[i+2]==")"))&&innerOperators.includes(inputArr[i])&&(!(inputArr[i+1]=="~"&&(inputArr[i+2]==")"||inputArr[i+2]=="(")))){
                alert(`ambiguous statement! see char ${i}`)
                return false
            }
            if(inputArr[i]=="("){
                parenCount++
            }
            if(inputArr[i]==")"){
                parenCount--
            }
            continue;
        }
        alert(`invalid variable or symbol! see char ${i}`)
        return false
}
if(parenCount!=0){
        alert(`paren count off!`)
    return false;
}
return inputArr;
}
