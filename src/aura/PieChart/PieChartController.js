//controller method to generate the pie chart in "Certification tab"
({
	generateChart : function(component, event, helper) {
    var colors=['#D0492C', '#25D995', '#0E4612', '#380C77','#380C77', '#380C77']
	action = component.get("c.fetchPieInfo");
	action.setCallback(this, function(response){
		if(response.getState()==="SUCCESS"){
			var object = response.getReturnValue();
			console.log(object);
			var objName=[];
			var objCount=[];
			for (var i in object){
				objName.push(object[i].Name);
				objCount.push(object[i].expr0)
			}

			var limit = objName.length;
			colors.slice(0,limit);
			var chartdata = {
			labels: objName,
			datasets: [
				{
					label:'Certificate',
					data: objCount,
					borderColor:'#000000',
					backgroundColor:colors,
					fill: false,
					pointBackgroundColor: "#FFFFFF",
					pointBorderWidth: 1,
					pointHoverRadius: 1,
					pointRadius: 1,
					bezierCurve: true,
					pointHitRadius: 2
				}
			  ]
		   }
			var ctx = component.find("linechart").getElement();
		    console.log(ctx);
		    var lineChart = new Chart(ctx ,{
				type: 'pie',
			    data: chartdata,
   				options: { 
				   legend: {
					   position: 'bottom',
					   padding: 2,
				   },
				   responsive: true
			   }
		   });
		}
   	});
	$A.enqueueAction(action);
	}
})