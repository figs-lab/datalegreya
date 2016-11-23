/*
MIT License

Copyright (c) 2016 Figs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

// global variables
var xlegend1 = null;
var xlegend2 = null;
var ylegend1 = null;
var ylegend2 = null;
var minMarker = "none";
var maxMarker = "none";

/**
 * called when a input of the form is changed by the user
 * @param {String} id   html id of the element which is changed by the user
 */
function input_changed_on(id)
{
    var strText = document.getElementById("inputText").value;
    var strValues = document.getElementById("inputValues").value;
    
    // permissive string parsing to array of numbers
    var strValues = strValues.split(/(?:\s+)?(?:[,;]|\s+)(?:\s+)?/g).map(function(item) {return parseFloat(item, 10);});
    
    // get the min and max values
    var minValue = parseFloat(document.getElementById("minValue").value);
    var maxValue = parseFloat(document.getElementById("maxValue").value);
    if(isNaN(minValue)) minValue = null;
    if(isNaN(maxValue)) maxValue = null;
    var params = {min:minValue, max:maxValue};
    
    // get the legends
    if(xlegend1 != null) params.xlegend1 = xlegend1;
    if(xlegend2 != null) params.xlegend2 = xlegend2;
    if(ylegend1 != null && ylegend2 != null) {
        params.ylegend1 = ylegend1;
        params.ylegend2 = ylegend2;
    }
    
    // get the min and max markers
    params.minMarker = minMarker;
    params.maxMarker = maxMarker;
    var result = convert_string_full(strText, strValues, params);
    
    // display the result
    document.getElementById("outputText").innerHTML = result;
    document.getElementById("outputCode").innerHTML = result;
}


/**
 * called when a input of the legend is changed by the user
 * @param {String} id   html id of the element which is changed by the user
 */
function legend_changed_on(id)
{
    validate_legend_format(id);
    input_changed_on("inputText");
}


/**
 * validate the format of the legend fields
 * @param {String} id   html id of the element which is changed by the user
 */
function validate_legend_format(id)
{
    var input = document.getElementById(id).value;
    // legends are quite rigid, they must be 5 characters long, with only lowercase letters, digits, / or : signs
    // if thoses rules are respected for the selected field...
    if(/([a-z\d\/:  ]{5})/g.test(input) && input.length==5){
        // store the value of the field in the corresponding variable
        window[id] = input;
        // apply validation format to this field
        document.getElementById(id).classList.remove("legendInvalid");
        document.getElementById(id).classList.add("legendValid");
    // if thoses rules are not respected
    }else{
        // corresponding variable is set to null
        window[id] = null;
        // unvalidation format is applyed to the field
        document.getElementById(id).classList.add("legendInvalid");
    }
}


/**
 * called when a radio button describing the appearance of the min / max markers is changed
 * @param {String} radios name of the radio buttons group
 */
function markers_type_changed_on(radios)
{
    var name = "";
    var value = 0;
    
    // get the value and name of the changed radio button
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            value = parseInt(radios[i].value);
            name = radios[i].name;
            break;
        }
    }
    
    // min marker
    if(name == "minMarker"){
        switch(value){
            case 1:
                minMarker = "short";
                break;
            case 2:
                minMarker = "full";
                break;
            default:
                minMarker = "none";
                break;
        }
    }
    
    // max marker
    if(name == "maxMarker"){
        switch(value){
            case 1:
                maxMarker = "short";
                break;
            case 2:
                maxMarker = "full";
                break;
            default:
                maxMarker = "none";
                break;
        }
    }
    
    // apply changes
    input_changed_on("inputText");
}


/**
 * called when user focus on a text area
 * @param {String} id   html id of the element which is changed by the suer
 */
function focus_on(id)
{
    document.getElementById(id).innerHTML="";
}


/**
 * called when user blurs on a text area
 * @param {String} id   html id of the element which is changed by the suer
 */
function blur_on(id)
{
    if(document.getElementById(id).value == ''){
        if(id == "inputText"){
            document.getElementById(id).innerHTML = "input your text here";
        }else if(id == "inputValues"){
            document.getElementById(id).innerHTML = "input your data here";
        }
    }
}

// copy to clipboard function managed by Clipboard.js
new Clipboard('#copyToClipboard');