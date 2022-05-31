function fadeIn(element) {
    var element = document.getElementById('hero');

    var duration = 0.5;
    var interval = 10;//ms
    var op = 0.0;
    var iop = element.style.opacity;
    var timer = setInterval(function () {
        if (op >= iop) {
            op = iop;
            clearInterval(timer);
        }
        element.style.opacity = op;
        op += iop/((1000/interval)*duration);
    }, interval);
}