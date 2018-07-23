//<!-- Global variables declaration -->
var map;
var grid;
var userPosition = null;
var staticLayer; // Contains static layer
var tileLayer; // Contains Gmap layer
var currentWindow;
var instance = null; // jsPlumb instance. Takes a value when initJsPlumb() is
						// invoked.
var mapSelection = null;
var inMain = false;
var mapType = 'SatelliteMap'; // String that indicates type of map is
								// currently being used (2DMap, GeoMap,SatelliteMap)
var done = false; // See usage of this variable in popBoxMapa.js;
// Markers at the corners can be used for arbitrary transformation.
var affineMarkers = [];
// List of all markers in the map
var markers = [];
var importPopbox = false;

// Array that will be fill each time a content is created.
var contents = [];

// Indicates if an XML file has been loaded in order to keep the INCREMENT
// variable to set IDs fine.
var xmlLoaded = false;
var increment = 0; // This variable is used to differentiate the id of each
					// copy.

// Variables to set proper icon color to marker
var contentIs;
// Image data of thumbnail
var thumb;
var screenshot = 0;

var arrowMeter = 0;
var colourmap = {};
colourmap["content_a"] = "#2381C4";
colourmap["content_b"] ="#FF7058";
colourmap["content_c"] ="#FFD05B";
colourmap["content_d"] ="#90DFAA";
colourmap["content_e"] ="#54C0EB";
colourmap["content_f"] ="#90DFAA";

var currentScreenshot;
