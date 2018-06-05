//Pop-up modal controller for "Add certificate functionality"
({
    
    AddCertificate : function(component, event, helper){
  var Name = component.find("Certificate_Name").get("v.value");
       
        var Link = component.find("Certificate_Link").get("v.value");
        var Valid = component.find("Certificate_Date").get("v.value");
        var action = component.get("c.AddCerti");
        action.setParams({NewName : Name, NewLink : Link, NewDate : Valid, conId:'003f400000NamMUAAZ'});
        action.setCallback(this, function(response){
            if(response.getState()==="SUCCESS"){
                if(response.getReturnValue()){
                    $A.get('e.force:refreshView').fire();
                    component.find("overlayLib").notifyClose();
                }
                else
                    console.log("Failed To Insert");
            }
            else
             console.log("Error Fetching Data");
        });
        $A.enqueueAction(action);
    },

    
 
})