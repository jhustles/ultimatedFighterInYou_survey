Survey
    .StylesManager
    .applyTheme("default");

var json = {
    title: "Imagine Fight Or Die",
    pages: [

        {
            // 1 - Intention when you come into the ring / ESTIMATED MINS / stamina
            title: "Opening Scenario : Directly across the ring is your opponent ready to give you 3 rounds of hell. You're in your corner, and the starting bell is about to ring. You tell yourself: ",
            questions: [
                {
                    type: "checkbox",
                    name: "estimated_minutes",
                    title: "Plese select from the list",
                    hasOther: false,
                    isRequired: true,
                    choices: [ 
                        { value: 1, text:"I want this to be a quick knockout because my stamina is mediocre." },
                        { value: 0.05, text:"I'm going to enjoy wearing your opponent down and punishing him every second in there."}
                    ]
                }
            ]
        }, {
            // 2 - Striking to Grappling Attempt Ratio
            title: "Scenario 2 : You both made it through the first round. At the opening of the second, your opponent blitzes you with barrage of punches, and you spot two opportunities:",
            questions: [
                {
                    type: "checkbox",
                    name: "StrikingAttemptsToGrapplingAttempts_Ratio",
                    title: "Plese select from the list",
                    hasOther: false,
                    isRequired: true,
                    choices: [
                        { value: 1, text: "Circle outward exhibiting superior head movement while setting you up for significant strikes"},
                        {value: 0.05, text: "Judo throw him landing you in a dominant position on top to throw crushing blows" }
                    ]
                }
            ]
        }, {
            // 3- Striking to Grappling Time
            title: "Scenario 3 : It's the final round. You both appear to have 30% left in the gas tank. Do you:",
            questions: [
                {
                    type: "checkbox",
                    name: "StrikingToGrapplingTime_Ratio",
                    title: "Plese select from the list",
                    hasOther: false,
                    isRequired: true,
                    choices: [
                        { value: 1, text:"Store your energy by throwing feints and jabs, ready to throw that overhand punch hoping for a knockout"},
                        { value: 0.05, text:"You throw feints to dive in on a double legtakedown slamming them to the mat"}
                    ]
                }
            ]
        },{
            // 4 - PERCENT RANK Striking : Grappling Time Ratio
            title: "Scenario 4 : Your opponent is visibly dazed, and you know it's your opportunity to finish him. Do you: ",
            questions: [
                {
                    type: "checkbox",
                    name: "PercentRank_StrikingToGrappingTime_Ratio",
                    title: "Plese select from the list",
                    hasOther: false,
                    isRequired: true,
                    choices: [
                        { value: 1, text:"Collect all of your strength into your legs to leap upwards delivering a devastating knee throught your opponenets standing guard"},
                        { value: 0.05, text:"Strategically clench and pull on your opponent with all your might for an epic and unpredictable submission finish "}
                    ]
                }
            ]
        },{
            // 5 - PERCENT RANK Striking : Grappling Attempt Ratio - most important feature based on confusion matrix - WEIGHT THIS ONE THE HEAVIEST*******
            title: "Scenario 5: The referee thrusts himself in between you and your unconcious opponent :",
            questions: [
                {
                    type: "checkbox",
                    name: "PercentRank_StrikingtoGrappingAttemps_Ratio",
                    title: "Please select from the list",
                    hasOther: false,
                    isRequired: true,
                    choices: [
                        { value: 1, text:"You won with a flying knee, excellent knockout. "},
                        { value: 0.05, text:"You won with a surprise flying triangle putting him to sleep within seconds of landing on the mat."}
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
                if(response.data === "Grappler"){
                    console.log("Our Model Believes You're Truly A:");
                    imgURL = "https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2FHiEUAzW717LlS%2Fgiphy.gif&f=1"
                    console.log("Grappler!");
                } else {
                    console.log("Our Model Believes You're Truly A:");
                    imgURL =  "https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia1.tenor.com%2Fimages%2F9881a4157ba8e9cff623da84dd98e430%2Ftenor.gif%3Fitemid%3D10565598&f=1";
                    console.log("Striker!");
                }
                document.querySelector("#surveyResult").innerHTML = `<img src='${imgURL}' />`
                //= 'Result JSON:\n' + JSON.stringify(response, null, 3);
            })
    });

survey.showProgressBar = 'bottom';

$("#surveyElement").Survey({model: survey});;