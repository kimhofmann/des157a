(function (){

    "use strict";
    console.log("reading js");

    const acotar = document.querySelector("#overlay1");
    const acomaf = document.querySelector("#overlay2");
    const acowar = document.querySelector("#overlay3");
    const acofas = document.querySelector("#overlay4");
    const acosf = document.querySelector("#overlay5");


    document.querySelector("#acotar").addEventListener("click", function(event){
        event.preventDefault();

        //OVERLAY DIALOG BOX
        acotar.className = "show";

        
    });

    document.querySelector("#acomaf").addEventListener("click", function(event){
        event.preventDefault();

        //OVERLAY DIALOG BOX
        acomaf.className = "show";

        
    });

    document.querySelector("#acowar").addEventListener("click", function(event){
        event.preventDefault();

        //OVERLAY DIALOG BOX
        acowar.className = "show";

        
    });

    document.querySelector("#acofas").addEventListener("click", function(event){
        event.preventDefault();

        //OVERLAY DIALOG BOX
        acofas.className = "show";

        
    });

    document.querySelector("#acosf").addEventListener("click", function(event){
        event.preventDefault();

        //OVERLAY DIALOG BOX
        acosf.className = "show";

        
    });


    document.addEventListener('keydown', function(event){
        if (event.key === 'Escape') {
            document.querySelectorAll(`#overlay1, #overlay2, #overlay3, #overlay4, #overlay5`).className = 'hidden';
        }
    });

 
})();