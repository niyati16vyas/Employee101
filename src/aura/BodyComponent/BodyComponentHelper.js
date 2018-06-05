//Helper method for Application Employee101
({
//Helper for fetching user information based on the given contact id
	getUserInformation : function(component) {
        var action = component.get("c.fetchUserinfo");
        action.setParams({conId : '003f400000NamMUAAZ'});
        action.setCallback(this, function(response) {
            var state = response.getState();
            
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                component.set("v.userInfo", storeResponse);
            }
            else{
                console.log("err");
            }
        });
        $A.enqueueAction(action);
    },

//Helper for fetching certificate information based on the given contact id   
    getCertiInformation : function(component){
        var action = component.get("c.fetchCertiInfo");
        action.setParams({conId : '003f400000NamMUAAZ'});
        action.setCallback(this, function(response) {
            var state = response.getState();
            
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                component.set("v.certiInfo", storeResponse);
            }
            else{
                console.log("err");
            }
        });
        $A.enqueueAction(action);
    },

//Helper for fetching emergency Contact information based on the given contact id
    getEmerInformation : function(component){
        var action = component.get("c.fetchEmergencyContact");
        action.setParams({conId : '003f400000NamMUAAZ'});
        action.setCallback(this, function(response) {
            var state = response.getState();
            
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                component.set("v.emerInfo", storeResponse);
            }
            else{
                console.log("err");
            }
        });
        $A.enqueueAction(action);
    },

    
})