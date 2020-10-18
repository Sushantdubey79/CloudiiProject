/*const hover = require("../views/hover");

    
    (function() {     // function expression closure to contain variables
        var i = 0;
        var pics = [ "hill.jpg" , "story.jpg" ];
        var el = document.getElementById('img_to_flip');  // el doesn't change
        function toggle() {
            el.src = pics[i];           // set the image
            i = (i + 1) % pics.length;  // update the counter
        pics[i].fadeOut();
        
        }
        setInterval(toggle, 2000);
    })();*/   

  /*  var myAnimation =  new hoverEffect({
        parent: document.querySelector('.bg'),
        intensity: 0.3,
        image1: './2.jpg',
        image2: './4.jpg',
        displacementImage: './strip.png'
    });

var bgImageArray = ["/22.jpg", "/33.jpg", "/banaras1.jpg"],
base = "/11.jpg",
secs = 4;
bgImageArray.forEach(function(img){
    new Image().src = base + img; 
    // caches images, avoiding white flash between background replacements
});

function backgroundSequence() {
    window.clearTimeout();
    var k = 0;
    for (i = 0; i < bgImageArray.length; i++) {
        setTimeout(function(){ 
            document.getElementById('bg').style.background = "url(" + base + bgImageArray[k] + ") no-repeat center center";
            document.getElementById('bg').style.backgroundSize ="cover";
        if ((k + 1) === bgImageArray.length) { setTimeout(function() { backgroundSequence() }, (secs * 1000))} else { k++; }            
        }, (secs * 1000) * i)   
    }
}
backgroundSequence();*/
/*
const restinfoimg = document.querySelector(".rest-info-img");
const carimg = document.querySelector(".rest-info-img img");

const preB = document.querySelector("#prevBtn");
const nexB = document.querySelector("#nextBtn");

let counter = 1;
const size = carimg[0].clientWidth;

restinfoimg.style.transform = 'translateX(' + (-size * counter) + 'px)';

nexB.addEventListener('click', function(){

    restinfoimg.style.transition = "transform 0.4s ease-in-out";
    counter++;
restinfoimg.style.transform = 'translateX(' + (-size * counter) + 'px)';
})


preB.addEventListener('click', function() {
    restinfoimg.style.transition = "transform 0.4s ease-in-out";
    counter--;
    restinfoimg.style.transform = 'translateX(' + (-size * counter) + 'px)';
})*/




















