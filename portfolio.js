//slider animation
$(document).ready(function(){
    (function(){
        if(!('requestAnimationFrame' in window)) return;	if(/Mobile|Android/.test(navigator.userAgent)) return;
        var backgrounds = [];
        $('[data-bs-parallax-bg]').each(function(){
            var el = $(this);
            var bg = $('<div>');
            bg.css({
                backgroundImage: el.css('background-image'),
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'absolute',
                height:'200%',
                width:'100%',
                top:0, left:0,
                zIndex: -100
            });
            bg.appendTo(el);
            backgrounds.push(bg[0]);
            el.css({
                position:'relative',
                background:'transparent',
                overflow: 'hidden',
            });
        });
    
        if(!backgrounds.length) return;
        var visible = [];
        var scheduled;
        $(window).on('scroll resize', scroll);
        scroll();
        function scroll(){
            visible.length = 0;
            for(var i = 0; i < backgrounds.length; i++){
                var rect = backgrounds[i].parentNode.getBoundingClientRect();
                if(rect.bottom > 0 && rect.top < window.innerHeight){
                    visible.push({
                        rect: rect,
                        node: backgrounds[i]
                    });
                }
            }
            cancelAnimationFrame(scheduled);
            if(visible.length){
                scheduled = requestAnimationFrame(update);
            }
        }
        function update(){
            for(var i = 0; i < visible.length; i++){
                var rect = visible[i].rect;
                var node = visible[i].node;
                var quot = Math.max(rect.bottom, 0) / (window.innerHeight + rect.height);
                node.style.transform = 'translate3d(0, '+(-50*quot)+'%, 0)';
            }
        }
    })();
    });
    
    
    //age calculation - calculates my actual age vs the actual day/month/year.
    
    var automaticAge = function(){
        var agePosition = document.getElementById('age');
        
        var date = new Date();
        var actualDate = [date.getDate(), date.getMonth()+1, date.getFullYear()];
        var myage = [20, 11, 1989];
        
        if(actualDate[1] >= myage[1] ){
            if(actualDate[0] >= myage[0]){
                var x = actualDate[2] - myage[2];
                agePosition.innerHTML = x;
            } else {
                var x = actualDate[2] - myage[2] - 1;
                agePosition.innerHTML = x;
            }
        } else {
            var x = actualDate[2] - myage[2] - 1;
            agePosition.innerHTML = x;
        }
        
    }
    
    automaticAge();