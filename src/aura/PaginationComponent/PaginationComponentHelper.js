//helper method for pagination component
({
	//method to get total number of certificates for each contact
	GetAllCertificates : function(component){
		var action = component.get("c.getCount");
		action.setCallback(this, function(response){
			if(response.getState()==="SUCCESS"){
				var temp = JSON.stringify(component.get("v.All_Contact"));
				console.log(temp);
				var colleague = JSON.parse(temp);
				console.log(colleague);
				var certificates = response.getReturnValue();
				console.log(certificates);
				var temp2 = JSON.stringify(certificates);
				console.log(temp2);
				var custs = [];
				for (var i in colleague ){
					if (certificates.hasOwnProperty(colleague[i].Id)){
						custs.push({Name: colleague[i].Name,Id: colleague[i].Id,count: certificates[colleague[i].Id]});
					}
					else
						custs.push({Name: colleague[i].Name,Id: colleague[i].Id ,count: 0});
				}
				var a = component.find("max");
				component.set("v.All_Certi", custs);
				var setEvent = component.getEvent("setAttribute");
			    console.log(Math.floor((custs.length+9)/10));
				component.set("v.originalValue",Math.floor((custs.length+4)/5))
			   	setEvent.setParams({"attributeValue":component.get("v.originalValue")});
			  	console.log(setEvent);
			  	console.log("Event Fired");
			 	setEvent.fire();
				this.renderPage(component);   
			}
		});
		$A.enqueueAction(action);
	},

	//method to get all contacts from database
	GetAllContacts : function(component){
		var action = component.get("c.fetchContacts");
		action.setCallback(this, function(response){
			if(response.getState()==="SUCCESS"){
				component.set("v.All_Contact",response.getReturnValue()); 
				this.GetAllCertificates(component);  
			}
   		});
		$A.enqueueAction(action);
	},

	//method to render page
	renderPage: function(component){
		console.log('renderPage called');
		var toggle = component.get("v.togglePagi");
		if(toggle===true){
			var records= component.get("v.currentList");
		  	console.log("In the List");
		}
		else
		{ 
		 	var records = component.get("v.All_Certi");
		} 
		var pageNumber = component.get("v.currentPageNumber");
		console.log(pageNumber);
		var pageRecords = records.slice((pageNumber-1)*10, pageNumber*10);
		component.set("v.displayList", pageRecords);
	}
})