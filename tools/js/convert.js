// store the information of a neutral character
wasNeutral = false;

/**
 * merge a string and a list of values to get the correct display with the font
 * @param {String} string the string to convert
 * @param {Array}  values the values to be graphed. Be careful : you need as much values as the length of the string, plus each values must be en integer between 0 and 3
 * @return the datalegreay code to display the desired textgraph
 */
function convert_string(string, values)
{
    var strRes = "";
    var char = "";
    wasNeutral = false
            
    for(var i=0; i<string.length; i++){
        char = string.charAt(i);
        strRes = strRes + get_char_conversion(char, value[i], i==0); 
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