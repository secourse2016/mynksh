var boom = $('.impact'),
    bomb = $('.bomb'),
    page = $('.page'),
    reset = $('.reset'),
    wave1 = $('.wave1'),
    h1 = $('h1'),
    end = $('h2'),
    resultSpan = $('h2 span'),
    body = $('body'),
    bombCounter = 0,
    savedHighScore = localStorage.getItem('highScoreCP'),
    highScoreTable = $('.board'),
    highScore = $('.board span');

savedHighScore === null || undefined ? localStorage.setItem('highScoreCP', '0') : highScore.html(savedHighScore);

//add
var seqeunce = setInterval(function() {
    resultSpan.html(function(_, num) {
        return +num + Math.floor(Math.random() * 9959);
    })
}, 1000);

//click
bomb.click(function() {

    function shakeEffect(classname, endTime) {
        $('body').addClass(classname);
        setTimeout(function() {
            $('body').removeClass(classname);
        }, endTime);
    }

    page.addClass('switch');
    h1.addClass('switch');

    $(this).addClass('switch');

    var lightWave = function() {
        wave1.removeClass('wave1--fire');
        setTimeout(function() {
            wave1.addClass('wave1--fire');
        }, 200);

    }

    setTimeout(function() {
        lightWave();
        shakeEffect('shake', 1000);
    }, 2000);

    setTimeout(function() {
        boom.addClass('switch');
    }, 2500);

    setTimeout(function() {
        lightWave();
        shakeEffect('shake-hard', 3000);
        $('.bomb').hide('slow');
    }, 3700);

    setTimeout(function() {
        body.addClass('switch');
        scores();
    }, 7500);

    setTimeout(function() {
        page.removeClass('switch');
        page.addClass('ending');
    }, 7600);

    setTimeout(function() {
        end.addClass('switch');

    }, 10000);

    setTimeout(function() {

        resultSpan.addClass('termination');
        clearInterval(seqeunce);
        var result = resultSpan.html();
        if (parseInt(result) > parseInt(savedHighScore)) {
            highScore.html(result);
            highScoreTable.addClass('update');
            localStorage.setItem('highScoreCP', result);
            console.log('HighScore saved: ' + result + ' points!');

        }

    }, 15000);

    function scores() {
        bombCounter++;
        if (bombCounter > 1) {
            var current = resultSpan.text();
            var result = Math.round(current * 1.5);
            resultSpan.text(result);
            console.log('Hit number: ' + bombCounter);
        }
    }
});

//reset
reset.click(function() {
    window.location.href = window.location.href;
});