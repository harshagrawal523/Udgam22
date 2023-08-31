function added(){
    let various = document.getElementById('default-events');
    let added = document.getElementById('added-events');
    various.style.display = 'none';
    added.style.display = 'block';
   
    document.getElementsByClassName("events-added")[0].classList.remove('disable');
    document.getElementsByClassName("events-added")[0].classList.add('active');
    document.getElementsByClassName("events-scheduled")[0].classList.remove('active');
    document.getElementsByClassName("events-scheduled")[0].classList.add('disable');



    /* old_title.style = "opacity: .5 !important;";
    new_title.style = "opacity: 1 !important;"; */
    
    // console.log(various);
}
function various(){
    let various = document.getElementById('default-events');
    let added = document.getElementById('added-events');
    various.style.display = 'block';
    added.style.display = 'none';

    document.getElementsByClassName("events-scheduled")[0].classList.remove('disable');
    document.getElementsByClassName("events-scheduled")[0].classList.add('active');
    document.getElementsByClassName("events-added")[0].classList.remove('active');
    document.getElementsByClassName("events-added")[0].classList.add('disable');


    /* 
    old_title.style = "opacity: .5 !important;";
    new_title.style = "opacity: 1 !important;"; */
}