var page = "login";
var isLoginPage = false;
var ismobile = false;
if($('#pass-reset-form').length > 0){
    page = "reset";
}else if($('#login-form').length > 0){
    page = "login";
}else{
    page = "register";
}
if(window.innerWidth < 768){
    ismobile = true;
}

let astro = document.getElementById('astronaut_cont');
let login_form = document.getElementById('login-form');
let register_form = document.getElementById('register-form');
let reset_form = document.getElementById('pass-reset-form');
const hw_ratio = 1.17387;
const scaling_factor = 0.9;
var large = 0;
var initial_width = astro.offsetWidth;
if(page == "login"){
    if(login_form.offsetHeight < initial_width*hw_ratio/scaling_factor) {
        astro.classList.remove("col-6");
        astro.classList.remove("col-md-5");
        astro.style.height = (login_form.offsetHeight*scaling_factor).toString() + 'px';
        astro.style.width = (login_form.offsetHeight*scaling_factor/hw_ratio).toString() + 'px';
        large = 1;
    }else{
        astro.style.height = (astro.offsetWidth*hw_ratio).toString() + 'px';
    }
}else if(page == "register"){
    if(register_form.offsetHeight < initial_width*hw_ratio/scaling_factor) {
        astro.classList.remove("col-6");
        astro.classList.remove("col-md-5");
        astro.style.height = (register_form.offsetHeight*scaling_factor).toString() + 'px';
        astro.style.width = (register_form.offsetHeight*scaling_factor/(hw_ratio)).toString() + 'px';
        large = 1;
    }else{
        astro.style.height = (astro.offsetWidth*hw_ratio).toString() + 'px';
    }
}else if(page == "reset"){
    if(reset_form.offsetHeight < initial_width*hw_ratio/scaling_factor) {
        astro.classList.remove("col-6");
        astro.classList.remove("col-md-5");
        astro.style.height = (reset_form.offsetHeight*scaling_factor).toString() + 'px';
        astro.style.width = (reset_form.offsetHeight*scaling_factor/(hw_ratio)).toString() + 'px';
        large = 1;
    }else{
        astro.style.height = (astro.offsetWidth*hw_ratio).toString() + 'px';
    }
}
astro.style.paddingLeft = "0px";
astro.style.paddingRight = "0px";
//astro.style.marginBottom = "10%";
//astro.style.marginTop = "10%";
if(large){ 
    const diff = initial_width-astro.offsetWidth-10;
    astro.style.marginRight = (diff*6/10).toString() + 'px';
    astro.style.marginLeft = (diff*4/10).toString() + 'px';
}
if(ismobile){
    astro.style.marginBottom = "10%";
}


var box_src = "static files/astronaut_login_box.png";
if(page == "login"){
    box_src = "static files/astronaut_login_box.png";
}else if(page == "register"){
    box_src = "static files/astronaut_register_box.png";
}else if(page == "reset"){
    box_src = "static files/astronaut_reset_password_box.png";
}


var hand1 = document.createElement("img");
hand1.id = "hand1";
hand1.src = "static files/astronaut_hand_left.png";
hand1.style.position = "absolute";
hand1.style.height = '16.53%';
hand1.style.marginTop = "56.80%";
hand1.style.marginLeft = '32.00%';
hand1.style.transform = 'translateX(-50%)';
hand1.style.zIndex = '10';
astro.appendChild(hand1);

var hand2 = document.createElement("img");
hand2.id = "hand2";
hand2.src = "static files/astronaut_hand_right.png";
hand2.style.position = "absolute";
hand2.style.height = '15.53%';
hand2.style.marginTop = "56.80%";
hand2.style.marginLeft = '63.66%';
hand2.style.transform = 'translateX(-50%)';
hand2.style.zIndex = '10';
astro.appendChild(hand2);


var body = document.createElement("img");
body.id = "body";
body.src = "static files/astronaut_body.png";
body.style.position = "absolute";
body.style.height = '35.60%';
body.style.marginTop = "39.76%";
body.style.marginLeft = '48%';
body.style.transform = 'translateX(-50%)';
astro.appendChild(body);

var box = document.createElement("img");
box.id = "box";
box.src = box_src;
box.style.position = "absolute";
box.style.height = '48%';
box.style.marginTop = "60.76%";
box.style.marginLeft = '49%';
box.style.transform = 'translateX(-50%)';
box.style.zIndex = '9';
astro.appendChild(box);

var helmet = document.createElement("img");
helmet.id = "helmet";
helmet.src = "static files/astronaut_logo_helmet.png";
//helmet.style.top = "7%";
helmet.style.position = "absolute";
helmet.style.height = '46.82%';
helmet.style.marginLeft = '50%';
helmet.style.transform = 'translateX(-50%)';
astro.appendChild(helmet);


Math.floor(Math.random() * 10);


