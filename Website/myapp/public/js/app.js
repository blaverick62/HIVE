$(document).ready(function(){


	$.ajax({
        type: "GET",
		url: "data.php",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
		success: function(data) {
			//$("#test").html(data);
            console.log(data);
            var usernames = JSON.parse(data[0]);
            var passwords = JSON.parse(data[1]);
            var successes = JSON.parse(data[2]);
            var ips = JSON.parse(data[3]);
            var commands = JSON.parse(data[4]);

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

            var cmdlist = "<li>Commands Entered:</li>";
            for(i = 0; i < commands.length; i++){
                cmdlist = cmdlist + "<li>" + commands[i] + "</li>";
            }
            $('#input').html(cmdlist);

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
            

		},
		error: function(ts) {
            console.log("error");
            console.log(ts.responseText);
		}
	});
});