$(document).ready(function(){


	$.ajax({
        type: "GET",
		url: "data.php",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
		success: function(data) {

			//***************************************************
            // Data Acquisition
            //***************************************************

            console.log(data);
            var usernames = JSON.parse(data[0]);
            var passwords = JSON.parse(data[1]);
            var successes = JSON.parse(data[2]);
            var ips = JSON.parse(data[3]);
            var commands = JSON.parse(data[4]);
	        var starttimes = JSON.parse(data[5]);
            var cmdsessionids = JSON.parse(data[6]);
            var cmdtimes = JSON.parse(data[7]);
            var sessionids = JSON.parse(data[8]);


            //***************************************************
            //  IP Address Frequency Chart
            //***************************************************


            var ipcount = [];
            var uniqueips = [];
            var un = 0;
            for(i = 0; i < ips.length; i++) {
                if(uniqueips.length != 0) {
                    for (j = 0; j < uniqueips.length; j++) {
                        if (ips[i] == uniqueips[j]) {
                            ipcount[j]++;
                            un = 1;
                        }
                    }
                }
                if(un == 0){
                    uniqueips.push(ips[i]);
                    ipcount.push(1);
                }
                else{
                    un = 0;
                }
            }

            console.log(uniqueips);
            console.log(ipcount);


			var options = {
                scales:{
                    yAxes:[{
                        display: true,
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            };

			var ctx = $("#ipcanvas");
			new Chart(ctx, {
				type: 'bar',
				data: {
				        labels: uniqueips,
				        datasets : [{
                            label: 'IP Address Hits',
                            backgroundColor: 'rgba(255, 138, 51, 0.75)',
                            borderColor: 'rgba(200, 200, 200, 0.75)',
                            data: ipcount
                        }]
			            },
                options: options
			});


            //***************************************************
            // Username Frequency Chart
            //***************************************************


            var uscount = [];
            var uniqueusers = [];
            var unus = 0;
            for(i = 0; i < usernames.length; i++) {
                if(uniqueusers.length != 0) {
                    for (j = 0; j < uniqueusers.length; j++) {
                        if (usernames[i] == uniqueusers[j]) {
                            uscount[j]++;
                            unus = 1;
                        }
                    }
                }
                if(unus == 0){
                    uniqueusers.push(usernames[i]);
                    uscount.push(1);
                }
                else{
                    unus = 0;
                }
            }

            var userchart = $("#usernames");
			new Chart(userchart, {
				type: 'bar',
				data: {
				        labels: uniqueusers,
				        datasets : [{
                            label: 'Common Usernames',
                            backgroundColor: 'rgba( 51, 255, 215 , 0.75)',
                            borderColor: 'rgba(200, 200, 200, 0.75)',
                            data: uscount
                        }]
			            },
                options: options
			});

            //***************************************************
            // Password Frequency Chart
            //***************************************************


            var passcount = [];
            var uniquepass = [];
            var unpass = 0;
            for(i = 0; i < passwords.length; i++) {
                if(uniquepass.length != 0) {
                    for (j = 0; j < uniquepass.length; j++) {
                        if (passwords[i] == uniquepass[j]) {
                            passcount[j]++;
                            unpass = 1;
                        }
                    }
                }
                if(unpass == 0){
                    uniquepass.push(passwords[i]);
                    passcount.push(1);
                }
                else{
                    unpass = 0;
                }
            }

            var passchart = $("#passwords");
			new Chart(passchart, {
				type: 'bar',
				data: {
				        labels: uniquepass,
				        datasets : [{
                            label: 'Common Passwords',
                            backgroundColor: 'rgba(252, 51, 255, 0.75)',
                            borderColor: 'rgba(200, 200, 200, 1)',
                            data: passcount
                        }]
			            },
                options: options
			});

            //***************************************************
            // Success Chart
            //***************************************************

            var good = 0;
            var bad = 0;
            for(i = 0; i < successes.length; i++){
                if(successes[i] == 1){
                    good++;
                }
                else{
                    bad++;
                }
            }

            var goodper = good/(successes.length) * 100;
            var badper = bad/(successes.length) * 100;


            var successPie = $('#successes');
            new Chart(successPie,{
                type: 'doughnut',
                data: {
                    labels: ["Successful Entry", "Failed Entry"],
                    datasets: [{
                        backgroundColor: ['#811BD6', '#9CBABA'],
                        data: [goodper, badper]
                    }]
                }
            });

            //***************************************************
            // Command Table
            //***************************************************
            var cmdips = [];
            for(i=0; i<cmdsessionids.length; i++){
                for(j=0; j<sessionids.length; j++){
                    if(cmdsessionids[i] == sessionids[j]){
                        cmdips.push(ips[j]);
                    }
                }
            }

            console.log("ips from commands")
            console.log(cmdips);

            var cmdlist = "<tr><td>Command</td><td>Source IP Address</td><td>Time Stamp</td></tr>";
            for(i = 0; i < commands.length; i++){
                cmdlist = cmdlist + "<tr><td>" + commands[i] + "</td><td>" + cmdips[i] + "</td><td>" + cmdtimes[i] + "</td></tr>";
            }
            $('#input').html(cmdlist);


            //***************************************************
            // Password Percentage Chart
            //***************************************************


            var percount = [];
            var uniquepassper = [];
            var unpassper = 0;
            for(i = 0; i < passwords.length; i++) {
                if(uniquepassper.length != 0) {
                    for (j = 0; j < uniquepassper.length; j++) {
                        if (passwords[i] == uniquepassper[j]) {
                            percount[j]++;
                            unpassper = 1;
                        }
                    }
                }
                if(unpassper == 0){
                    uniquepassper.push(passwords[i]);
                    percount.push(1);
                    unpassper = 0;
                }
                else{
                    unpassper = 0;
                }
            }

            var percents = [];
            for(i = 0; i < uniquepassper.length; i++) {
                percents.push(percount[i] / (passwords.length) * 100);
            }


            var color = '#';
            var letters = '0123456789ABCDEF';
            var colorargs = [];
            for(i = 0; i < uniquepassper.length; i++){
                color = '#';
                for (var j = 0; j < 6; j++ ) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                colorargs.push(color);
            }

            console.log(colorargs);
            console.log(uniquepassper);
            console.log(percents);

            var passPerPie = $('#passper');
            new Chart(passPerPie,{
                type: 'doughnut',
                data: {
                    labels: uniquepassper,
                    datasets: [{
                        backgroundColor: colorargs,
                        data: percents
                    }]
                }
            });

            console.log(starttimes[0]);


            //***************************************************
            // Login Frequency Chart
            //***************************************************

            var dates = [];
            var newformat;
            var reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
            var dateArray = [];
            var dateObject;
            for(i=0; i < starttimes.length; i++){
                newformat = new Date(starttimes[i]);
                dates.push(newformat);
            }

            var rollback = 4;
            var hours = [];
            var split = 1;
            var points = rollback / split;
            var mostrecent = new Date(dates[dates.length - 1].valueOf());
            var timesplits = [];
            var templabels = [];
            var next;
            for(i = 0; i < points; i++){
                next = new Date(mostrecent.valueOf());
                next.setHours(next.getHours() - i);
                timesplits.push(next);
                templabels.push(next);
            }

            var timelabels = [];
            var friendlydate;
            for(i=0; i<templabels.length; i++){
                friendlydate = (templabels[i].getMonth() + 1) + '/' + templabels[i].getDay() + '/' + templabels[i].getFullYear() + ' ' + templabels[i].getHours() + ':' + templabels[i].getMinutes();
                timelabels.push(friendlydate);
            }

            var splitdata = [];
            for(i=0; i < timesplits.length; i++){
                splitdata.push(0);
            }
            console.log("Most recent");
            console.log(mostrecent);
            console.log("Dates below");
            for(i=0; i < dates.length; i++){
                console.log(dates[i])
                for(j=1; j<timesplits.length; j++){
                    if(dates[i].getTime() <= timesplits[j - 1].getTime() && dates[i].getTime() > timesplits[j].getTime()){
                        splitdata[j - 1] = splitdata[j-1] + 1;
                    }
                }
            }

            console.log(timesplits);
            console.log(timelabels);
            console.log(splitdata);

            var loginoptions = {
                scales:{
                    yAxes:[{
                        display: true,
                        ticks: {
                            beginAtZero: true
                        },
                        scalelabel:{
                          display: true,
                          labelstring: 'Time'
                        }
                    }],
                    xAxes:[{
                        display:true,
                        ticks: {
                            reverse: true
                        },
                        scalelabel:{
                            display: true,
                            labelstring: 'Number of Sessions'
                        }
                    }]
                }
            };

            var loginchart = $("#loginfrequency");
            new Chart(loginchart, {
                type: 'line',
                data: {
                    labels: timelabels,
                    datasets : [{
                        label: 'Login Frequency by Time',
                        backgroundColor: 'rgba( 51, 255, 215 , 0.75)',
                        borderColor: 'rgba(200, 200, 200, 0.75)',
                        data: splitdata
                    }]
                },
                options: loginoptions
            });

		},
		error: function(ts) {
            console.log("error");
            console.log(ts.responseText);
		}
	});
});
