(function () {
    'use strict';
    
    // There are 3 aircraft manufactures, each with different requirements 
    //  for when the tires need to be changed
    //      FooPlane: 120 landings
    //      BarPlane: 75 landings
    //      BazPlane: 200 landings

    // Based on the above information and the data available in the data.js file,
    //  this function is supposed to return an array of aircrafts due for a tire change.
	
    function getAircraftsDueForTireChange(allAircraftData) {
        var aircraftDueForTireChanges=[];
        for (var i = 0; i < allAircraftData.length; i++) {
			var temp = listOfAircrafts(allAircraftData, i);
			if(temp != undefined){
				aircraftDueForTireChanges.push(temp);
			}
			console.log(aircraftDueForTireChanges)
        }
        return aircraftDueForTireChanges;
    }
	
	function listOfAircrafts(allAircraftData, i)
	{
		var landingsSinceLastTireChange = [];
		var aircraaftData = allAircraftData[i];
		for (var j = 0; j < aircraaftData.landings.length; j++) {
			if (aircraaftData.landings[j] >= aircraaftData.lastTireChange)
				landingsSinceLastTireChange.push(aircraaftData.landings[j]);
		}
		
		if (aircraaftData.manufacturer == 'FooPlane' && landingsSinceLastTireChange.length >= 120)
			return aircraaftData;
		else if (aircraaftData.manufacturer == 'BarPlane' && landingsSinceLastTireChange.length >= 75)
			return aircraaftData;
		else if (aircraaftData.manufacturer == 'BazPlane' && landingsSinceLastTireChange.length >= 200)
			return aircraaftData;
	}
    // Test the function 
    //  To keep things simple, we are just going to check the ids and display a pass/fail.
    //  Feel free to use Jasmine or any other test framework if you're more comfortable with that,
    //  but it is NOT required.  This should be a quick exercise.
    var expected = [1, 3, 5];
    var actual = getAircraftsDueForTireChange(window.CAMP.aircraftData).map(function (aircraft) { return aircraft.id; }).sort();
    var passed = (JSON.stringify(expected) === JSON.stringify(actual));

    document.body.innerHTML += passed ? 'PASS' : 'FAIL';
    document.body.innerHTML += '<br />';
    document.body.innerHTML += 'Expected: ' + expected;
    document.body.innerHTML += '<br />';
    document.body.innerHTML += 'Actual: ' + actual;
})();