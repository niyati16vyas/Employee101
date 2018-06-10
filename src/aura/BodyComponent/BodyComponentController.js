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
        $A.createComponent("c:ModalContent", {},
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

//Controller for deleting emergency contact(s)
    deleteEmerContact : function(component, event, helper){
        console.log("Entering Delete Stage");
        var a =event.getSource().get("v.value");
        console.log(a);
        component.set("v.DeleterecordId",event.getSource().get("v.value"));
        console.log(component.get("v.DeleterecordId"));
        component.set("v.ShowEmergencyCon",true);
        component.find("deleteRecorddetails").reloadRecord();
    },

//Controller for updating the results after deletion of emergency contacts
//handler for recordUpdate functionality of LDS
    recordUpdated : function(component){
        component.find("deleteRecorddetails").deleteRecord($A.getCallback(function(deleteResult){
            if (deleteResult.state === "SUCCESS" || deleteResult.state === "DRAFT") {
                var resultsToast = $A.get("e.force:showToast");
                    resultsToast.setParams({
                            "title": "Deleted",
                            "message": "The record was deleted."
                });
                resultsToast.fire();
                console.log("Record is deleted.");
                component.set("v.Emerg_cnt","v.Emerg_cnt.length-1");
            }
        }))
        $A.get('e.force:refreshView').fire();
    },

//Controller for editing the details of certificate    
    edit : function(component, event, helper) {
        var a =event.getSource().get("v.value");
        var cname = component.get("v.certiInfo");
        console.log(a);
        console.log("CNAME : " + cname[a].Name);
        var modalBody;
        $A.createComponent("c:ModalContent", {"certiId":cname[a].Id,"certiName":cname[a].Name, "certiLink":cname[a].Link__c, "certiValid":cname[a].Valid_Till__c},
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

//Set max page value for pagination in the tab "Know your colleagues"
    setAttributeValue: function(component,event){
        console.log('event handled');
        console.log(event);
        var eventValue= event.getParam('attributeValue');
        console.log(eventValue);  
        component.set("v.maxPage", eventValue);
    },
})