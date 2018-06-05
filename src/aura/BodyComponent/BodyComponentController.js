//Controller Javascript for Body Component
({
	myAction : function(component, event, helper) {
//Get return values from helper method
        helper.getUserInformation(component);
        helper.getCertiInformation(component);
        helper.getEmerInformation(component);

    },

//Controller for returning search details
    getSearchDetails: function(component){
        var key = component.find("search").get("v.value");
     if (key==""){
      component.set("v.Search_Contact",null); 
     }
     else{
     var action = component.get("c.fetchContactFromSearch");
     action.setParams( {skey : key} );
        action.setCallback(this, function(response){
            if(response.getState()==="SUCCESS"){
                component.set("v.Search_Contact",response.getReturnValue());
            }
            else
             console.log("Error Fetching Data");
        });
        $A.enqueueAction(action);
    }
    },

//Controller for navigation to record details page
    gotoRecord : function(component, event, helper) {
        var id1 = event.getSource().get("v.value").Id;
        var navEvt = $A.get("e.force:navigateToSObject");
           navEvt.setParams({
             "recordId": id1,
             "slideDevName": "details"
           });
           navEvt.fire();
    },

//Controller for Modal pop-up to add new certificate
        handleShowModal: function(component, evt, helper) {
            var modalBody;
            $A.createComponent("c:modalContent", {},
               function(content, status) {
                   if (status === "SUCCESS") {
                       modalBody = content;
                       component.find('overlayLib').showCustomModal({
                           header: "Application Confirmation",
                           body: modalBody, 
                           showCloseButton: true,
                           cssClass: "mymodal",
                           closeCallback: function() {
                               
                           }
                       })
                   }                               
               });
        },


})