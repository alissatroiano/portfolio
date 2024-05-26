/* Please ❤ this if you like it! */

(function() { 
    "use strict";
	
    // Page cursors
    document.getElementsByTagName("body")[0].addEventListener("mousemove", function(n) {
        t.style.left = n.clientX + "px"; 
        t.style.top = n.clientY + "px"; 
        e.style.left = n.clientX + "px"; 
        e.style.top = n.clientY + "px"; 
        i.style.left = n.clientX + "px"; 
        i.style.top = n.clientY + "px";
    });

    var t = document.getElementById("cursor"),
        e = document.getElementById("cursor2"),
        i = document.getElementById("cursor3");

    function n(t) {
        e.classList.add("hover"); 
        i.classList.add("hover");
    }

    function s(t) {
        e.classList.remove("hover"); 
        i.classList.remove("hover");
    }

    s();

    var r = document.querySelectorAll(".hover-target");
    for (var a = r.length - 1; a >= 0; a--) {
        o(r[a]);
    }

    function o(t) {
        t.addEventListener("mouseover", n); 
        t.addEventListener("mouseout", s);
    }

    // Switch light/dark
    document.querySelector(".switch").addEventListener("click", function() {
        if (document.body.classList.contains("light")) {
            document.body.classList.remove("light");
            document.querySelector(".switch").classList.remove("switched");
        } else {
            document.body.classList.add("light");
            document.querySelector(".switch").classList.add("switched");
        }
    });

    document.addEventListener("DOMContentLoaded", function() {	
        // Hero Case study images
        var slideButtons = document.querySelectorAll('.slide-buttons li');
        var heroSections = document.querySelectorAll('.hero-center-section');
        
        slideButtons.forEach(function(button, index) {
            button.addEventListener('mouseenter', function() {
                document.querySelector('.slide-buttons li.active').classList.remove('active');
                document.querySelector('.hero-center-section.show').classList.remove("show");
                heroSections[index].classList.add("show");
                button.classList.add('active');
            });
        });

        slideButtons[0].dispatchEvent(new Event('mouseenter'));
    });
})();
