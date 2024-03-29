var time = []
var temperature = [];
var humidity = [];
	
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var myObj = JSON.parse(this.responseText);
    //document.getElementById("demo").innerHTML = myObj[0];
	
	var len = myObj.length;

	for (i = 0; i < len; i++){
		time[i] = myObj[i][0];
		temperature[i] = myObj[i][1];
		humidity[i] = myObj[i][2];
	}
//	document.getElementById("demo").innerHTML = temperature[0];

  }
};
xmlhttp.open("GET", "log.json", true);
xmlhttp.send(); 

let data = {
        labels: time,
        datasets: [
            {
                label: "Temperature",
				borderColor: 'rgba(255,0,0, 0.5)',
				backgroundColor: 'rgba(255,0,0, 0.5)',
				fill: false,
				yAxisID: 'y-axis-1',
				pointRadius: 0,
                data: temperature
            },
			 {
                label: "Humidity",
				borderColor: 'rgba(0,255,0, 0.5)',
				backgroundColor: 'rgba(0,255,0, 0.5)',
				fill: false,
				pointRadius: 0,
				yAxisID: 'y-axis-2',
                data: humidity
            },
        ]
    };

    let options = {
		scales: {
						xAxes:[{
							type: 'time'
						}],

						yAxes: [{
							type: 'linear',
							display: true,
							position: 'left',
							id: 'y-axis-1',
						}, {
							type: 'linear',
							display: true,
							position: 'right',
							id: 'y-axis-2',

							gridLines: {
								drawOnChartArea: false
							}
						}]
	}};
    let ctx = document.getElementById("myChart").getContext("2d");
    let myLineChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });

setTimeout(function() {myLineChart.update(); },1000);