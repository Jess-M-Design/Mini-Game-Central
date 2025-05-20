$(document).ready(function () {



    var qArray;
    var right;
    var wrong;
    var unanswered;
    var currentIndex;
    var timeIsUp;

    var questionTimer = {
        time: 30,

        reset: function () {
            questionTimer.time = 30;
        },
        start: function () {
            $("#time").html("Time Remaining: " + questionTimer.time);
            counter = setInterval(questionTimer.count, 1000);
            document.getElementById("time").style.background = "white";
            document.getElementById("questions").style.background = "white";
            document.getElementById("result").style.background = "white";
        },
        stop: function () {
            clearInterval(counter);
        },
        count: function () {
            questionTimer.time--;
            $("#time").html("Time Remaining: " + questionTimer.time);
        }
    };



    function startTrivia() {
        
        qArray = [{
            question: "In Greek Mythology, who is the Queen of the Underworld and wife of Hades?",
            answers: ["Aphrodite", "Demeter", "Hera", "Persephone"],
            correctanswer: 3
        }, {
            question: "What is the rarest blood type?",
            answers: ["O-positive", "AB-Negative", "A-positive", "B-negative"],
            correctanswer: 1
        }, {
            question: "What is the name of the longest river in South America?",
            answers: ["Yangtze River", "The Nile", "Amazon River", "Congo River"],
            correctanswer: 2
        }, {
            question: "Where is the Great Barrier Reef located?",
            answers: ["Australia", "New Zealand", "Madagascar", "Argentina"],
            correctanswer: 0
        }]

        right = 0;
        wrong = 0;
        unanswered = 0;

        currentIndex = -1;

        // Clear previous content and styling
    $("#time").empty();
    $("#questions").empty().css("background", "transparent");
    $("#result").empty();

        // start button
        $('#questions').html("<button id='start' class='answer-button'><span class='shadow'></span><span class='edge'></span><span class='front text'> Start</span></button>");
        $('#answer0, #answer1, #answer2, #answer3').hide().off('click');

        $('#start').on("click", function () {
            advance();
        });
    }

    function askQuestions() {
        questionTimer.start();
        $('#questions').html(qArray[currentIndex].question);

         //   first answer, first one in array always starts at 0
        $('#answer0').show().html(`
            <span class="shadow"></span>
            <span class="edge"></span>
            <span class="front text">${qArray[currentIndex].answers[0]}</span>
          `);
          $('#answer0').attr("value", 0).addClass("answer-button");
          
        //   second answer
          $('#answer1').show().html(`
            <span class="shadow"></span>
            <span class="edge"></span>
            <span class="front text">${qArray[currentIndex].answers[1]}</span>
          `);

          $('#answer1').attr("value", 1).addClass("answer-button");
          
           //   third answer
          $('#answer2').show().html(`
            <span class="shadow"></span>
            <span class="edge"></span>
            <span class="front text">${qArray[currentIndex].answers[2]}</span>
          `);
          $('#answer2').attr("value", 2).addClass("answer-button");

           //   fourth answer
          $('#answer3').show().html(`
            <span class="shadow"></span>
            <span class="edge"></span>
            <span class="front text">${qArray[currentIndex].answers[3]}</span>
          `);
          $('#answer3').attr("value", 3).addClass("answer-button");
        $('#result').hide().off('click');

        onClickAnswer();
    }

    function onClickAnswer() {
        $('.answer-button').on("click", function () {
            var buttonClick = parseInt($(this).attr("value"));
            if (buttonClick === qArray[currentIndex].correctanswer) {
                rightAnswer();
            } else {
                wrongAnswer();
            }
        });
    }
    

    function rightAnswer() {
        clearTimeout(timeIsUp);
        right++;
        questionTimer.stop();
        questionTimer.reset();
        timeIsUp = 0;
        $("#time").empty().css("background", "transparent"); // ✅ Fix here
        $("#questions").html("<h3>Correct!</h3>");
        $('#answer0, #answer1, #answer2, #answer3').hide().off('click');
        $('#result').show().html("You have chosen... Wisely! You will now advance to the next question.");
        timeIsUp = setTimeout(advance, 1000);
      }
      

    function wrongAnswer() {
        clearTimeout(timeIsUp);
        wrong++;
        questionTimer.stop();
        questionTimer.reset();
        timeIstUp = 0;
        $("#time").empty().css("background", "transparent"); // ✅ Fix here
        $("#questions").html("<h3>Incorrect!</h3>");
        $('#answer0, #answer1, #answer2, #answer3').hide().off('click');
        $('#result').show().html("You have chosen... Poorly! You did not earn a point, prepare for the next question.");

        timeIsUp = setTimeout(advance, 1 * 1000);
    }

    function timesUp() {
        clearTimeout(timeIsUp);
        unanswered++;
        questionTimer.stop();
        questionTimer.reset();
        // $("#time").empty();
        $("#question").html("<h2>Time's Up!</h2>");
        $('#answer0, #answer1, #answer2, #answer3').hide().off('click');
        $('#result').show().html("Your time is up! You did not earn a point, prepare for the next question.");

        timeIsUp = setTimeout(advance, 6 * 1000);
    }

    function endScreen() {
        $("#time, #questions, #result").css("background", "transparent");
        $("#questions, #result").empty().hide();
        $("#time").html("<h2>Great job!</h2>");
    
        $(".modal-text").html("Your Results <br><br>Right: " + right + "<br>Wrong: " + wrong + "<br>Unanswered: " + unanswered);
    
        // Lock the modal so it can't be dismissed by clicking outside
        $("#game-modal").modal({
            backdrop: 'static',
            keyboard: false
        });
    
        $(document).off("click", "#continue").on("click", "#continue", function () {
            $("#game-modal").modal("hide");
        
            // Fade out content
            $("#time, #questions, #result").fadeOut(300, function () {
                startTrivia(); // Reset game
                $("#time, #questions, #result").fadeIn(300); // Fade back in
            });
        });
        
    
        $("#game-modal").modal("show");
    }
    
    

    

    function advance() {
        currentIndex++;

        if (currentIndex < qArray.length) {
            askQuestions();
            timeIsUp = setTimeout(timesUp, 30 * 1000);
        } else {
            endScreen();
            console.log("Attempting to show modal...");
            console.log($("#game-modal").length ? "Modal exists" : "Modal missing");
            $("#game-modal").modal("show");
            // ✅ This must run at the end
        }
    }


    startTrivia();
    showOpeningModal();
});

