
// Add an event handler for when the window loads.
window.addEventListener("load", eventWindowLoaded, false);

// The debugger function is very useful for debugging java script. Support by Chrome and Firefox (with firebug). Unfortunately it is not supported by IE.
var Debugger = function () { };

// Debugger function swallows execptions for IE - so we do not crash!
Debugger.log = function (message) {
    try {
        console.log(message);
    }
    catch (exception) {
        return;
    }
}

// When the window has loaded, set the top panel text and then call the canvasApp() function which is the main drawing procedure
function eventWindowLoaded() {
    window.canvasApp = canvasApp;
    //canvasApp();
    //$("#footer").css('visibility', 'visible');
}

// Determines if the browser supports the html5 canvas tag (uses Modernizr.js).
function canvasSupport() {
    // return Modernizr.canvas;
    return true;
}

// Main procedure for drawing the tournament wheel
function canvasApp() {
    // Check that the browser supports canvas. If not, display a message and return.
    if (!canvasSupport()) {
        $("#container").html("Your browser does not support HTML5 Canvas.");
        return;
    }

    // Main declarations: declare the Kinetic stage and some layers
    var stage = new Kinetic.Stage({
        container: "container"
        , width: 1200
        , height: 800
    });
    var layer = new Kinetic.Layer("layer");
    var layerRimText = new Kinetic.Layer("layerRimText");
    var layerMainPanel = new Kinetic.Layer("layerMainPanel");

    // Hash of images cache
    var imageCache = new Object();



    // ****************************************************************************
    // Rimsegments Code:
    //  drawRimSegments
    //  drawRimSegment
    //  drawRimText
    //  selectRimSegment
    //  updateRimSegmentsToDefaultBackground
    //  updateRimSegment 
    // ****************************************************************************

    // Iterates the rim segments and spokes in the json structure and draws each rim segment and its associated spokes.
    function drawRimSegments() {
        // Debugger.log("Drawing Rim Segments");

        var maxAngle = 269.999;
        var startAngle = -90.0;

        // Iterate rim segments    
        for (var rimSegmentIndex = 0; rimSegmentIndex < wheelData.TournamentWheel.RimSegments.RimSegment.length; rimSegmentIndex++) {
            var wheelSegmentPercentage = wheelData.TournamentWheel.RimSegments.RimSegment[rimSegmentIndex].Percentage;
            var wheelSegmentDegrees = 360 * (wheelSegmentPercentage / 100);
            if (wheelSegmentDegrees <= 0) wheelSegmentDegrees = (360 / Wheel.Segments.Count);
            var endAngle = Math.min(startAngle + wheelSegmentDegrees, maxAngle);
            drawRimSegment(rimSegmentIndex, startAngle, endAngle);

            // Iterate spokes
            var stepAngle = Math.abs(startAngle - endAngle) / wheelData.TournamentWheel.RimSegments.RimSegment[rimSegmentIndex].Spokes.Spoke.length;
            for (var spokesIndex = 0; spokesIndex < wheelData.TournamentWheel.RimSegments.RimSegment[rimSegmentIndex].Spokes.Spoke.length; spokesIndex++) {
                drawSpoke(rimSegmentIndex, spokesIndex, startAngle, startAngle + stepAngle);
                startAngle = startAngle + stepAngle;
            } // each spoke
            startAngle = endAngle;
        } // each rim segment
    }

    // Draws a rim segment. We use the rimSegmentIndex to figure out which rim segment to draw
    function drawRimSegment(rimSegmentIndex, startAngle, endAngle) {
        // Get the rim segment given the rimSegmentIndex
        var rimSegment = new GetRimSegment(rimSegmentIndex).RimSegment;
        // Debugger.log("Drawing rim segment '" + rimSegment.Text + "'");

        // Calculate the four points that make up the bounds of the rim segment
        var pieRadius = parseFloat(wheelData.TournamentWheel.Radius);
        var gapRadius = parseFloat(wheelData.TournamentWheel.Radius) - parseFloat(wheelData.TournamentWheel.RimWidth);
        var a = new GetCircumferencePoint(startAngle, pieRadius);
        var b = new GetCircumferencePoint(startAngle, gapRadius);
        var c = new GetCircumferencePoint(endAngle, gapRadius);
        var d = new GetCircumferencePoint(endAngle, pieRadius);

        // Draw the shape
        var rimSegmentShape = new Kinetic.Shape({
            drawFunc: function () {
                var context = this.getContext();
                context.beginPath();
                context.moveTo(b.X, b.Y);
                context.lineTo(a.X, a.Y);
                context.arc(new GetCenterPoint().X, new GetCenterPoint().Y, pieRadius, (Math.PI / 180) * startAngle, (Math.PI / 180) * endAngle, false);
                context.lineTo(c.X, c.Y);
                context.arc(new GetCenterPoint().X, new GetCenterPoint().Y, gapRadius, (Math.PI / 180) * endAngle, (Math.PI / 180) * startAngle, true);
                context.closePath();
                this.fillStroke();
            }
            , fill: rimSegment.Background
            , stroke: "Black"
            , strokeWidth: 0
            , name: "rimSegmentShape" + rimSegmentIndex
        });

        // Add click event handler. When a rim segment is clicked, run the selectRimSegment function.
        rimSegmentShape.on("click", function () {
            selectRimSegment(rimSegmentIndex);
        });
        layer.add(rimSegmentShape);

        // Add click event handler (mobile phones). When a rim segment is clicked, run the selectRimSegment function.
        rimSegmentShape.on("touchstart", function () {
            selectRimSegment(rimSegmentIndex);
        });
        layer.add(rimSegmentShape);

        // Now draw the text for the rim segment
        var degreesRequiredForText = rimSegment.Text.length * 2.5;
        var rimTextStartAngle = startAngle + ((endAngle - startAngle) - degreesRequiredForText) / 2;
        var textRadius = pieRadius - (parseFloat(wheelData.TournamentWheel.RimWidth) / 2);
        drawRimText(rimSegmentIndex, rimSegment, rimTextStartAngle, textRadius);
    }

    // Draws the rim segment text with the specified foreground. 
    function drawRimText(rimSegmentIndex, rimSegment, startAngle, radius) {
        // Debugger.log("Drawing rim text '" + rimSegment.Text + "'");

        // We need to draw each character and 'transform' it by rotating it. As we progress down the arc, the angle of rotation is increased.
        for (var characterIndex = 0; characterIndex < rimSegment.Text.length; characterIndex++) {
            var p = new GetCircumferencePoint(startAngle, radius);
            var rimTextCharacter = new Kinetic.Text({
                x: p.X
                , y: p.Y
                , text: rimSegment.Text[characterIndex]
                , fontSize: wheelData.TournamentWheel.RimTextFontSize
                , fontFamily: "Arial"
                , textFill: rimSegment.Foreground
                , align: "center"
                , verticalAlign: "middle"
                , rotation: (startAngle + 90) * Math.PI / 180,
            });

            // Add click event handler. When a character on a rim segment is clicked, run the selectRimSegment function
            rimTextCharacter.on("click", function () {
                selectRimSegment(rimSegmentIndex);
            });
            // Add click event handler (for mobile phones). When a character on a rim segment is clicked, run the selectRimSegment function
            rimTextCharacter.on("touchstart", function () {
                selectRimSegment(rimSegmentIndex);
            });

            layerRimText.add(rimTextCharacter);
            startAngle += 2.5;
        } // each character
    }

    // Called when a user clicks a rim segment
    //   - reset all the rims segments to the default background color (i.e. unselect them)
    //   - reset all the spokes to the default foreground and background color (i.e. unselect them)
    //   - change the back color of the rim segment that was clicked to black
    //   - display the rim segment text in the wheel title panel
    //   - display the appropriate data in the main panel (i.e. text and images are currently supported)
    function selectRimSegment(rimSegmentIndex) {
        // Debugger.log("RimSegmentShape.click was pressed for '" + this.name + "'");
        var rimSegment = new GetRimSegment(rimSegmentIndex).RimSegment;

        updateRimSegmentsToDefaultBackground();
        updateSpokesToDefaultForegroundAndBackground();
        updateRimSegment(rimSegmentIndex, "Black");
        updateWheelTitle(rimSegment.Text, rimSegment.Foreground, rimSegment.Background);

        // Debugger.log(rimSegment.MainPanelDisplayType);
        if (rimSegment.MainPanelDisplayType == "Image") {
            drawMainPanelText("", "Black", "Black");
            drawMainPanelImage(rimSegment.MainPanelDisplayEmbeddedImageFileName);
        }
        else if (rimSegment.MainPanelDisplayType == "Text") {
            drawMainPanelText(rimSegment.MainPanelDisplayText.TextBlock.Text, rimSegment.MainPanelDisplayText.TextBlock.Foreground, "Black");
        }
        else if (rimSegment.MainPanelDisplayType == undefined) {
            drawMainPanelText("", "Black", "Black");
        }
        else {
            alert('Content type not coded. Case not coded.' + rimSegment.MainPanelDisplayType);
        }

        layer.draw();
        layerMainPanel.draw();

        // displayObjectCounts();
    }

    // Updates all the rim segment shapes and changes their back color to the default as defined in the wheelData JSON settings
    function updateRimSegmentsToDefaultBackground() {
        for (var i = 0; i < wheelData.TournamentWheel.RimSegments.RimSegment.length; i++) {
            updateRimSegment(i, wheelData.TournamentWheel.RimSegments.RimSegment[i].Background);
        }
    }

    // Updates a rimSegment shape identified by index
    function updateRimSegment(rimSegmentIndex, background) {
        var rimSegmentShape = layer.getChild("rimSegmentShape" + rimSegmentIndex);
        rimSegmentShape.setFill(background);
    }


    // ****************************************************************************
    // Spoke Code:
    //  drawSpoke
    //  drawSpokeText
    //  selectSpoke
    //  updateSpokesToDefaultForegroundAndBackground
    //  updateSpoke
    //  hightlightRelatedSpokes 
    // ****************************************************************************

    // Draw a spoke 
    function drawSpoke(rimSegmentIndex, spokeIndex, startAngle, endAngle) {
        var spoke = wheelData.TournamentWheel.RimSegments.RimSegment[rimSegmentIndex].Spokes.Spoke[spokeIndex];
        // Debugger.log("Drawing spoke '" +spoke.Text +"'");

        // Calculate the four points that make up the bounds of the rim segment
        var pieRadius = parseFloat(wheelData.TournamentWheel.Radius) - parseFloat(wheelData.TournamentWheel.RimWidth);
        var gapRadius = (pieRadius * parseFloat(wheelData.TournamentWheel.SpokeStartPercentOfRadius)) / 100;
        var a = new GetCircumferencePoint(startAngle, pieRadius);
        var b = new GetCircumferencePoint(startAngle, gapRadius);
        var c = new GetCircumferencePoint(endAngle, gapRadius);
        var d = new GetCircumferencePoint(endAngle, pieRadius);

        // Draw the shape
        var spokeShape = new Kinetic.Shape({
            drawFunc: function () {
                var context = this.getContext();
                context.beginPath();
                context.moveTo(a.X, a.Y);
                context.lineTo(b.X, b.Y);
                context.arc(new GetCenterPoint().X, new GetCenterPoint().Y, gapRadius, (Math.PI / 180) * startAngle, (Math.PI / 180) * endAngle, false);
                context.lineTo(d.X, d.Y);
                context.arc(new GetCenterPoint().X, new GetCenterPoint().Y, pieRadius, (Math.PI / 180) * endAngle, (Math.PI / 180) * startAngle, true);
                context.closePath();
                this.fillStroke();
            }
            , fill: wheelData.TournamentWheel.SpokeBackground
            , stroke: "Black"
            , strokeWidth: 0
            , name: "spokeShape" + spoke.Id
        });

        spokeShape.on("click", function () {
            selectSpoke(spoke.Id);
        });
        spokeShape.on("touchstart", function () {
            selectSpoke(spoke.Id);
        });
        layer.add(spokeShape);

        // Draw the spoke text      
        var midAngle = startAngle + ((endAngle - startAngle) / 2.0);
        var inRadius = parseFloat(wheelData.TournamentWheel.Radius) * parseFloat(wheelData.TournamentWheel.SpokeStartTextPercentOfRadius) / 100;
        drawSpokeText(spoke.Id, spoke.Text, spoke.Foreground, midAngle, inRadius);
    }

    // Draw the spoke text
    function drawSpokeText(spokeId, textToDraw, foreground, startAngle, radius) {
        // Debugger.log("Drawing spoke text '" +textToDraw +"'");

        var p = new GetCircumferencePoint(startAngle, radius);
        var angle = 0;
        if ((-90 < startAngle) && (startAngle < 90)) {
            angle = startAngle;
        } else {
            angle = startAngle + 180;
        }
        var angleInRadians = (angle) * Math.PI / 180;
        var spokeText = new Kinetic.Text({
            x: p.X
            , y: p.Y
            , text: textToDraw
            , fontSize: wheelData.TournamentWheel.SpokeFontSize
            , fontFamily: "Arial"
            , textFill: foreground
            , align: "center"
            , verticalAlign: "middle"
            , rotation: angleInRadians
            , name: "spokeText" + spokeId
        });

        spokeText.on("click", function () {
            selectSpoke(spokeId);
        });
        spokeText.on("touchstart", function () {
            selectSpoke(spokeId);
        });
        layer.add(spokeText);
    }

    // Called when user clicks a spoke
    function selectSpoke(spokeId) {
        updateSpokesToDefaultForegroundAndBackground();
        spoke = new GetSpoke(spokeId).Spoke;
        updateSpoke(spoke.Id, wheelData.TournamentWheel.SpokeBackground, spoke.Foreground);
        hightlightRelatedSpokes(spoke);
        updateWheelTitle(spoke.Text, wheelData.TournamentWheel.SpokeBackground, spoke.Foreground);

        // Debugger.log(spoke.MainPanelDisplayType);
        if (spoke.MainPanelDisplayType == "Image") {
            drawMainPanelText("", "Black", "Black");
            drawMainPanelImage(spoke.MainPanelDisplayEmbeddedImageFileName);
        }
        else if (spoke.MainPanelDisplayType == "Text") {
            drawMainPanelText(spoke.MainPanelDisplayText.TextBlock.Text, spoke.MainPanelDisplayText.TextBlock.Foreground, "Black");
        }
        else if (spoke.MainPanelDisplayType == "Fixtures") {
            drawMainPanelFixtures(spoke.Id);
        }
        else if (spoke.MainPanelDisplayType == undefined) {
            drawMainPanelText("", "Black", "Black");
        }
        else {
            alert('Content type not coded. Case not coded.' + spoke.MainPanelDisplayType);
        }

        layer.draw();
        layerMainPanel.draw();
    }

    // Updates all the spoke shapes and changes their foreground color and background color to the default as defined in the wheelData JSON settings
    function updateSpokesToDefaultForegroundAndBackground() {
        for (var i = 0; i < wheelData.TournamentWheel.RimSegments.RimSegment.length; i++) {
            for (var j = 0; j < wheelData.TournamentWheel.RimSegments.RimSegment[i].Spokes.Spoke.length; j++) {
                var spokeId = wheelData.TournamentWheel.RimSegments.RimSegment[i].Spokes.Spoke[j].Id;
                var foreground = wheelData.TournamentWheel.RimSegments.RimSegment[i].Spokes.Spoke[j].Foreground;
                var background = wheelData.TournamentWheel.SpokeBackground;
                updateSpoke(spokeId, foreground, background);
            }
        }
    }

    // Updates the spoke (shape) background and spoke (text) foreground
    function updateSpoke(spokeId, foreground, background) {
        var spokeShape = layer.getChild("spokeShape" + spokeId);
        spokeShape.setFill(background);
        var spokeText = layer.getChild("spokeText" + spokeId);
        spokeText.setTextFill(foreground);
    }

    // Highlights all the related spokes
    function hightlightRelatedSpokes(spoke) {
        if (spoke.RelatedSpokeIds == undefined) return;
        var relatedSpokeIds = spoke.RelatedSpokeIds.split(" ");
        for (var i = 0; i < relatedSpokeIds.length; i++) {
            var spoke = new GetSpoke(relatedSpokeIds[i]).Spoke;
            if (spoke == undefined) return;
            updateSpoke(spoke.Id, wheelData.TournamentWheel.SpokeBackground, spoke.Foreground);
        }
    }


    // ****************************************************************************
    // Wheel Title Code:
    //  drawWheelTitle
    //  updateWheelTitle
    // ****************************************************************************

    // Draws the wheel title
    // textToDraw - text to draw
    // foreground - text color
    // background - background color
    function drawWheelTitle(textToDraw, foreground, background) {
        // Debugger.log("Drawing Wheel Title : '" + textToDraw + "'");

        // Calculates the 'radius' of the arc
        var gapRadius = (parseFloat(wheelData.TournamentWheel.Radius) - parseFloat(wheelData.TournamentWheel.RimWidth)) * parseFloat(wheelData.TournamentWheel.SpokeStartPercentOfRadius) / 100;

        // Get the 2 points required for the area concerned. We'll have to draw a line between these points
        var a = new GetCircumferencePoint(-45, gapRadius);
        var b = new GetCircumferencePoint(-135, gapRadius);

        // Draw the shape and fill it with the background color 
        var wheelTitleShape = new Kinetic.Shape({
            drawFunc: function () {
                var context = this.getContext();
                context.beginPath();
                context.arc(new GetCenterPoint().X, new GetCenterPoint().Y, gapRadius, (Math.PI / 180) * -45, (Math.PI / 180) * -135, true);
                context.lineTo(a.X, a.Y);
                context.closePath();
                this.fillStroke();
            }
            , fill: background
            , name: "wheelTitleShape"
        });
        layer.add(wheelTitleShape);

        // Draw the text using the specified foreground color
        var wheelTitleText = new Kinetic.Text({
            x: new GetCenterPoint().X
            , y: a.Y - parseFloat(wheelData.TournamentWheel.WheelTitleFontSize * 2)
            , text: textToDraw
            , fontSize: wheelData.TournamentWheel.WheelTitleFontSize
            , fontFamily: "Arial"
            , textFill: foreground
            , align: "center"
            , verticalAlign: "middle"
            , name: "wheelTitleText"
        });
        layer.add(wheelTitleText);
    }

    // Update the wheel title text, foreground color and background color
    function updateWheelTitle(textToDraw, foreground, background) {
        var wheelTitleShape = layer.getChild("wheelTitleShape");
        var wheelTitleText = layer.getChild("wheelTitleText");
        wheelTitleShape.setFill(background);
        wheelTitleText.setTextFill(foreground);
        wheelTitleText.setText(textToDraw);
    }



    // ****************************************************************************
    // Main Panel Code:
    //  drawMainPanelText
    //  drawMainPanelImage
    //  drawMainPanelFixtures
    //  clearMainPanelLayer
    // ****************************************************************************

    // Draws text on the main panel
    // textToDraw - text to draw
    // foreground - text color
    // background - background color
    function drawMainPanelText(textToDraw, foreground, background) {
        // Debugger.log("Drawing text on Main Panel '" + textToDraw + "'");

        // Clear the main panel
        layerMainPanel.removeChildren();
        layerMainPanel.clear();

        // Calculates the 'radius' of the arc
        var gapRadius = (parseFloat(wheelData.TournamentWheel.Radius) - parseFloat(wheelData.TournamentWheel.RimWidth)) * parseFloat(wheelData.TournamentWheel.SpokeStartPercentOfRadius) / 100;

        // Get the 2 points required for the area concerned. We'll have to draw a line between these points
        var a = new GetCircumferencePoint(-45, gapRadius);
        var b = new GetCircumferencePoint(-135, gapRadius);

        // Draw the shape and fill it with the background color 
        var mainPanelShape = new Kinetic.Shape({
            drawFunc: function () {
                var context = this.getContext();
                context.beginPath();
                context.arc(new GetCenterPoint().X, new GetCenterPoint().Y, gapRadius, (Math.PI / 180) * -45, (Math.PI / 180) * -135, false);
                context.lineTo(a.X, a.Y);
                context.closePath();
                this.fillStroke();
            }
            , fill: background
            , name: "mainPanelShape"
        });
        layerMainPanel.add(mainPanelShape);

        // Draw the text using the specified foreground color
        var mainPanelText = new Kinetic.Text({
            x: new GetCenterPoint().X
            , y: new GetCenterPoint().Y
            , text: textToDraw
            , fontSize: wheelData.TournamentWheel.WheelTitleFontSize
            , fontFamily: "Arial"
            , textFill: foreground
            , align: "center"
            , verticalAlign: "middle"
        });
        layerMainPanel.add(mainPanelText);
    }

    function drawMainPanelImage(imagePath) {
        // Debugger.log("Draw an image");

        // Clear the main panel
        clearMainPanelLayer();

        // Try to get the image from the cache.
        var src = "assets/tournamentwheeldata/images/" + imagePath;
        var imageFromCache = new GetImageFromCache(src).Image;

        // If the image was not found in the cache, load it, add it to the canvas and then add it to the cache.
        if (imageFromCache == undefined) {
            imageToDisplay = new Image();
            imageToDisplay.src = src;

            imageToDisplay.onload = function () {
                var width = Math.min(200, this.width);
                var height = Math.min(200, this.height);
                var imagePanel = new Kinetic.Image({
                    x: new GetCenterPoint().X - (width / 2),
                    y: new GetCenterPoint().Y - (height / 2),
                    image: imageToDisplay,
                    width: width,
                    height: height
                });
                layerMainPanel.add(imagePanel);
                // As this is a call back function, we need to force a draw to get the image to display.
                layerMainPanel.draw();
                imageCache[src] = imageToDisplay;
            };
        }
            // Image was found in the cache. Just add the image to the canvas directly. This will help performanc.
        else {
            var width = Math.min(200, imageFromCache.width);
            var height = Math.min(200, imageFromCache.height);
            var imagePanel = new Kinetic.Image({
                x: new GetCenterPoint().X - (width / 2),
                y: new GetCenterPoint().Y - (height / 2),
                image: imageFromCache,
                width: width,
                height: height
            });
            layerMainPanel.add(imagePanel);
        }
    }


    // Used for performance issues - see addImagePanelToStageCallback
    var numberOfFixturesToLoad = 0;

    // Draw all the fixtures related to a given spoke id.
    function drawMainPanelFixtures(spokeId) {

        // Clear the main panel
        clearMainPanelLayer();

        var spoke = new GetSpoke(spokeId).Spoke;
        var fixtures = new GetFixtures(spokeId).Fixtures;

        var start = 0;
        if (fixtures.length == 1) start = new GetCenterPoint().Y - 20;
        if (fixtures.length == 2) start = new GetCenterPoint().Y - 40;
        if (fixtures.length == 3) start = new GetCenterPoint().Y - 60;
        if (fixtures.length == 4) start = new GetCenterPoint().Y - 80;
        if (fixtures.length == 5) start = new GetCenterPoint().Y - 120;
        if (fixtures.length == 6) start = new GetCenterPoint().Y - 120;
        if (fixtures.length == 7) start = new GetCenterPoint().Y - 130;
        if (fixtures.length == 8) start = new GetCenterPoint().Y - 140;

        // Iterate the fixtures and draw each one in turn. Also reset numberOfFixturesToLoad so that the addImagePanelToStageCallback will fire correctly
        numberOfFixturesToLoad = (fixtures.length) * 2;
        for (var i = 0; i < fixtures.length; i++) {
            drawMainPanelFixture(fixtures[i], start, addImagePanelToStageCallback);
            start = start + 40;
        }
    }

    // This function was added for performance reasons. When we add an image to a layer, we must call layer.draw() because the image may not get loaded until after the click event
    // has been executed (i.e. after we call layer.draw() as part of the click event). Calling draw is an expensive operation. When loading fixtures, this can cause a problem as
    // we would have to call layerMainPanel.draw() each time an image is loaded. If we have 8 fixtures to display, this can result in 16 calls to layerMainPanel.draw() ..... and 
    // that causes performance issues.
    //
    // To get around this issue, I pass this function in as a callback function to the drawMainPanelFixture function. It is called each time an image is loaded (and added
    // to the layer). Upon each call, we decrement the 'numberOfFixturesToLoad'. After each fixture is loaded, the callback is called and eventually 'numberOfFixturesToLoad'
    // will be 0. This will result in just 1 call to layerMainPanel.draw(). This greatly increases the performance of the UI as layerMainPanel.draw() seemed to be quite an expensive
    // operation.
    function addImagePanelToStageCallback() {
        numberOfFixturesToLoad--;
        //Debugger.log(numberOfFixturesToLoad);
        if (numberOfFixturesToLoad == 0) {
            layerMainPanel.draw();
        }

    }

    // Draws an individual fixture on the main panel. pointY is used as an offset for placing the fixture UI elements
    function drawMainPanelFixture(fixture, pointY, callback) {

        // Left bottom text (team name 1)
        var mainPanelText = new Kinetic.Text({
            x: new GetCenterPoint().X - (wheelData.TournamentWheel.Radius / 3)
            , y: pointY
            , text: fixture.LeftBottomText
            , fontSize: wheelData.TournamentWheel.MainPanelBottomTextFontSize
            , fontFamily: "Arial"
            , textFill: wheelData.TournamentWheel.MainPanelBottomRectangleForeground
            , align: "center"
            , verticalAlign: "middle"
        });
        layerMainPanel.add(mainPanelText);

        // Right bottom text (team name 2)
        var mainPanelText = new Kinetic.Text({
            x: new GetCenterPoint().X + (wheelData.TournamentWheel.Radius / 3)
            , y: pointY
            , text: fixture.RightBottomText
            , fontSize: wheelData.TournamentWheel.MainPanelBottomTextFontSize
            , fontFamily: "Arial"
            , textFill: wheelData.TournamentWheel.MainPanelBottomRectangleForeground
            , align: "center"
            , verticalAlign: "middle"
        });
        layerMainPanel.add(mainPanelText);

        // Center text (usually the result)
        var mainPanelText = new Kinetic.Text({
            x: new GetCenterPoint().X
            , y: pointY
            , text: fixture.CenterText
            , fontSize: wheelData.TournamentWheel.MainPanelBottomTextFontSize
            , fontFamily: "Arial"
            , textFill: wheelData.TournamentWheel.MainPanelCenterTextForeground
            , align: "center"
            , verticalAlign: "middle"
        });
        layerMainPanel.add(mainPanelText);

        // Top rectangle (contains the match number and location)
        var rect = new Kinetic.Rect({
            x: new GetCenterPoint().X - (wheelData.TournamentWheel.Radius / 2),
            y: pointY - 18,
            width: (wheelData.TournamentWheel.Radius),
            height: 12,
            fill: wheelData.TournamentWheel.MainPanelCenterRectangleBackground
        });
        layerMainPanel.add(rect);

        // Left top text (usually the match number)
        var mainPanelText = new Kinetic.Text({
            x: new GetCenterPoint().X - (wheelData.TournamentWheel.Radius / 3)
            , y: pointY - 18 + parseFloat(wheelData.TournamentWheel.MainPanelTopTextFontSize)
            , text: fixture.LeftTopText
            , fontSize: wheelData.TournamentWheel.MainPanelTopTextFontSize
            , fontFamily: "Arial"
            , textFill: wheelData.TournamentWheel.MainPanelCenterRectangleForeground
            , align: "center"
            , verticalAlign: "middle"
        });
        layerMainPanel.add(mainPanelText);

        // Right top text (usually the location)
        var mainPanelText = new Kinetic.Text({
            x: new GetCenterPoint().X + (wheelData.TournamentWheel.Radius / 3)
            , y: pointY - 18 + parseFloat(wheelData.TournamentWheel.MainPanelTopTextFontSize)
            , text: fixture.RightTopText
            , fontSize: wheelData.TournamentWheel.MainPanelTopTextFontSize
            , fontFamily: "Arial"
            , textFill: wheelData.TournamentWheel.MainPanelCenterRectangleForeground
            , align: "center"
            , verticalAlign: "middle"
        });
        layerMainPanel.add(mainPanelText);

        // Top white rectangle (contains the date and group)
        var rect = new Kinetic.Rect({
            x: new GetCenterPoint().X - (wheelData.TournamentWheel.Radius / 3 / 2),
            y: pointY - 22,
            width: (wheelData.TournamentWheel.Radius / 3),
            height: 12,
            fill: wheelData.TournamentWheel.MainPanelTopRectangleBackground
        });
        layerMainPanel.add(rect);

        // Right top text (usually the location)
        var mainPanelText = new Kinetic.Text({
            x: new GetCenterPoint().X
            , y: pointY - 22 + parseFloat(wheelData.TournamentWheel.MainPanelTopTextFontSize)
            , text: fixture.MiddleLeftText + "    " + fixture.MiddleRightText
            , fontSize: wheelData.TournamentWheel.MainPanelTopTextFontSize
            , fontFamily: "Arial"
            , textFill: wheelData.TournamentWheel.MainPanelTopRectangleForeground
            , align: "center"
            , verticalAlign: "middle"
        });
        layerMainPanel.add(mainPanelText);

        // Image 01 - complete with caching cabability
        var src01 = "assets/tournamentwheeldata/images/" + fixture.LeftEmbeddedImageFileName;
        var imageFromCache01 = new GetImageFromCache(src01).Image;
        if (imageFromCache01 == undefined) {
            var image01 = new Image();
            image01.src = src01;
            image01.onload = function () {
                var width = Math.min(16, this.width);
                var height = Math.min(12, this.height);
                var imagePanel01 = new Kinetic.Image({
                    x: new GetCenterPoint().X - (wheelData.TournamentWheel.Radius * .5),
                    y: pointY - width / 2,
                    image: image01,
                    width: width,
                    height: height
                });
                layerMainPanel.add(imagePanel01);
                imageCache[src01] = image01;
                callback();
            };
        } else {
            //Debugger.log("We are using the cache for image 01");
            var width = Math.min(16, imageFromCache01.width);
            var height = Math.min(12, imageFromCache01.height);
            var imagePanel01 = new Kinetic.Image({
                x: new GetCenterPoint().X - (wheelData.TournamentWheel.Radius * .5),
                y: pointY - width / 2,
                image: imageFromCache01,
                width: width,
                height: height
            });
            layerMainPanel.add(imagePanel01);
            callback();
        }

        // Image 02 - complete with caching cabability
        var src02 = "assets/tournamentwheeldata/images/" + fixture.RightEmbeddedImageFileName;
        var imageFromCache02 = new GetImageFromCache(src02).Image;
        if (imageFromCache02 == undefined) {
            var image02 = new Image();
            image02.src = src02;
            image02.onload = function () {
                var width = Math.min(16, this.width);
                var height = Math.min(12, this.height);
                var imagePanel02 = new Kinetic.Image({
                    x: new GetCenterPoint().X + (wheelData.TournamentWheel.Radius * .5) - width,
                    y: pointY - width / 2,
                    image: image02,
                    width: width,
                    height: height
                });
                layerMainPanel.add(imagePanel02);
                imageCache[src02] = image02;
                callback();
            };
        } else {
            //Debugger.log("We are using the cache for image 02");
            var width = Math.min(16, imageFromCache02.width);
            var height = Math.min(12, imageFromCache02.height);
            var imagePanel02 = new Kinetic.Image({
                x: new GetCenterPoint().X + (wheelData.TournamentWheel.Radius * .5) - width,
                y: pointY - width / 2,
                image: imageFromCache02,
                width: width,
                height: height
            });
            layerMainPanel.add(imagePanel02);
            callback();
        }

    }

    // Clears the main panel layer and 'paints' it black. Removing children and clear helps increase performance.
    function clearMainPanelLayer() {
        layerMainPanel.removeChildren();
        layerMainPanel.clear();
        drawMainPanelText("", "Black", "Black");
    }



    // ****************************************************************************
    // Helper Methods:
    //  GetCircumferencePoint
    //  GetCenterPoint
    //  GetRimSegment
    //  GetSpoke
    //  GetFixtures
    //  GetImageFromCache
    //  displayObjectCounts
    // ****************************************************************************

    // Returns a 'point' object with properties X and Y given a radius and angle.
    function GetCircumferencePoint(angle, radius) {
        var angleRad = (Math.PI / 180.0) * angle;
        this.X = parseFloat(wheelData.TournamentWheel.CenterX) + (radius * Math.cos(angleRad)) + parseFloat(wheelData.TournamentWheel.Radius);
        this.Y = parseFloat(wheelData.TournamentWheel.CenterY) + (radius * Math.sin(angleRad)) + parseFloat(wheelData.TournamentWheel.Radius);
    }

    // Returns the centre point.
    function GetCenterPoint() {
        this.X = parseFloat(wheelData.TournamentWheel.CenterX) + parseFloat(wheelData.TournamentWheel.Radius);
        this.Y = parseFloat(wheelData.TournamentWheel.CenterY) + parseFloat(wheelData.TournamentWheel.Radius);
    }

    // Gets a reference to a rim segment given the rimSegmentIndex
    function GetRimSegment(rimSegmentIndex) {
        var rimSegment = wheelData.TournamentWheel.RimSegments.RimSegment[rimSegmentIndex];
        this.RimSegment = rimSegment;
    }

    // Gets a reference to a spoke given a spoke id
    function GetSpoke(spokeId) {
        for (var i = 0; i < wheelData.TournamentWheel.RimSegments.RimSegment.length; i++) {
            for (var j = 0; j < wheelData.TournamentWheel.RimSegments.RimSegment[i].Spokes.Spoke.length; j++) {
                var spoke = wheelData.TournamentWheel.RimSegments.RimSegment[i].Spokes.Spoke[j];
                if (spokeId == spoke.Id) {
                    this.Spoke = spoke;
                    return;
                }
            }
        }
    }

    // Gets an array of JSON fixtures for a given spoke id
    function GetFixtures(spokeId) {
        var spoke = new GetSpoke(spokeId).Spoke;
        var relatedFixtureIds = spoke.RelatedFixtureIds;
        var arrayToReturn = new Array();
        for (var i = 0; i < wheelData.TournamentWheel.Fixtures.Fixture.length; i++) {
            if (relatedFixtureIds.indexOf(wheelData.TournamentWheel.Fixtures.Fixture[i].FixtureId) >= 0) {
                arrayToReturn.push(wheelData.TournamentWheel.Fixtures.Fixture[i]);
            }
        }
        this.Fixtures = arrayToReturn;
    }

    // Gets an image from the image cache. Returns the image if it is in the cache. This is used for performance.
    // The image cache is a hash set of images. The hash used is the image address (i.e. the filepath to the image)
    function GetImageFromCache(src) {
        if (imageCache.hasOwnProperty(src)) {
            this.Image = imageCache[src];
        } else {
            this.Image = undefined;
        }
    }

    // This function was added just to help increase the performance of the application. Initially, I was adding lots of objects to layerMainPanel without clearing
    // them down. This caused performance issues as the app was used. If you make changes to the app, just call this in the event handlers to ensure you are not 
    // increasing the counts too much as the app is used.
    function displayObjectCounts() {
        Debugger.log("Stage has " + stage.getChildren().length + " children");
        Debugger.log("Layer has " + layer.getChildren().length + " children");
        Debugger.log("LayerMainPanel has " + layerMainPanel.getChildren().length + " children");
        Debugger.log("LayerRimText has " + layerRimText.getChildren().length + " children");
    }

    // *************************************************************
    // This is the main code which runs when the canvasApp is called
    // *************************************************************
    //function drawTournamentWheel() {
        drawRimSegments();
        drawWheelTitle(wheelData.TournamentWheel.WheelTitleText, wheelData.TournamentWheel.WheelTitleForeground, wheelData.TournamentWheel.WheelTitleBackground);
        drawMainPanelText(wheelData.TournamentWheel.WheelTitleText, "Gold", "Black");
        stage.add(layer);
        stage.add(layerRimText);
        stage.add(layerMainPanel);
    //}    

    // displayObjectCounts(); 


}; // end of canvasApp
