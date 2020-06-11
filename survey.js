Survey
    .StylesManager
    .applyTheme("default");

var json = {
    title: "Imagine Modern Day Collesium in 2019 - Fight Or Die.",
    pages: [

        {
            // 1 - Intention when you come into the ring / ESTIMATED MINS / stamina
            title: "Opening of Round 1 : Directly across the ring is your opponent ready to give you 3 rounds of hell. You're in your corner, and the starting bell is about to ring. You tell yourself: ",
            questions: [
                {
                    type: "checkbox",
                    name: "estimated_minutes",
                    title: "Plese select from the list",
                    hasOther: false,
                    isRequired: true,
                    choices: [ 
                        { value: 4, text:"I want this to be a quick knockout because my stamina is mediocre " },
                        { value: 3.66, text:"I'm going to enjoy grinding down and punishing my opponent every second in the ring "}
                    ]
                }
            ]
        }, {
            // 2 - Striking to Grappling Attempt Ratio
            title: "Round 2 : You both made it through the first round. At the opening of the second, your opponent blitzes you with barrage of punches. You spot two opportunities: ",
            questions: [
                {
                    type: "checkbox",
                    name: "StrikingAttemptsToGrapplingAttempts_Ratio",
                    title: "Plese select from the list",
                    hasOther: false,
                    isRequired: true,
                    choices: [
                        { value: 4, text: "Circle outward exhibiting superior head movement while setting yourself up for a significant combo "},
                        {value: 3.66, text: "Judo throw your opponent, landing yourself in a dominant position on top, enabling you to throw significant ground strikes " }
                    ]
                }
            ]
        }, {
            // 3- Striking to Grappling Time
            title: "Round 3 : It's the first half of the final round. You both appear to have 30% left in the gas tank. Now, do you:",
            questions: [
                {
                    type: "checkbox",
                    name: "StrikingToGrapplingTime_Ratio",
                    title: "Plese select from the list",
                    hasOther: false,
                    isRequired: true,
                    choices: [
                        { value: 4, text:"Store your energy by throwing feints and jabs, ready to throw that overhand punch hoping for a knockout"},
                        { value: 5, text:"You throw feints to setup a double legtakedown, slamming them to the mat, hoping for dominant positon to throw crushing elbows, setting yourself up for a submission "}
                    ]
                }
            ]
        },{
            // 4 - PERCENT RANK Striking : Grappling Time Ratio
            title: "Round 3: It's the last two minutes of the final round. Your opponent has fought through everything you've given, and you both are fatigued. You spot two opportunities to finish him. Do you: ",
            questions: [
                {
                    type: "checkbox",
                    name: "PercentRank_StrikingToGrappingTime_Ratio",
                    title: "Plese select from the list",
                    hasOther: false,
                    isRequired: true,
                    choices: [
                        { value: 4, text:"Collect all of your strength and leap forward off the cage delivering devastating hooks "},
                        { value: 3.66, text:"Collect all of your energy to strategically clench, pull down on your opponent, and leap up for a surprise triangle choke "}
                    ]
                }
            ]
        },{
            // 5 - PERCENT RANK Striking : Grappling Attempt Ratio - most important feature based on confusion matrix - WEIGHT THIS ONE THE HEAVIEST*******
            title: "Final Scenario 5: The referee thrusts himself in between you and your unconcious opponent. You envision yourself: ",
            questions: [
                {
                    type: "checkbox",
                    name: "PercentRank_StrikingtoGrappingAttemps_Ratio",
                    title: "Please select from the list",
                    hasOther: false,
                    isRequired: true,
                    choices: [
                        { value: 5, text:"Winning via SUPERMAN PUNCH off the cage followed by vicious strikes resulting in an excellent COLD KNOCKOUT FINISH "},
                        { value: 3.66, text:"Winning via FLYING TRIANGLE FINISH while punishing him with elbows, and forcing him either TAP OUT or SLEEP on the canvas"}
                    ]
                }
            ]
        },
        // {
        //     title: "Please enter your name and e-mail",
        //     questions: [
        //         {
        //             type: "text",
        //             name: "name",
        //             title: "Name:"
        //         }, {
        //             type: "text",
        //             name: "email",
        //             title: "Your e-mail"
        //         }
        //     ]
        // }
    ]
};

window.survey = new Survey.Model(json);

survey
    .onComplete
    .add(function (result) {
        //document
            //.querySelector('#surveyResult')
            //.textContent = "Result JSON:\n" + JSON.stringify(result.data, null, 3);
            console.log(result.data)
            fetch("http://127.0.0.1:5000/predict", { 
                body: JSON.stringify(result.data),
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                }
            }).then(function(res){
                return res.json();
            }).then(response => {
                console.log(response);
                let imgURL = "";
                let message = "";

                if(response.data === "Grappler"){
                    console.log("Our Model Believes You're Truly A:");
                    message = "You is GRAPPLER! at heart!";
                    imgURL = "http://cdn0.sbnation.com/fan_shot_images/192406/288878293.gif"
                    console.log("Grappler!");

                } else {
                    console.log("Our Model Believes You're Truly A:");
                    message = "You are a STRIKER at heart!";
                    imgURL =  "https://thumbs.gfycat.com/InfatuatedImmediateDromaeosaur-size_restricted.gif";
                    console.log("Striker!");

                }
                document.querySelector("#surveyResult").innerHTML = `<img src='${imgURL}' />`
                document.querySelector("#surveyResultText").innerHTML = `<h2> '${message}'<h2/>`

                //
                //= 'Result JSON:\n' + JSON.stringify(response, null, 3);
                
            })
    });

survey.showProgressBar = 'bottom';

$("#surveyElement").Survey({model: survey});;