/* function moveLeftHand(){
    hand1.style.transform = 'translateX'
} */
const time_multiplier = 100;
const hand_max_dist = 30;
function animateLeftHand(){
    var dist = Math.floor(Math.random() * hand_max_dist) - hand_max_dist/2;
    if (Math.abs(dist) < hand_max_dist/2){
        dist = Math.floor(Math.random() * hand_max_dist) - hand_max_dist/2;
    }
    $('#hand1').animate(
        {left: '-=' + dist + 'px'}, 
        Math.abs(dist) * time_multiplier,
        'linear');
    $('#hand1').animate(
        {left: '+=' + dist + 'px'}, 
        Math.abs(dist) * time_multiplier,
        'linear',
        animateLeftHand
        ); 
}

function animateRightHand(){
    var dist = Math.floor(Math.random() * hand_max_dist) - hand_max_dist/2;
    if (Math.abs(dist) < hand_max_dist/2){
        dist = Math.floor(Math.random() * hand_max_dist) - hand_max_dist/2;
    }
    $('#hand2').animate(
        {left: '-=' + dist + 'px'}, 
        Math.abs(dist) * time_multiplier,
        'linear');
    $('#hand2').animate(
        {left: '+=' + dist + 'px'}, 
        Math.abs(dist) * time_multiplier,
        'linear',
        animateRightHand
        ); 
}

animateLeftHand();
animateRightHand();

document.onclick = function() { 
    passwordAnimation();
}

function astro_down(){
    const time_multiplier1 = 200;
    $('#helmet').animate(
        {marginTop: '+=50%'},
        {
            duration: time_multiplier1, 
            queue: false,
            complete: function() {
                helmet.style.visibility = 'hidden';
            } 
        }
    );
    $('#body').animate(
        {marginTop: '+=17%'},
        {
            duration: time_multiplier1, 
            queue: false,
            complete: function() {
                body.style.visibility = 'hidden';
            } 
        }
    );
}

var elements = [];
var astro_pos = 'up';
function passwordAnimation() {
    //console.log(document.activeElement);
    if(document.activeElement.id == "password"  
    || document.activeElement.id == "password2" 
    || document.activeElement.id == "pkey" 
    || document.activeElement.id == "npass" 
    || document.activeElement.id == "cnpass" ){
        if(astro_pos == 'up'){
            astro_down();
            astro_pos = 'down';
        }
    }else /* if(document.activeElement.id != 'password' && document.activeElement.id != 'password2') */{
        if(astro_pos == 'down'){
            astro_up();
            astro_pos = 'up';
        }
    }
}

//document.addEventListener('focusin', passwordAnimation, true);
//document.addEventListener('focusout', passwordAnimation, true);




$(document).click(function(event) { 
    var $target = $(event.target);
    if(!$target.closest('#password').length && 
    $('#password').is(":visible")) {
        
    }        
  });

function astro_up(){
    helmet.style.visibility = 'visible';
        body.style.visibility = 'visible';
        const time_multiplier = 400;
        $('#helmet').animate(
            {marginTop: '0%'},
            {duration: time_multiplier, queue: false });
        $('#body').animate(
            {marginTop: '39.76%'},
            {duration: time_multiplier, queue: false });
}


$(document).ready(function(){
    //var newq1 = makeNewPosition();
    //animateDiv('#helmet',newq1);
    //animateDiv('#body',newq1);
    animateDiv();

});

function makeNewPosition(multiplier){
    
    // Get viewport dimensions (remove the dimension of the div)
    var h = $('#helmet').height()*multiplier;
    var w = $('#helmet').width() *multiplier;
    
    var nh = Math.floor(Math.random() * h) -h/2;
    var nw = Math.floor(Math.random() * w) -w/2;
    return [nh,nw];    
}

function animateDiv(/* myclass,newq1 */){
    var newq = makeNewPosition(0.06);
    var newq1 = makeNewPosition(0.03);
    var newq2 = makeNewPosition(0.03);
    //console.log(newq,newq1,newq2);
    $('#helmet').animate({ top: '+='+(newq[0]+newq1[0]), left: '+='+(newq[1]+newq1[1]) }, 700,   function(){
    });
    $('#helmet').animate({ top: '-='+(newq[0]+newq1[0]), left: '-='+(newq[1]+newq1[1]) }, 700,   function(){
      });

    $('#body').animate({ top: '+='+(newq[0]+newq2[0]), left: '+='+(newq[1]+newq2[1]) }, 700,   function(){
    });
    $('#body').animate({ top: '-='+(newq[0]+newq2[0]), left: '-='+(newq[1]+newq2[1]) }, 700,   function(){
        animateDiv(/* myclass */);        
    });
    
};

//console.log(astro.getBoundingClientRect().height/astro.getBoundingClientRect().width);