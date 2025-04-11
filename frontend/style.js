document.addEventListener("DOMContentLoaded",()=>{
    const name =document.querySelector("#name");
    const email =document.querySelector("#email");
    const text =document.querySelector("#text");
    const form =document.querySelector("#form");
    
    
    let ChekEmail=(email)=>{
    const regx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(regx.test(email.value)){
        showSuccess(email);
    }else{
        ShowError(email,"Please enter a valid email address")
    }
    }
    
    let ShowError=(input,message)=>{
        let parentElement=input.parentElement;
        parentElement.classList="container error";
        let small=parentElement.querySelector("small");
        small.innerText=message;
        
    }
    let showSuccess=(input)=>{
        let pare=input.parentElement;
        pare.classList="container success";
    }
    
    
    let ChekEm=(items)=>{
        items.forEach((element)=>{
            if(element.value ===""){
                ShowError(element,"input required");
            }else{
                showSuccess(element);
            }
        })
    }
    
    
    form.addEventListener("submit",(event)=>{
        event.preventDefault();
        ChekEm([name,email,text])
        ChekEmail(email)
    
    })
    })