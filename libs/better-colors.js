if(typeof Globals.BC_NO_OVERRIDE === "undefined")
{
	/**
	 * Should module not override onetap functions?
	 * @type {Boolean}
	 */
	Globals.BC_NO_OVERRIDE = false;
}

module.exports =
{
	/**
	 * Color bytes for csgo chat
	 */
    ChatColor: //credits to https://github.com/aprxl
    {
		WHITE: "\x01",
		RED: "\x02",
		LIGHT_PURPLE: "\x03",
		GREEN: "\x04",
		LIGHT_GREEN: "\x05",
		LIME: "\x06",
		GRAY: "\x08",
		YELLOW: "\x09",
		LIGHT_BLUE: "\x0A",
		CYAN: "\x0B",
		BLUE: "\x0C",
		MAGENTA: "\x0D",
		PINK: "\x0E",
		LIGHT_RED: "\x0F",
		GOLD: "\x10",
    },
    /**
     * Default rgbs
     */
    Colors:
    {
		WHITE: [255,255,255,255],
		BLACK: [0,0,0,255],
		PINK: [255,100,255,255],
		RED: [255,0,0,255],
		LIME: [0,255,0,255],
		BLUE: [0,0,255,255],
		YELLOW: [255,255,0,255],
		CYAN: [0,255,255,255],
		MAGNETA: [255,0,255,255],
		SILVER: [192,192,192,255],
		GRAY: [128,128,128,255],
		DARK_RED: [128,0,0,255],
		GOLD: [128,128,0,255],
		DARK_YELLOW: [128,128,0,255], //same with gold
		GREEN: [0,128,0,255],
		PURPLE: [128,0,128,255],
		DARK_CYAN: [0,128,128,255],
		DARK_BLUE: [0,0,128,255]
}}
const oldPrintColor = Cheat.PrintColor.bind(Cheat);
/**
 * Better color printing
 */
module.exports.PrintColor = function()
    {
        arguments = Array.prototype.slice.call(arguments); //Arguments to an array

        if(getType(arguments[arguments.length - 1]) === "Array")
        {
			arguments.splice(arguments.length-1, 1);
            Cheat.PrintColor(module.exports.Colors.PINK, "[BetterColors] Useless last element, ignoring ", module.exports.Colors.SILVER, "why did you...\n");
        }

        switch(getType(arguments[0]))
        {
        	case "String":
        		arguments = arguments.reverse();
            	arguments.push(module.exports.Colors.WHITE);
            	arguments = arguments.reverse();
            	break;
            case "Array":
            	if(getType(arguments[1]) !== "String") throw new TypeError("Argument #2 must be a string, " + getType(arguments[1]) + " found");
            	break;
            default:
            	throw new TypeError("Argument #1 must be a string or an array, " + getType(arguments[0]) + " found");
        }
        var isPrevElString = true;
        var realArgNo = 2;
        for(var i = 2; i < arguments.length; i++)
        {
            realArgNo++;
            if(isPrevElString)
            {
                if(getType(arguments[i]) === "String") //idk just added support for 2+ strings in a row
                {
                    arguments[i-1] = arguments[i-1].concat(arguments[i]);
                    arguments.splice(i--, 1);
                    continue;
                }
                else if(getType(arguments[i]) === "Array")
                {
                    isPrevElString = false;
                }
                else
                {
                    throw new TypeError("Argument #" + realArgNo + " must be a string or an array, " + getType(arguments[i]) + " found");
                }
            }
            else if(getType(arguments[i]) !== "String")
            {
                throw new TypeError("Argument #" + realArgNo + " must be a string, " + getType(arguments[i]) + " found");
            }
            else
            {
                isPrevElString = true;
            }
        }
		if(arguments.length % 2)
        {
            throw new Error("[BetterColors] some debug error, how did we even get odd count of args... ");
        }

        for(var i = 0; i < arguments.length-1; i+=2)
        {
            oldPrintColor(parseColorArray(arguments[i]), arguments[i+1]); //lmao so much code could be replaced just with this line
        }
    }

if(!Globals.BC_NO_OVERRIDE) 
{
	Cheat.PrintColor = module.exports.PrintColor;
}

function getType(obj) // https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
{ 
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1];
}

function parseColorArray(array)
{
	if(getType(array) !== "Array") throw new TypeError("Array required, " + getType(array) + " found");
	if(array.length < 3 || array.length > 4) throw new Error((array.length < 3 ? "Not enough" : "Too many") + " elements (" + array.length + "), 3-4 required");
	for(var i in array)
	{
		if(getType(array[i]) !== "Number") throw new TypeError("Element #" + i + " must be a number, " + getType(array[i]) + " found");
	}
	if(array.length == 3) array[3] = 255;
	return array;
}

/*
Object.keys(module.exports.Colors).forEach(function(i)
{
    /**
     * Changes default color alpha
     * @param  {Number} alpha Alpha amount to set 				WHOLE OF THIS SHIT USELESS
     * @return {Array}          Color with new alpha 			CUZ ALPHA DOES NOT CHANGE ANYTHING
     *\/ 														AT ALL!
    module.exports.Colors[i].alpha = function(alphaInt)
    {
        this[3] = alphaInt;
        return this;
    }
});
*/

//module.exports.PrintColor("[", module.exports.Colors.CYAN, "BetterColors", module.exports.Colors.WHITE, "] ", module.exports.Colors.YELLOW/*.alpha(0)*/, "Thanks for using ", [0,255,0,1], "BetterColors", "\n", []); //just a test msg