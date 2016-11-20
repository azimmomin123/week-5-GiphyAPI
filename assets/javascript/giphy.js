var topics = ["The Big Bang Theory", "New Girl", "The Walking Dead", "Super Store"];

    	$(document).on("click", ".show", displayShowInfo);
    	$(document).on("click", ".gif", runGif);
    	renderButtons();

    	// Function for displaying show data
    	function renderButtons(){
    		//Deleting the shows before addeing new shows otherwise we will have repeat buttons
    		$("#buttonsView").empty();

    		//Looping through the array of shows
    		for (var i = 0; i < topics.length; i++) {
    			//Dynamically generate buttons for each item in the array
    			//Creating button tag
    			var a = $("<button>");
    			//adding a class for show for the button
    			a.addClass("show");
    			//adding a data-attribute
    			a.attr("data-name", topics[i]);
    			//giving initial button text
    			a.text(topics[i]);
                //Margin to the button
                a.css("font-size", "15px");
    			//adding button to the buttonsView
    			$("#buttonsView").append(a);
    		}
    	}

    	//Thie function will add a show to the buttons list when the buttons is clicked
    	$("#addShow").on("click", function(event){
    		event.preventDefault();
    		//Takes the input value from the textbox
    		var show = $("#showInput").val().trim().toLowerCase();
            if (topics.indexOf(show)> -1){
                alert("Show already exist! Choose another show please!");
            }else {
                //Adding movie from the text box to the array
                topics.push(show);
                //Calling render function to handel processing of the show array
                renderButtons();
            }
    	});

    	function displayShowInfo(){
    		//Clears the showView to only display the button clicked
    		$("#showView").html("");
    		//Getting the name of the button clicked
    		var show = $(this).data("name");
    		console.log(show);
    		//URL for API call
    		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=dc6zaTOxFJmzC&limit=10";
    		//ajax call to retreive information from the API
    		$.ajax({ url: queryURL, method: "GET"}).done(function(resoponse){
    			var results = resoponse.data;

    			console.log(results);

    			for (var i = 0; i < results.length; i++) {
    				//Creating new div and p tags once the button is clicked to display the gif
    				var showDiv = $("<div>");
    				var p = $("<p>");
    				//p tag will print the rating
    				p.text("Rating: " + results[i].rating);

    				var showGIF = $("<img>");
    				//Giving the image tag attributes
    				showGIF.attr("src", results[i].images.fixed_height_still.url);
    				showGIF.attr("data-still", results[i].images.fixed_height_still.url);
    				showGIF.attr("data-animate", results[i].images.fixed_height.url);
    				showGIF.attr("data-state", "still");
    				showGIF.attr("class", "gif");
    				//Appending p and showGIF to the showDiv tag(main div)
    				showDiv.append(p);
    				showDiv.append(showGIF);
    				//pringing the whole showDiv that includes the rating and gif to the showView ID
    				$("#showView").prepend(showDiv);

    				showDiv.attr("id", "imgFloat");
    				$("#imgFloat").css("float", "left");
    				$("#imgFloat").css("margin", "8px");
    			}
    		})
    	}

    	function runGif(){
    		console.log("working");
    		//The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    		var state = $(this).attr("data-state");

    		if (state === "still"){
    			$(this).attr("src", $(this).data("animate"));
    			$(this).attr("data-state", "animate");
    			console.log($(this).attr("data-state"));
    		}
    		else{
    			$(this).attr("src", $(this).data("still"));
    			$(this).attr("data-state", "still");
    			console.log($(this).attr("data-state"));
    		}
    	}

    	renderButtons();
