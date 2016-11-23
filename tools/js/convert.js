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

/**
 * Minimalistic approach of conversion.
 * Merge a string and a list of values to get the correct display with the font
 * @param {String} string the string to convert
 * @param {Array}  values the values to be graphed. Be careful : you need as much values as the length of the string, plus each values must be en integer between 0 and 3
 * @returns {String} the datalegreya code to display the desired textgraph
 */
function convert_string_basic(string, values)
{
    var strRes = "";
    var char = "";
    wasNeutral = false;
    // datalegreya only takes lowercase letters
    string = string.toLowerCase();

    // for each char of the string and each value of the array, get the code to display datalegreya
    for(var i=0; i<string.length; i++){
        char = string.charAt(i);
        strRes = strRes + get_char_conversion(char, values[i]); 
    }
    // start value is always 0 using this function
    return "§0"+strRes;
}


/**
 * Conversion with full list of features.
 * Merge a string and a list of values to get the correct display with the font. Format the values according to datalegreya requirements (number of values matching the length of the screen, integers bewteen 0 and 3)
 * @param   {String}  string the string to convert
 * @param   {Array}   values the values to be graphed
 * @param   {Object}  params object describing the format of the returned string. params must be on the following format : 
 *                    {min:Number, max:Number, xlegend1:String, xlegend2:String, ylegend1:String, ylegend2:String, minMarker: String, maxMarker:String}
 *                    description of the parameters :
 *                    min optional : the minimal value for the datas
 *                    max optional : the maximal value for the datas
 *                    startValue : the start value of the data curve, default is the first value
 *                    xlegend1 : a string, 5 characters long, no more no less, may contain lowercase letters, digits, spaces, : sign, / sign
 *                    xlegend2 : a string, 5 characters long, no more no less, may contain lowercase letters, digits, spaces, : sign, / sign
 *                    ylegend1 : a string, 5 characters long, no more no less, may contain lowercase letters, digits, spaces, : sign, / sign
 *                    ylegend2 : a string, 5 characters long, no more no less, may contain lowercase letters, digits, spaces, : sign, / sign
 *                    minMarker : marker for the minimum value on the graph. possible values : 'none', 'short', 'full'
 *                    maxMarker : marker for the maximum value on the graph. possible values : 'none', 'short', 'full'
 *                    
 * @returns {String} the datalegreya code to display the desired textgraph
 */
function convert_string_full(string, values, params)
{
    // variables
    var strRes = "";
    var values1 = [];   
    var values2 = [];
    var rawValuesLength = values.length;
    var finalValuesLength = string.length;
    var minV = 10000000;
    var maxV = -10000000;
    
    // get the correct number of datas
    var smooth = Smooth(values, {method:Smooth.METHOD_NEAREST});
    var incr = (rawValuesLength)/(finalValuesLength);
    for(var i=0; values1.length<finalValuesLength; i+=incr){
        // interpolate data
        var v = smooth(i);
        values1.push(v)
        // find min / max in case they are not given in arguments
        minV = Math.min(minV, v);
        maxV = Math.max(maxV, v);
    }
    
    // get minimum and maximum indexes
    var minIndex = 0;
    var minValue = values1[0];
    var maxIndex = 0;
    var maxValue = values1[0];
    var minMarkerCode = "";
    var maxMarkerCode = "";
    for(var i=0; i<finalValuesLength; i++){
        if(values1[i] < minValue){
            minValue = values1[i];
            minIndex = i;
        }
        if(values1[i] >= maxValue){
            maxValue = values1[i];
            maxIndex = i;
        }
    }
    
    // set the min and max markers codes according to the given parameters
    if(params.minMarker != null){
        if(params.minMarker == "short"){
            minMarkerCode = "[-]";
        }else if(params.minMarker == "full"){
            minMarkerCode = "[--]";
        }
    }
    if(params.maxMarker != null){
        if(params.maxMarker == "short"){
            maxMarkerCode = "[+]";
        }else if(params.maxMarker == "full"){
            maxMarkerCode = "[++]";
        }
    }
    
    // put data in the correct range of numbers (0 >= integers >= 3)
    if(params.min == undefined) params.min = minV;
    if(params.max == undefined) params.max = maxV;
    if(params.min > minV) params.min = minV;
    if(params.max < maxV) params.max = maxV;
    var range = params.max-params.min;
    for(var i=0; i<finalValuesLength; i++){
        var v = Math.round(((values1[i]-params.min)/(range))*3);
        values2.push(v);
    }
    
    // set code for the start value of the curve
    var startValueCode = "";
    var startValue;
    if(params.startValue == null){
        startValue = values2[0];
    }else{
        startValue = Math.round(((startValue-params.min)/(range))*3);
    }
    startValueCode = "§"+startValue;
    
    // melt letters with values
    var strRes = "";
    var char = "";
    wasNeutral = false;
    string = string.toLowerCase();
    for(var i=0; i<string.length; i++){
        char = string.charAt(i);
        strRes = strRes + get_char_conversion(char, values2[i], i==0); 
        if(i == minIndex) strRes = strRes + minMarkerCode;//+"§"+values2[i];
        if(i == maxIndex) strRes = strRes + maxMarkerCode;//+"§"+values2[i];
    }
    
    // manage legends according to the given parameters
    var xlegend1Code = "";
    var xlegend2Code = "";
    var ylegendCode = "";    
    if(params.xlegend1 != null){
        xlegend1Code = "{"+params.xlegend1+"}"
    }
    if(params.xlegend2 != null){
        xlegend2Code = "{"+params.xlegend2+"}"
    }
    if(params.ylegend1 != null && params.ylegend2 != null){
        ylegendCode = "["+params.ylegend1+"["+params.ylegend2+"]";
    }
    
    // get the result
    return xlegend1Code + startValueCode + strRes + xlegend2Code + ylegendCode;
}


/**
 * convert a single character in the corresponding FigsCode according to the value passed in parameter
 * @param {String}  char  the character to convert
 * @param {Number}  val   the value (integer in range [0-3])
 */
function get_char_conversion(char, val)
{
    
    if(char == "\n"){return "\n";}
    // string delimiters
    var pipe = "|";
    var section = "§";
    var antislash = "\\";
    var res = "";

    // list the neutral characters which can't display the graph
    var neutralChars = /[\d“”«»‘⸸'"’\(\)\*,\.\/\:;<>\?\[\]_\{\|\}...·—–\!\s]/g;
    
    if(neutralChars.test(char)){
        res += char;
        wasNeutral = true;
    }else{
        if(wasNeutral){
            res += antislash;
            wasNeutral = false;
        }
        res += char + pipe + val;
    }
    return res;
}

// store the information of a neutral character
wasNeutral = false;