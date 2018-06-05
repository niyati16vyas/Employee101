
//Controller method of Header component in Application Employee101
({
	get_greeting : function(component, event, helper) {
		var greet_text = helper.greetings();
		component.set("v.greeting_text", greet_text);
		console.log("Executing setUsername");
		helper.setUserName(component);
	}
})