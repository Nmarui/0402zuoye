function Swiper() {
    this.show = function (conf) {
        var html=''
        +'<div class="slider" id="slider">'
            +'<div class="slide"><img src="img/b5.png" alt=""></div>'
            +'<div class="slide"><img src="img/b1.png" alt=""></div>'
            +'<div class="slide"><img src="img/b2.png" alt=""></div>'
            +'<div class="slide"><img src="img/b3.png" alt=""></div>'
            +'<div class="slide"><img src="img/b4.png" alt=""></div>'
            +'<div class="slide"><img src="img/b5.png" alt=""></div>'
            +'<div class="slide"><img src="img/b1.png" alt=""></div>'
        +'</div>'
        +'<span id="left"><</span>'
        +'<span id="right">></span>'
        +'<ul class="nav" id="navs">'
            +'<li class="active">1</li>'
            +'<li>2</li>'
            +'<li>3</li>'
            +'<li>4</li>'
            +'<li>5</li>'
        +'</ul>';
        $(conf).html(html);
        var $box = $('#box');
        var $list = $('#navs').children();
        var slider = $('#slider').get(0);
        var $left = $('#left');
        var $right = $('#right');
        var timer,
            index=1,
            isMoving=false;
        
        //获取类型
        function getStyle(obj, attr){
            if(obj.currentStyle){
                return obj.currentStyle[attr];
            } 
            else {
                return getComputedStyle(obj, null)[attr];
            }
        }
        //鼠标移动到滑块上
        $box.mouseover(function () {
            if(timer){
              clearInterval(timer);
            }
            $left.css({
              opacity: .50,
              animation: "opacity 2s"
            })
            $right.css({
              opacity: .50,
              animation: "opacity 2s"
            })
        })
        //鼠标移开滑块
        $box.mouseout(function () {
            timer = setInterval(next,1000);
            $left.css({
              opacity: 0,
              transition: "opacity 2s"
            })
            $right.css({
              opacity: 0,
              transition: "opacity 2s"
            })
        })
        //点击左侧、右侧按钮
        $left.click(function(){prev()});

        $right.click(function(){next()});

        for (var i = 0; i < $list.length; i++) {
            (function (i) {
              $list[i].onclick = function () {
                index = i+1;
                navmove();
                animate(slider, {
                  left: -1200 * index
                });
              }
            })(i);
        }
        //下一页函数
        function next() {
            if (isMoving) {
                return 0;
            }
            isMoving = true;
            index++;
            navmove();
            animate(slider, {left: -1200 * index},function () {
                if (index == 6) {
                    slider.style.left = '-1200px';
                    index = 1;
                }
                isMoving = false;
            });
        };
        //上一页函数
        function prev() {
            if (isMoving) {
                return 0;
            }
            isMoving = true;
            index--;
            navmove();
            animate(slider, {left: -1200 * index}, function () {
                if (index == 0) {
                    slider.style.left = '-6000px';
                    index = 5;
                }
                isMoving = false;
            });
            console.log(index);
        };
        //导航运动
        function navmove(){
            for(var i = 0;i < $list.length;i++){
                $list[i].className = "";
            }
            if(index > 5){
                $list[0].className = "active";
            }
            else if(index <= 0){
                $list[4].className = "active";
            }
            else{
                $list[index - 1].className = "active";
            }
        };
        //自定义动画
        function animate(obj,json,callback){
            clearInterval(obj.timer);
            obj.timer = setInterval(function(){
                var isStop = true;
                for(var attr in json){
                    var now = 0;
                    if(attr == 'opacity'){
                        now = parseInt(getStyle(obj,attr)*100);
                    }
                    else{
                        now = parseInt(getStyle(obj,attr));
                    }
                    var speed = (json[attr] - now) / 10;
                    speed = speed>0?Math.ceil(speed):Math.floor(speed);
                    var cur = now + speed;
                    if(attr == 'opacity'){
                        obj.style[attr] = cur / 100;
                    }
                    else{
                        obj.style[attr] = cur + 'px';
                    }
                    if(json[attr] !== cur){
                        isStop = false;
                    }
                }
                if(isStop){
                    clearInterval(obj.timer);
                    callback&&callback();
                }
            }, 30)
        };
        timer = setInterval(next, 1000);
    }
}