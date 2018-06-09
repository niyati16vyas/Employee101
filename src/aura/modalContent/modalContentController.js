//Pop-up modal controller for "Add certificate" and "Edit certificate" functionality"
({
    
    AddCertificate : function(component, event, helper){
        var Name = component.find("Certificate_Name").get("v.value");
        var Link = component.find("Certificate_Link").get("v.value");
        var Valid = component.find("Certificate_Date").get("v.value");
        var action = component.get("c.AddCerti");
        var id=component.get("v.certiId");
        var certifId;
        if(!id || /^\s*$/.test(id)) {
            certifId=null;
        }
        else
        {  
            certifId=id;
        }
        
        console.log(certifId + " " + Name + " " + Link + " " + Valid );
        
        action.setParams({certiId: certifId ,NewName : Name, NewLink : Link, NewDate : Valid});
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