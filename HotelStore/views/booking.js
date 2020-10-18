
    $('#welcome li:nth-of-type(5) a').mouseenter(function(){

        $('#welcome li:nth-of-type(5) a').css('color','black');

    })



    $('#welcome li:nth-of-type(5) ').mouseenter(function(){

        $('#welcome li:nth-of-type(5) a').css('color','black');

    })

    
    $('#welcome').mouseenter(function(){

        $('#welcome li:nth-of-type(5) a').css('color','rgba(255,255,255,0.8)');

    })

    
    
    $('#welcome').mouseout(function(){

        $('#welcome li:nth-of-type(5) a').css('color','rgba(255,255,255,0.8)');

    })


    $('#welcome li:nth-of-type(5) a').mouseout(function(){

        $('#welcome li:nth-of-type(5) a').css('color','black');

    })

/*    (function() {     // function expression closure to contain variables
        var i = 0;
        var pics = [ "hill.jpg" , "story.jpg" ];
        var el = document.getElementById('img_to_flip');  // el doesn't change
        function toggle() {
            el.src = pics[i];           // set the image
            i = (i + 1) % pics.length;  // update the counter
        }
        setInterval(toggle, 1000);
    })();   
*/
    
    
/*<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/109/three.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js"></script>
<script src="hover.js"></script>
  <script>
  var myAnimation =  new hoverEffect({
        parent: document.querySelector('.bg'),
        intensity: 0.3,
        image1: './2.jpg',
        image2: './4.jpg',
        displacementImage: './strip.png'
    });

    new hoverEffect({
        parent: document.querySelector('.bg'),
        intensity: 0.3,
        image1: './2.jpg',
        image2: './4.jpg',
        displacementImage: './strip.png'
    });*/



