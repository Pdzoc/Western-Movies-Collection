let select = document.querySelector('select');
        let main = document.querySelector('main');
        let allData;
        let allActors = new Set();
        let sortedActors;
        let chart;
        let chartData;

        function load() {
            fetch('movies.json')
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error, status = ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    allData = data;
                    actorsList()
                    createOptions()
                })
                .catch((error) => {
                    console.log('Fail')
                });
        }

        function actorsList() {
            allData.forEach(el => el.actors.forEach(actor => allActors.add(actor)));
            sortedActors = [...allActors].sort();
            chartData = sortedActors.map(el => allData.filter(x => x.actors.includes(el)).length)
        }
        
        function createOptions() {
                sortedActors.forEach(el => {
                let opt = document.createElement('option');
                opt.value = el;
                opt.innerText = el;
                select.appendChild(opt)
            })
        }

        function getActor(el) {
            main.innerHTML = '';
            if(el.target.value=='all') {
                allData.sort((a,b) => b.year - a.year)
                allData.forEach(v => {
                    let p = document.createElement('p');
                    p.innerText = "("+v.year+") "+ v.title;
                    p.setAttribute('class', 'slide')
                    main.appendChild(p)
                })
                drawPieChart();
            }
            else{
                let movies = allData.filter(movie => movie.actors.includes(el.target.value));
                movies.sort((a,b) => b.year - a.year)
                movies.forEach(v => {
                    let p = document.createElement('p');
                    p.innerText = "("+v.year+") "+ v.title;
                    p.setAttribute('class', 'slide')
                    main.appendChild(p)
                })
            }
        }

        function drawPieChart() {
            main.innerHTML += '<canvas id="pie-chart" width="400" height="450"></canvas>';
            chart = new Chart(document.getElementById("pie-chart"), {
                    type: 'pie',
                    data: {
                    labels: sortedActors,
                      datasets: [{
                        label: 'test',
                        backgroundColor: ["gold","silver" ,"red","green","cornflowerblue", 'sienna',"khaki",'indianred',"blueviolet","yellowgreen","tomato"],
                        borderColor: '#deb887',
                        data: chartData
                      }]
                    },
                    options: {
                        layout: {
                            padding: 20
                        },
                        plugins:{
                            legend:{
                                labels:{
                                    color:'burlywood',
                                    textAlign: 'left',
                                    font: {
                                        size:15,
                                        weight: 'bold'
                                    }
                                }
                            }
                        }
                    }
                });
        }

        select.addEventListener('change', getActor);
        load();