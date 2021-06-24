/******************************************************************************
* Interest rate slider                                                        *
******************************************************************************/

function updateSliderValue () {
    // Get the input slider node, and the span value node
    var nodeRateSlider = document.getElementById("rate_slider");
    var nodeRateValue = document.getElementById("rate_value");

    // Get the input slider node, and the span value node
    nodeRateValue.innerHTML = nodeRateSlider.value + "%";
}

/******************************************************************************
* Years dropdown                                                              *
******************************************************************************/

function fillYears() {
    var nodeYearsSelect = document.getElementById("years");
    for (var i = 1; i <= 30; i++) {
        var newOptionNode = document.createElement("option");
        newOptionNode.value = i;
        newOptionNode.innerHTML = i;
        nodeYearsSelect.appendChild(newOptionNode);
    }
}

/******************************************************************************
* Interest rate slider                                                        *
******************************************************************************/

// Function to check if a variable can be parsed into a valid float
function isValidFloat(input) {
    if (!isNaN(parseFloat(input)) && isFinite(parseFloat(input))) {
        return true;
    } else {
        return false;
    }
}

function compute() {
    // Get the input nodes and the output message node
    var nodePrincipal = document.getElementById("principal");
    var nodeRateSlider = document.getElementById("rate_slider");
    var nodeYears = document.getElementById("years");
    var nodeOutputMessage = document.getElementById("output_message");

    // Get the input values
    var principal = nodePrincipal.value;
    var rate = nodeRateSlider.value;
    var years = nodeYears.options[nodeYears.selectedIndex].value;
    console.log(years);

    // inputHasError contains true if values are not suitable
    var inputHasError = false;

    // TODO alert
    // checks that principal contains a valid and positive number
    // parses it into float
    if (!isValidFloat(principal)) {
        inputHasError = true;
    } else {
        principal = parseFloat(principal);
        if (principal <= 0) {
            inputHasError = true;
        }
    }
    if (inputHasError) {
        window.alert("Please enter a positive number in amount.");
        nodePrincipal.value = "";
        nodePrincipal.focus();
    }

    // checks that rate contains a valid and positive number
    // parses it into float
    if (!isValidFloat(rate)) {
        inputHasError = true;
    } else {
        rate = parseFloat(rate);
        if (rate <= 0) {
            inputHasError = true;
        }
    }

    // checks that years contains a valid and positive number
    // parses it into int
    if (!isValidFloat(years)) {
        inputHasError = true;
    } else {
        years = parseInt(years);
        if (years <= 0) {
            inputHasError = true;
        }
    }

    var outputMessage = "";
    
    // if the inputs contain error(s), create error message
    if(inputHasError) {
        outputMessage = "<span class=\"output_error\">Please enter valid parameters.</span>";
    } else {
        // Compute the interest rate amount received
        // The amount is rounded to the nearest int for better readability
        var intRateAmount = Math.round(principal * (rate / 100) * years);

        // Compute endYear as today's year + years from the input
        var today = new Date();
        var currentYear = today.getFullYear();
        var endYear = currentYear + years;

        // Create message
        outputMessage = "If you deposit <span class=\"output_highlight\">" + principal + "</span> " +
            "at an interest rate of <span class=\"output_highlight\">" + rate + "%</span>, " +
            "you will receive an amount of <span class=\"output_highlight\">" + intRateAmount + "</span> " +
            "in the year <span class=\"output_highlight\">" + endYear + "</span>.";
    }
    
    // Update the output node
    nodeOutputMessage.innerHTML = outputMessage;
}

/******************************************************************************
* Function to run after loading body                                          *
******************************************************************************/

function loadBody() {
    fillYears();
    updateSliderValue();
}