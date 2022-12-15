
// Funcion Clock , reloj digital
var inputhour = document.getElementById("hour").value;
var inputminut = document.getElementById("minut").value;
var inputsecond = document.getElementById("seconds").value;

function othername() {
    alert(inputhour + " : " + inputminut + " : " + inputsecond );
}

    function Clock() {
        var start = function() { // Start Clock
            return new Date();
        };

        var formatTime = function(time, formatTimeSize) {
            var hours = addLeadingZero(time.getHours() % 12, formatTimeSize);
            var minutes = addLeadingZero(time.getMinutes(), formatTimeSize);
            var seconds = addLeadingZero(time.getSeconds(), formatTimeSize);
            var timeStamp = hours + " : " + minutes + " : " + seconds;
            var franja = (time.getHours() < 12) ? "AM" : "PM";
            return {
                timeStamp,
                franja
            };
        }


        var addLeadingZero = function(time, size) {
            var appendedTime = "0000" + time;
            return appendedTime.substring(appendedTime.length - size);
        }


        return {
            start: start,
            formatTime: formatTime
        };
    }


    var clockFace = document.getElementById('clock-face'),
        franja = document.getElementById('franja'),
        startButton = document.getElementById('start'),
        pauseButton = document.getElementById('pause'),
        resetButton = document.getElementById('reset');


    var clock = new Clock();

    var interval,
        intervalTime = 500,
        formatTimeSize = 2,
        clockRunning = false;


    var initializeClock = function() {
        startButton.disabled = false;
        pauseButton.disabled = true;
        resetButton.disabled = true;
        clockRunning = false;
        interval = null;
        clockFace.innerHTML = "00 : 00 : 00";
        franja.innerHTML = "AM";
    }


    var startClock = function() {

        if (!clockRunning) {
            interval = setInterval(function() {
                var formattedTime = clock.formatTime(clock.start(), formatTimeSize);
                clockFace.innerHTML = formattedTime['timeStamp'];
                franja.innerHTML = formattedTime['franja']; // AM o PM
            }, intervalTime);
            clockRunning = true;
            startButton.disabled = true;
            pauseButton.disabled = false;
            resetButton.disabled = true;
        }
    }


    var pausa = function() {
        return (pauseButton.value === "Pausar") ? atura() : arrenca();
    }


    var atura = function() {
        if (clockRunning) {
            clearInterval(interval);
            interval = null;
            clockRunning = false;
            pauseButton.value = "Arrancar";
            resetButton.disabled = false;
        }
    }


    var arrenca = function() {
        if (!clockRunning) {
            pauseButton.value = "Pausar";
            startClock();
        }
    }


    var reset = function() {
        pauseButton.value = "Pausar";
        clearInterval(interval);
        initializeClock();
    }



startButton.addEventListener('click', startClock);
pauseButton.addEventListener('click', pausa);
resetButton.addEventListener('click', reset);



