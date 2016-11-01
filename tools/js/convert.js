// Example : 
document.getElementById("quote").innerHTML = convert_string_full("No. Calm down, learn to enjoy losing", [3, 2, 1, 4, 5, 0, 7, 2], 0, 10);


/**
 * merge a string and a list of values to get the correct display with the font. Format the values according to datalegreya requirements (number of values matching the length of the screen, integers bewteen 0 and 3)
 * @param   {String} string the string to convert
 * @param   {Array}  values the values to be graphed
 * @param   {Number}  min optional : the minimal value for the datas
 * @param   {Number}  max optional : the maximal value for the datas
 * @returns {String} the datalegreay code to display the desired textgraph
 */
function convert_string_full(string, values, min, max)
{
    var strRes = "";
    var values1 = [];   
    var values2 = [];
    var rawValuesLength = values.length;
    var finalValuesLength = string.length;
    var minV = 10000000;
    var maxV = -10000000;
    
    // get the correct number of datas
    var smooth = Smooth(values);
    
    var incr = (rawValuesLength)/(finalValuesLength);
    
    for(var i=0; values1.length<finalValuesLength; i+=incr){
        // interpolate data
        var v = smooth(i);
        values1.push(v)
        // find min / max in case they are not given in arguments
        minV = Math.min(minV, v);
        maxV = Math.max(maxV, v);
    }
    
    // put data in the correct range of numbers
    if(min == undefined) min = minV;
    if(max == undefined) max = maxV;
    var range = max-min;
    for(var i=0; i<finalValuesLength; i++){
        //var v = minV + (maxV - minV) * (values1[i] - min) / (max - min);
        var v = Math.round(((values1[i]-min)/(range))*3);
        values2.push(v);
    }
    
    strRes = convert_string_basic(string, values2);
    
    return strRes;
}

// store the information of a neutral character
wasNeutral = false;


/**
 * merge a string and a list of values to get the correct display with the font
 * @param {String} string the string to convert
 * @param {Array}  values the values to be graphed. Be careful : you need as much values as the length of the string, plus each values must be en integer between 0 and 3
 * @returns {String} the datalegreay code to display the desired textgraph
 */
function convert_string_basic(string, values)
{
    var strRes = "";
    var char = "";
    wasNeutral = false;
    string = string.toLowerCase();
            
    for(var i=0; i<string.length; i++){
        char = string.charAt(i);
        strRes = strRes + get_char_conversion(char, values[i], i==0); 
    }
    return strRes;
}


/**
 * convert a single character in the corresponding FigsCode according to the value passed in parameter
 * @param {String}  char  the character to convert
 * @param {Number}  val   the value (integer in range [0-3])
 * @param {boolean} start   is it the first character of the string ?
 */
function get_char_conversion(char, val, start)
{
    
    if(char == "\n"){return "\n";}
    // string delimiters
    var pipe = "|";
    var section = "§";
    var antislash = "\\";
    
    // add a start value of 0 if this is the start of the string
    var res = start ? ""+section+"0" : "";

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