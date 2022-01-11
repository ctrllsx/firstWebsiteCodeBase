//设置目录的点击与移动效果
var catalogue = document.querySelector(".catalogue");
var atlas = document.querySelector(".atlas");
var lcon = catalogue.querySelector(".lcon");
var page = document.querySelector(".page");
var pagetime = page.querySelector(".pageHead").children[1];
var scrollatlas = page.querySelector(".scrollatlas");
// 设置--x --y 的值
catalogue.style.setProperty("--x", "35px");
catalogue.style.setProperty("--y", "35px");

lcon.children[0].addEventListener("click", function() {
    catalogue.className = "catalogue addTo"
    lcon.children[0].style.display = "none";
    lcon.children[1].style.display = "block";
});
lcon.children[1].addEventListener("click", function() {
    catalogue.className = "catalogue";
    lcon.children[0].style.display = "block";
    lcon.children[1].style.display = "none";
});
lcon.addEventListener("mousedown", function(event) {
    // 当按下鼠标的时候，删除目录的动画效果
    catalogue.style.transition = "none";
    //鼠标按下，光标变成十字架
    this.style.cursor = "move";
    //获得鼠标在裁剪的圆中的位置
    var x = event.pageX - this.offsetLeft;
    var y = event.pageY - this.offsetTop;
    document.addEventListener("mousemove", moves);

    function moves(e) {
        var ax = e.pageX - x;
        var ay = e.pageY - y;
        //鼠标在页面中移动，lcon也跟着移动
        lcon.style.left = ax + "px";
        lcon.style.top = ay + "px";
        //鼠标在页面中移动，裁剪的位置也跟着移动
        var axx = ax + lcon.offsetWidth / 2;
        var ayy = ay + lcon.offsetHeight / 2;
        catalogue.style.setProperty("--x", axx + "px");
        catalogue.style.setProperty("--y", ayy + "px");

    };
    lcon.addEventListener("mouseup", function() {
        // 当鼠标弹起的时候，给目录添加的动画效果
        catalogue.style.transition = "all 0.3s ease-in-out";
        //鼠标弹起，光标变成箭头(默认光标),移除鼠标在页面中移动
        this.style.cursor = "default";
        document.removeEventListener("mousemove", moves);
    });
});

// 设置时间的动画效果
setInterval(function() {
    var times = new Date();
    var nowyear = times.getFullYear();
    var nowmonth = times.getMonth() + 1;
    var nowdate = times.getDate();
    var box = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var nowday = box[times.getDay()];
    var nowhours = times.getHours();
    nowhours = nowhours < 10 ? "0" + nowhours : nowhours;
    var nowminutes = times.getMinutes();
    nowminutes = nowminutes < 10 ? "0" + nowminutes : nowminutes;
    var nowseconds = times.getSeconds();
    nowseconds = nowseconds < 10 ? "0" + nowseconds : nowseconds;
    var nowtime = nowyear + "年" + nowmonth + "月" + nowdate + "日 " + nowday + "  " + nowhours + ":" + nowminutes + ":" + nowseconds;
    pagetime.innerHTML = nowtime;
}, 1000);

// 滚动条移动后，小火箭出来
var backTop = page.querySelector(".backToTop");
var movescroll = 0;
var interval = null;
document.addEventListener("scroll", function() {
    console.log(window.pageYOffset);
    // 当滚动条开始滚动的时候，定时器开始
    if (interval == null) {
        interval = setInterval(isscroll, 800);
    }
    //如果被卷去的头部小于上次卷去的头部，那么就说明页面往上移动了
    if (window.pageYOffset < movescroll) {
        // 页面往上移动，小火箭的头向上
        backTop.style.transform = "rotate(0deg)";
    } else {
        // 页面往下移动，小火箭的头向下
        backTop.style.transform = "rotate(180deg)";
    }
    backTop.style.top = window.pageYOffset + 500 + "px";
    movescroll = window.pageYOffset;

});
// 封装一个判断滚动条有没有停止滚动的函数
function isscroll() {
    // 判断被卷去的头部的距离是否和一秒中前的距离一样
    // 如果一样，那说明滚动条停止滚动了，然后清除定时器
    if (window.pageYOffset == movescroll) {
        clearInterval(interval);
        interval = null;
        backTop.style.transform = "rotate(0deg)";
        // 如果被卷去的头部等于0，那么就把小火箭隐藏起来
        if (window.pageYOffset == 0) {
            backTop.style.top = "-50px";
        }
    }
};

// 点击小火箭,页面会到回顶部
backTop.addEventListener("click", function() {
    clearInterval(topscroll);
    var topscroll = setInterval(function() {
        var moveseat = (window.pageYOffset - 0) / 10;
        moveseat = moveseat > 0 ? Math.ceil(moveseat) : Math.floor(moveseat);
        if (window.pageYOffset == 0) {
            clearInterval(topscroll);
        }
        window.scroll(0, window.pageYOffset - moveseat);
    }, 30);
});
// 点击图片集后，目录会收起来,然后页面滑到图片集的位置
catalogue.children[0].children[1].children[0].addEventListener("click", function() {
    lcon.children[1].click();
    //626是图片集所在位置的被卷去头部的值，
    var topscroll = setInterval(function() {
        var moveseat = (626 - window.pageYOffset) / 10;
        moveseat = moveseat > 0 ? Math.ceil(moveseat) : Math.floor(moveseat);
        if (window.pageYOffset == 626) {
            clearInterval(topscroll);
        }
        window.scroll(0, window.pageYOffset + moveseat);
    }, 30);
});