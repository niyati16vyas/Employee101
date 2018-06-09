//Helper method for Application Employee101
({
//Helper for fetching user information based on the given contact id
	getUserInformation : function(component) {
        console.log("Executing H.UserInfo");
        var action = component.get("c.fetchUserinfo");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                component.set("v.userInfo", storeResponse);
                component.set("v.isTru", true);
                console.log(component.get("v.isTru"));
                console.log("Yes");
            }
            else{
                console.log("err");
            }
        });
        $A.enqueueAction(action);
    },

//Helper for fetching certificate information based on the given contact id   
    getCertiInformation : function(component){
        console.log("Executing H.CertiInfo");
        var action = component.get("c.fetchCertiInfo");
        action.setParams({conId : '003f400000PWattAAD'});
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
getEmerInformation : function (component) {
    var action = component.get("c.fetchEmergencyContact");
    action.setCallback(this, function(response){
        if(response.getState()==="SUCCESS"){
            component.set("v.emerInfo",response.getReturnValue());
            component.set("v.Emerg_cnt",component.get("v.emerInfo.length"));
            console.log(component.get("v.Emerg_cnt"));
        }
        else
            console.log("Error Fetching Data");
    });
    $A.enqueueAction(action);
},

    fetchConTable : function(component) {
        console.log("Executing H.UserInfo");
        var action = component.get("c.fetchAllContacts");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                component.set("v.conInfo", storeResponse);
                component.set("v.isTru", true);
                console.log(component.get("v.isTru"));
                console.log("Yes");
            }
            else{
                console.log("err");
            }
        });
        $A.enqueueAction(action);
    },

  
})