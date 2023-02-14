( function(){
    'use strict';
    console.log('reading Javascript');
    const madl= document.getElementById("madlib")
    const form = document.querySelector('#myform');
    let formValue;


    form.addEventListener("submit", function(event){
        event.preventDefault();

        const bname = document.getElementById('bname').value;
        const aadj = document.getElementById('aadj').value;
        const cname = document.getElementById('cname').value;
        const hadj = document.getElementById('hadj').value;
        const djob = document.getElementById('djob').value;
        const excl = document.getElementById('excl').value;
        const fname = document.getElementById('fname').value;

        let MyText; //defined below

        const myText = ` Dear ${bname}, <br>
        <br>
        I hope this email does not find you well. In all honesty, my time working for you has been ${aadj} to say the least. I literally cannot find a single fuck to give any longer, and will be pleased to leave my position at ${cname}. Over the past six years, I have never been more ${hadj} to know that I will no longer have to listen to your incessant whining while you sit around making three times my salary.  I will finally be able to pursue my dream of becoming a ${djob}, a dream driven by my burning desire to get away from you. <br>
        <br>
        <br>
        All the worst and ${excl},<br>
        ${fname}`;

        madl.innerHTML = myText;
    });

    document.querySelector('.open').addEventListener('click', function(event){
        event.preventDefault();
        document.getElementById('overlay').className = 'showing';
    });

    document.addEventListener('keydown', function(event){
        if (event.key === 'escape') {
            document.getElementById('overlay').className = 'hidden';
        }
    });


})();

