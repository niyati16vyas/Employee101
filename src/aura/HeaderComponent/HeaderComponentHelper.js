//Helper Methods for Header Component
({
//Helper method for determining greeting (Morning/Evening)
	greetings : function() {
		var currenthour = new Date().getHours();
		var message;
		var mor = ('Morning');
		var eve = ('Evening');

		if(currenthour>=0 && currenthour <12){
			message = mor;
		}
		else{
			message = eve;
		}
		return message;

	},
//Helper method to fetch current logged in user name
	setUserName : function(component){
		
			var action = component.get("c.getUserName");
				action.setCallback(this, function(response) {
					var state = response.getState();
					if (state === "SUCCESS") {
						var storeResponse = response.getReturnValue();
						component.set("v.username_text", storeResponse);
					}
				});
				$A.enqueueAction(action);
		
		
	}
})