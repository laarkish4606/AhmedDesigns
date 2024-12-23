// ===== toggle menu========
const menuIcon = document.getElementById('menu-icon');
const nav = document.getElementById('nav');
menuIcon.addEventListener("click", event =>{
    
    if(nav.style.display === "none"){
        nav.style.display = "block";
        menuIcon.src = "image/close.png";
    }
    else{
        nav.style.display = "none";
        menuIcon.src = "image/menu.png";
    }
   
   
})

const icon = document.getElementById("icon");
icon.onclick = function(){
document.body.classList.toggle("dark-theme");
if(document.body.classList.contains("dark-theme")){
    icon.src = "image/sun.png";
}
else{
    icon.src = "image/moon.png";
}
}



// ================
let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');
//=========== make active each section ========
window.onscroll = ()=>{
    sections.forEach(sec=>{
        let top = window.scrollY;
        let offset = sec.offsetTop-150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        if(top>=offset && top <= offset+height){
            navlinks.forEach(link=>{
                link.classList.remove('active');
                document.querySelector('header nav a[href*='+ id +']').classList.add('active');
            });
        };
    });
    //================
    if(nav.style.display ==="block"){
        nav.style.display = "none";
        menuIcon.src = "image/menu.png";
    }
};
//====== scroll reveal
// ScrollReveal({ 
//     distance: '80px',
//     duration: 2000,
//     delay: 200
// });
// ScrollReveal().reveal('.home-content, .heading', { origin: 'top'});
// ScrollReveal().reveal('.home-img,.services-container,.portfolio-box,.contact form', { origin: 'bottom'});
// ScrollReveal().reveal('.home-content h1',{ origin: 'left'});
// ScrollReveal().reveal('.home-content p,.about-content', { origin: 'right'});
