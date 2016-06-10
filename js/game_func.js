$(function(){

// function open
var $airFight = (function() {

    // dom elements & settings
    var $body       = $("body"),
        $flight     = $("button"),
        speed       = 1,
        flightSize  = {},
        flightAmmo  = {},
        enviroment  = {},
        health      = 100,
        $win        = $(window),
        winSize     = {},

        // initialize function
        init        = function(){

            enviroment();
            enemy();
            healthBar();
            getFlightSize();
            getWinSize();
            centerizeFlight();
            initEvents();
            $flight.css({position: 'absolute'});

        },

        // create space enviroment
        enviroment  = function() {

            // create stars around space randomly
          /*  for(var i = 1; i <= 600; i++) {
                $body.append("<span class='star'></span>");
            }

            enviroment.star = $(".star");
            enviroment.star.each(function(){

                var divsize = 10;
                positionX = ( Math.random() * ($(document).width() - divsize) ).toFixed(),
                positionY = ( Math.random() * ($(document).height() - divsize) ).toFixed();

                $(this).css({
                    'left': positionX + 'px',
                    'top': positionY + 'px'
                });

            });*/

            function starInActionSmall() {
                var starSize = 10,
                positionX = ( Math.random() * ($(document).width() - starSize) ).toFixed();
                $body.append("<div class='starInActionSmall' style='left:"+positionX+"px'></div>")
                .find('.starInActionSmall:last')
                .animate({top: winSize.height}, {
                    duration: 4000 / speed,
                    easing: 'linear',
                    complete: function() {
                        $(this).remove();
                    }
                });
            }
            setInterval(starInActionSmall, 5);

            function starInActionBig() {
                var starSize = 10,
                positionX = ( Math.random() * ($(document).width() - starSize) ).toFixed();
                $body.append("<div class='starInActionBig' style='left:"+positionX+"px'></div>")
                .find('.starInActionBig:last')
                .animate({top: winSize.height}, {
                    duration: 5000  / speed,
                    easing: 'linear',
                    complete: function() {
                        $(this).remove();
                    }
                });
            }
            setInterval(starInActionBig, 50);

            function meteorInAction1() {
                var starSize = 200,
                positionX = ( Math.random() * ($(document).width() - starSize) ).toFixed();
                $body.append("<div class='meteorInAction1' style='left:"+positionX+"px; top: -200px'></div>")
                .find('.meteorInAction1:last')
                .animate({top: winSize.height}, {
                    duration: 4000  / speed,
                    easing: 'linear',
                    complete: function() {
                        $(this).remove();
                    }
                });
            }
            setInterval(meteorInAction1, 10000);

        },

        // create enemy
        enemy           = function() {

            function newEnemy() {
                var divsize = 10,
                positionX = ( Math.random() * ($(document).width() - divsize) ).toFixed();
                $body
                    .append("<div class='enemy_1' style='left:"+positionX+"px'></div>")
                    .find('.enemy_1:last')
                    .animate({top: winSize.height },{
                        duration: 2000  / speed,
                        easing: 'linear',
                        complete: function(){
                            $(this).remove();
                        },
                        step: function() {
                            collide( $(this), $flight );
                        }
                    });

            }
            setInterval(newEnemy, 1000);
        },

        healthBar       = function() {
            $body.append("<div class='healthBar'><div class='inner'></div></div>");
        },

        healthStatus    = function(damage) {

            $body.find(".healthBar .inner")
                .stop(true,false)
                .animate({
                    width: "-="+damage+ "%"
                },{
                    duration: 10,
                    easing: 'linear',
                    complete: function() {
                        health -= damage;
                        if(health == 0) { alert("GAME OVER!!!"); }
                    }
                });

        },

        //get flight size
        getFlightSize   = function() {
            flightSize.width    = $flight.width();
            flightSize.height   = $flight.height();
        },

        //get window size
        getWinSize  = function() {
            winSize.width   = $win.width();
            winSize.height  = $win.height();
        },

        //center the flight
        centerizeFlight = function() {
            $flight.css({left: ( winSize.width - flightSize.width ) / 2 });
        },

        // ammo
        ammo        = function() {
            $flight.append("<span class='ammo'>+</span>");
            flightAmmo.single = $flight.find(".ammo");
            flightAmmo.single.css({position: 'absolute'});
            flightAmmo.single
                            .animate({
                                bottom: winSize.width
                            },{
                                duration: 1500,
                                easing: 'linear',
                                complete: function() {
                                    $(this).remove();
                                },
                                step: function() {
                                    hitEnemy( $(this) );
                                }
                            });

        },

        hitEnemy    = function(ammo) {
            $('.enemy_1').each(function(index, element)
            {
               
                var $enemy = $(this),
                    $ammo  = ammo,
                    x1 = $enemy.offset().left,
                    y1 = $enemy.offset().top,
                    h1 = $enemy.outerHeight(true),
                    w1 = $enemy.outerWidth(true),
                    b1 = y1 + h1,
                    r1 = x1 + w1,
                    x2 = $ammo.offset().left,
                    y2 = $ammo.offset().top,
                    h2 = $ammo.outerHeight(true),
                    w2 = $ammo.outerWidth(true),
                    b2 = y2 + h2,
                    r2 = x2 + w2;

                if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2)
                { }
                else
                {
                    $enemy.remove();
                }

            });
        },

        collide     = function($div1, $div2) {

            var x1 = $div1.offset().left,
            y1 = $div1.offset().top,
            h1 = $div1.outerHeight(true),
            w1 = $div1.outerWidth(true),
            b1 = y1 + h1,
            r1 = x1 + w1,
            x2 = $div2.offset().left,
            y2 = $div2.offset().top,
            h2 = $div2.outerHeight(true),
            w2 = $div2.outerWidth(true),
            b2 = y2 + h2,
            r2 = x2 + w2;

            if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2)
            { }
            else
            {
                healthStatus(10);
                //$div2.fadeOut(100);
            }

        },

        // accelerate whole items (stars, meteors, enemeny)
        gearUp        = function(state) {
            if(state == 'slow') {
                speed = 1;
            } else if(state == 'fast') {
                speed = 2;
            }
        },

        moveLeft    = function() {
            $flight.stop(true,true).animate({left: '-=20px'});
        },

        moveRight    = function() {
            $flight.stop(true,true).animate({left: '+=20px'});
        },

        moveUp    = function() {
            $flight.stop(true,true).animate({bottom: '+=20px'});
        },

        moveDown    = function() {
            $flight.stop(true,true).animate({bottom: '-=20px'});
        },

        // initialize some events
        initEvents  = function() {

            $flight.on("click",this,function(event){
                event.preventDefault();
            });

            // send pressed buttons to map array to be able double key press
            var map = [];
            onkeydown = onkeyup = function(e){

                collide( $body.find(".enemy_1"), $flight );

                e = e || event; // better for ie
                map[e.keyCode] = e.type == 'keydown';

                if ( map[0] || map[32] ) {
                    ammo();
                }

                if ( map[37] ) {
                    moveLeft();
                }

                if ( map[39] ) {
                    moveRight();
                }

                if (map[38] ) {
                    moveUp();
                }

                if ( map[40] ) {
                    moveDown();
                }

                if ( map[16] ) {
                    gearUp('fast');
                } else {
                    gearUp('slow');
                }

            };


        };
     return { init : init };

}) ();

 $airFight.init();

});
