const gender_chart = document.getElementById('gender_chart');
const type_monkey_chart = document.getElementById('type_monkey_chart');
const diet_all_chart = document.getElementById('diet_all_chart');
const gender_diet_chart = document.getElementById('gender_diet_chart');
const monkey_diet_chart = document.getElementById('monkey_diet_chart');
const analysis_gender_question = document.getElementById('analysis_gender_question');
const radio_gender_he = document.getElementById('radio_gender_he');
const radio_gender_she = document.getElementById('radio_gender_she');
const analysis_type_question = document.getElementById('analysis_type_question');
const select_vid = document.getElementById('select_vid');
const thoughts_div = document.getElementById('thoughts_div');
const input_count_thoughts = document.getElementById('input_count_thoughts');
const thoughts_btn = document.getElementById('thoughts_btn');

let males_count = parseInt(data_for_js["males_count"]);
let females_count = parseInt(data_for_js["females_count"]);

let hamadryas_count = parseInt(data_for_js["hamadryas_count"]);
let gorilla_count = parseInt(data_for_js["gorilla_count"]);
let macaque_count = parseInt(data_for_js["macaque_count"]);
let monkey_count = parseInt(data_for_js["monkey_count"]);
let orangutan_count = parseInt(data_for_js["orangutan_count"]);
let baboon_count = parseInt(data_for_js["baboon_count"]);
let chimpanzee_count = parseInt(data_for_js["chimpanzee_count"]);

let banan_all = parseInt(data_for_js["banan_all"]);
let pear_all = parseInt(data_for_js["pear_all"]);
let orange_all = parseInt(data_for_js["orange_all"]);
let apple_all = parseInt(data_for_js["apple_all"]);
let kiwi_all = parseInt(data_for_js["kiwi_all"]);
let mushroom_all = parseInt(data_for_js["mushroom_all"]);
let alco_bloh_all = parseInt(data_for_js["alco_bloh_all"]);

let banan = 0;
let pear = 0;
let orange = 0;
let apple = 0;
let kiwi = 0;
let mushroom = 0;
let alco = 0;
let title_chart = 'Предпочтения в рационе';

let json_data = JSON.parse(data_for_js["data_diet"]);

let random_thoughts = json_data["random_thoughts"];


radio_gender_he.addEventListener("change", plottingGenderDiet.bind(radio_gender_he, radio_gender_he));
radio_gender_she.addEventListener("change", plottingGenderDiet.bind(radio_gender_she, radio_gender_she));
select_vid.addEventListener("change", plottingTypeDiet.bind(select_vid, select_vid));
thoughts_btn.addEventListener("click", showThoughts.bind(thoughts_btn, random_thoughts.length, 0));



// Бублики

let selectedDatasetIndex = undefined;
let selectedIndex = undefined;

let clickLabel = {
    id: 'clickLabel',
    beforeDraw: (chart, args, options) => {

        const { ctx, chartArea: { width, height, top } } = chart;

        if (selectedDatasetIndex >= 0) {

            const sum = chart._metasets[selectedDatasetIndex].total;
            const value = chart._metasets[selectedDatasetIndex]._parsed[selectedIndex];
            const percent = value / sum * 100;
            const color = chart.data.datasets[selectedDatasetIndex].borderColor[selectedIndex];

            ctx.save();
            ctx.font = 'bolder 20px Arial';
            ctx.fillStyle = color;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(percent.toFixed(1) + '%', width / 2, height / 2 + top, (width - top) * 0.6 - 6);
            ctx.restore();
        }
    }
}

const gender_data = {
    labels: [
        'Самцы',
        'Самки'
    ],
    datasets: [{
        label: 'Гендерный срез',
        data: [males_count, females_count],
        backgroundColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 99, 132)'
        ],
        borderColor: [
            'rgb(0, 0, 0)',
            'rgb(0, 0, 0)'
        ],
        hoverOffset: 4,
        cutout: '60%'
    }]
};

    
const gender_config = {
    
    type: 'doughnut',
    data: gender_data,
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Гендерный состав респондентов',
                color: 'rgb(0, 0, 0)'
            },
            legend: {
                display: false,
                position: 'bottom',
            },
            tooltip: {
                displayColors: false,
                callbacks: {
                    label: function (item, everything) {
                        let value = item.formattedValue;
                        let label = 'Респондентов: ' + value + '.';
                        return label;
                    }
                }
            }
        },
        onClick: gChartClick,
        onHover: ChartHover
    },
    plugins: [clickLabel]
};


const g_chart = new Chart(gender_chart, gender_config);



const type_monkey_data = {
    labels: [
        'Гамадрил',
        'Горилла',
        'Макака',
        'Мартышка',
        'Орангутан',
        'Павиан',
        'Шимпанзе'
    ],
    datasets: [{
        label: 'Видовой срез',
        data: [
            hamadryas_count,
            gorilla_count,
            macaque_count,
            monkey_count,
            orangutan_count,
            baboon_count,
            chimpanzee_count],
        backgroundColor: [
            'rgba(255, 99, 132, 0.9)',
            'rgba(255, 159, 64, 0.9)',
            'rgba(255, 205, 86, 0.9)',
            'rgba(75, 192, 192, 0.9)',
            'rgba(54, 162, 235, 0.9)',
            'rgba(153, 102, 255, 0.9)',
            'rgba(201, 203, 207, 0.9)'
        ],
        borderColor: [
            'rgb(0, 0, 0)',
            'rgb(0, 0, 0)',
            'rgb(0, 0, 0)',
            'rgb(0, 0, 0)',
            'rgb(0, 0, 0)',
            'rgb(0, 0, 0)',
            'rgb(0, 0, 0)'
        ],
        hoverOffset: 4,
        cutout: '60%'
    }]
};

const type_monkey_config = {

    type: 'doughnut',
    data: type_monkey_data,
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Видовой состав респондентов',
                color: 'rgb(0, 0, 0)'
            },
            legend: {
                display: false,
                position: 'bottom',
            },
            tooltip: {
                displayColors: false,
                callbacks: {
                    label: function (item, everything) {
                        let value = item.formattedValue;
                        let label = 'Респондентов: ' + value + '.';
                        return label;
                    }
                }
            }
        },
        onClick: tmChartClick,
        onHover: ChartHover
    },
    plugins: [clickLabel]
};


const tm_chart = new Chart(type_monkey_chart, type_monkey_config);



function triggerChangeDrawPercent(chart, dataset_index, index) {

    const { ctx, chartArea: { width, height, top } } = chart;

    const sum = chart._metasets[dataset_index].total;
    const value = chart._metasets[dataset_index]._parsed[index];
    const percent = value / sum * 100;
    const color = chart.data.datasets[dataset_index].borderColor[index];

    ctx.clearRect((width / 2) - ((width - top) * 0.6 - 6) / 2, height / 2 + top - 11, (width - top) * 0.6 - 6, 22);
    ctx.save();
    ctx.font = 'bolder 20px Arial';
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(percent.toFixed(1) + '%', width / 2, height / 2 + top, (width - top) * 0.6 - 6);
    ctx.restore();
}

function ChartHover(hover, element, chart) {

    if (element[0]) {
        selectedDatasetIndex = element[0].datasetIndex;
        selectedIndex = element[0].index;
        hover.native.target.style.cursor = "pointer";
        chart.draw();
    }
    if (!element[0]) {
        hover.native.target.style.cursor = "default";
    }    
}

function gChartClick(click, element) {

    if (element[0]) {

        selectedIndex = element[0].index;

        switch (selectedIndex) {
            case 0:
                radio_gender_he.checked = true;
    
                triggerChange(radio_gender_he);
                break;
            case 1:
                radio_gender_she.checked = true;
        
                triggerChange(radio_gender_she);
                break;
        }
    }
}

function tmChartClick(click, element) {

    if (element[0]) {
        
        selectedIndex = element[0].index;
        
        switch (selectedIndex) {
            case 0:
                select_vid.value = "Hamadryas";
                triggerChange(select_vid);
                break;
            case 1:
                select_vid.value = "Gorilla";
                triggerChange(select_vid);
                break;
            case 2:
                select_vid.value = "Macaque";
                triggerChange(select_vid);
                break;
            case 3:
                select_vid.value = "Monkey";
                triggerChange(select_vid);
                break;
            case 4:
                select_vid.value = "Orangutan";
                triggerChange(select_vid);
                break;
            case 5:
                select_vid.value = "Baboon";
                triggerChange(select_vid);
                break;
            case 6:
                select_vid.value = "Chimpanzee";
                triggerChange(select_vid);
                break;
        }
    } 
}

function triggerChange(element) {
    let changeEvent = new Event("change");
    element.dispatchEvent(changeEvent);
}



// Столбики


function plottingGenderDiet(object) {
    
    switch (object) {
        case radio_gender_he:
            analysis_gender_question.innerText = 'Количество респондентов самцов = ' + males_count + '.';
            gd_chart.data.datasets[0].data[0] = json_data["males_banan"];
            gd_chart.data.datasets[0].data[1] = json_data["males_pear"];
            gd_chart.data.datasets[0].data[2] = json_data["males_orange"];
            gd_chart.data.datasets[0].data[3] = json_data["males_apple"];
            gd_chart.data.datasets[0].data[4] = json_data["males_kiwi"];
            gd_chart.data.datasets[0].data[5] = json_data["males_mushroom"];
            gd_chart.data.datasets[0].data[6] = json_data["males_alco"];
            gd_chart.options.plugins.title.text = 'Предпочтения самцов';
            gd_chart.update();
            triggerChangeDrawPercent(g_chart, 0, 0);
            break;
        case radio_gender_she:
            analysis_gender_question.innerText = 'Количество респондентов самок = ' + females_count + '.';
            gd_chart.data.datasets[0].data[0] = json_data["females_banan"];
            gd_chart.data.datasets[0].data[1] = json_data["females_pear"];
            gd_chart.data.datasets[0].data[2] = json_data["females_orange"];
            gd_chart.data.datasets[0].data[3] = json_data["females_apple"];
            gd_chart.data.datasets[0].data[4] = json_data["females_kiwi"];
            gd_chart.data.datasets[0].data[5] = json_data["females_mushroom"];
            gd_chart.data.datasets[0].data[6] = json_data["females_alco"];
            gd_chart.options.plugins.title.text = 'Предпочтения самок';
            gd_chart.update();
            triggerChangeDrawPercent(g_chart, 0, 1);
            break;        
    }
}

function plottingTypeDiet(option) {

    option = this.value;
  
    switch (option) {
        case 'Start':
            analysis_type_question.innerText = 'Чей рацион Вас интересует?';
            md_chart.data.datasets[0].data[0] = banan;
            md_chart.data.datasets[0].data[1] = pear;
            md_chart.data.datasets[0].data[2] = orange;
            md_chart.data.datasets[0].data[3] = apple;
            md_chart.data.datasets[0].data[4] = kiwi;
            md_chart.data.datasets[0].data[5] = mushroom;
            md_chart.data.datasets[0].data[6] = alco;
            md_chart.options.plugins.title.text = title_chart;
            md_chart.update();
            triggerChangeDrawPercent(tm_chart, 0, 999);
            break;
        case 'Hamadryas':           
            analysis_type_question.innerText = 'Количество респондентов Гамадрилов = ' + hamadryas_count + '.';
            md_chart.data.datasets[0].data[0] = json_data["hamadryas_banan"];
            md_chart.data.datasets[0].data[1] = json_data["hamadryas_pear"];
            md_chart.data.datasets[0].data[2] = json_data["hamadryas_orange"];
            md_chart.data.datasets[0].data[3] = json_data["hamadryas_apple"];
            md_chart.data.datasets[0].data[4] = json_data["hamadryas_kiwi"];
            md_chart.data.datasets[0].data[5] = json_data["hamadryas_mushroom"];
            md_chart.data.datasets[0].data[6] = json_data["hamadryas_alco"];
            md_chart.options.plugins.title.text = 'Предпочтения Гамадрилов';
            md_chart.update();
            triggerChangeDrawPercent(tm_chart, 0, 0);
            break;
        case 'Gorilla':           
            analysis_type_question.innerText = 'Количество респондентов Горилл = ' + gorilla_count + '.';
            md_chart.data.datasets[0].data[0] = json_data["gorilla_banan"];
            md_chart.data.datasets[0].data[1] = json_data["gorilla_pear"];
            md_chart.data.datasets[0].data[2] = json_data["gorilla_orange"];
            md_chart.data.datasets[0].data[3] = json_data["gorilla_apple"];
            md_chart.data.datasets[0].data[4] = json_data["gorilla_kiwi"];
            md_chart.data.datasets[0].data[5] = json_data["gorilla_mushroom"];
            md_chart.data.datasets[0].data[6] = json_data["gorilla_alco"];
            md_chart.options.plugins.title.text = 'Предпочтения Горилл';
            md_chart.update();
            triggerChangeDrawPercent(tm_chart, 0, 1);
            break;
        case 'Macaque':
            analysis_type_question.innerText = 'Количество респондентов Макак = ' + macaque_count + '.';
            md_chart.data.datasets[0].data[0] = json_data["macaque_banan"];
            md_chart.data.datasets[0].data[1] = json_data["macaque_pear"];
            md_chart.data.datasets[0].data[2] = json_data["macaque_orange"];
            md_chart.data.datasets[0].data[3] = json_data["macaque_apple"];
            md_chart.data.datasets[0].data[4] = json_data["macaque_kiwi"];
            md_chart.data.datasets[0].data[5] = json_data["macaque_mushroom"];
            md_chart.data.datasets[0].data[6] = json_data["macaque_alco"];
            md_chart.options.plugins.title.text = 'Предпочтения Макак';
            md_chart.update();
            triggerChangeDrawPercent(tm_chart, 0, 2);
            break;
        case 'Monkey':
            analysis_type_question.innerText = 'Количество респондентов Мартышек = ' + monkey_count + '.';
            md_chart.data.datasets[0].data[0] = json_data["monkey_banan"];
            md_chart.data.datasets[0].data[1] = json_data["monkey_pear"];
            md_chart.data.datasets[0].data[2] = json_data["monkey_orange"];
            md_chart.data.datasets[0].data[3] = json_data["monkey_apple"];
            md_chart.data.datasets[0].data[4] = json_data["monkey_kiwi"];
            md_chart.data.datasets[0].data[5] = json_data["monkey_mushroom"];
            md_chart.data.datasets[0].data[6] = json_data["monkey_alco"];
            md_chart.options.plugins.title.text = 'Предпочтения Мартышек';
            md_chart.update();
            triggerChangeDrawPercent(tm_chart, 0, 3);
            break;
        case 'Orangutan':
            analysis_type_question.innerText = 'Количество респондентов Орангутанов = ' + orangutan_count + '.';
            md_chart.data.datasets[0].data[0] = json_data["orangutan_banan"];
            md_chart.data.datasets[0].data[1] = json_data["orangutan_pear"];
            md_chart.data.datasets[0].data[2] = json_data["orangutan_orange"];
            md_chart.data.datasets[0].data[3] = json_data["orangutan_apple"];
            md_chart.data.datasets[0].data[4] = json_data["orangutan_kiwi"];
            md_chart.data.datasets[0].data[5] = json_data["orangutan_mushroom"];
            md_chart.data.datasets[0].data[6] = json_data["orangutan_alco"];
            md_chart.options.plugins.title.text = 'Предпочтения Орангутанов';
            md_chart.update();
            triggerChangeDrawPercent(tm_chart, 0, 4);
            break;
        case 'Baboon':
            analysis_type_question.innerText = 'Количество респондентов Павианов = ' + baboon_count + '.';
            md_chart.data.datasets[0].data[0] = json_data["baboon_banan"];
            md_chart.data.datasets[0].data[1] = json_data["baboon_pear"];
            md_chart.data.datasets[0].data[2] = json_data["baboon_orange"];
            md_chart.data.datasets[0].data[3] = json_data["baboon_apple"];
            md_chart.data.datasets[0].data[4] = json_data["baboon_kiwi"];
            md_chart.data.datasets[0].data[5] = json_data["baboon_mushroom"];
            md_chart.data.datasets[0].data[6] = json_data["baboon_alco"];
            md_chart.options.plugins.title.text = 'Предпочтения Павианов';
            md_chart.update();
            triggerChangeDrawPercent(tm_chart, 0, 5);
            break;
        case 'Chimpanzee':
            analysis_type_question.innerText = 'Количество респондентов Шимпанзе = ' + chimpanzee_count + '.';
            md_chart.data.datasets[0].data[0] = json_data["chimpanzee_banan"];
            md_chart.data.datasets[0].data[1] = json_data["chimpanzee_pear"];
            md_chart.data.datasets[0].data[2] = json_data["chimpanzee_orange"];
            md_chart.data.datasets[0].data[3] = json_data["chimpanzee_apple"];
            md_chart.data.datasets[0].data[4] = json_data["chimpanzee_kiwi"];
            md_chart.data.datasets[0].data[5] = json_data["chimpanzee_mushroom"];
            md_chart.data.datasets[0].data[6] = json_data["chimpanzee_alco"];
            md_chart.options.plugins.title.text = 'Предпочтения Шимпанзе';
            md_chart.update();
            triggerChangeDrawPercent(tm_chart, 0, 6);
            break;
    }
}



const diet_data = {
    labels: ["Банан", "Груша", "Апельсин", "Яблочко", "Киви", "Грибочки", "Пивас"]
    ,
    datasets: [{

        data: [banan, pear, orange, apple, kiwi, mushroom, alco],
        backgroundColor: [
            'rgba(255, 99, 132, 0.9)',
            'rgba(255, 159, 64, 0.9)',
            'rgba(255, 205, 86, 0.9)',
            'rgba(75, 192, 192, 0.9)',
            'rgba(54, 162, 235, 0.9)',
            'rgba(153, 102, 255, 0.9)',
            'rgba(201, 203, 207, 0.9)'
        ],
        borderColor: [
            'rgb(0, 0, 0)',
            'rgb(0, 0, 0)',
            'rgb(0, 0, 0)',
            'rgb(0, 0, 0)',
            'rgb(0, 0, 0)',
            'rgb(0, 0, 0)',
            'rgb(0, 0, 0)'
        ],
        borderWidth: 1
    }]
};

const diet_config = {
    type: 'bar',
    data: diet_data,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#000',
                },
                border: {
                    width: 2,
                    color: '#000',
                }
            },
            x: {
                ticks: {
                    color: '#000',
                },
                border: {
                    width: 2,
                    color: '#000',
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: title_chart,
                color: 'rgb(0, 0, 0)'
            },
            legend: {
                display: false,
                position: 'bottom',
            },
            tooltip: {
                displayColors: false,
                callbacks: {
                    label: function (item, everything) {
                        let sum = item.dataset.data.reduce((accumulator, value) => {
                            return accumulator + value;
                        }, 0);
                        let value = item.formattedValue;
                        let percent = ((value / sum) * 100).toFixed(1);
                        let label = percent + '%';
                        return label;
                    }
                }
            }
        }
    },
};

const gd_chart = new Chart(gender_diet_chart, diet_config);
const md_chart = new Chart(monkey_diet_chart, diet_config);







// График общего рациона

const diet_all_data = {
    labels: ["Банан", "Груша", "Апельсин", "Яблочко", "Киви", "Грибочки", "Пивас"]
    ,
    datasets: [{

        data: [banan_all, pear_all, orange_all, apple_all, kiwi_all, mushroom_all, alco_bloh_all],
        backgroundColor: [
            'rgba(255, 99, 132, 0.9)',
            'rgba(255, 159, 64, 0.9)',
            'rgba(255, 205, 86, 0.9)',
            'rgba(75, 192, 192, 0.9)',
            'rgba(54, 162, 235, 0.9)',
            'rgba(153, 102, 255, 0.9)',
            'rgba(201, 203, 207, 0.9)'
        ],
        borderColor: [
            'rgb(0, 0, 0)',
            'rgb(0, 0, 0)',
            'rgb(0, 0, 0)',
            'rgb(0, 0, 0)',
            'rgb(0, 0, 0)',
            'rgb(0, 0, 0)',
            'rgb(0, 0, 0)'
        ],
        borderWidth: 1
    }]
};


const diet_all_config = {

    type: 'bar',
    data: diet_all_data,
    options: {
        indexAxis: 'y',
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#000',
                },
                border: {
                    width: 2,
                    color: '#000',
                }
            },
            x: {
                ticks: {
                    color: '#000',
                },
                border: {
                    width: 2,
                    color: '#000',
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Общие предпочтения',
                color: 'rgb(0, 0, 0)'
            },
            legend: {
                display: false,
                position: 'bottom',
            },
            tooltip: {
                displayColors: false,
                callbacks: {
                    label: function (item, everything) {
                        let sum = item.dataset.data.reduce((accumulator, value) => {
                            return accumulator + value;
                        }, 0);
                        let value = item.formattedValue;
                        let percent = ((value / sum) * 100).toFixed(1);
                        let label = percent + '%';
                        return label;
                    }
                }
            }
        }
    },
};

const da_chart = new Chart(diet_all_chart, diet_all_config);


// Вывод мыслей респондентов

function showThoughts(max, min) {

    if (input_count_thoughts.value <= 0) {
        input_count_thoughts.value = 1;
    } else if (input_count_thoughts.value > 7) {
        input_count_thoughts.value = 7;
    }

    let count_thoughts = Number(input_count_thoughts.value);

    let arr_index = [];
    for (let i = 0; i <= max; i++) {
        let index = Math.floor(Math.random() * max) + min;
        if (arr_index.includes(index) == true) {
            i = i - 1;
        } else {
            if (index > max == false && arr_index.length < count_thoughts) {
                arr_index.push(index);
            }
        }
    }

    let arr_thoughts = [];
    for (let i = 0; i < count_thoughts; i++) {
        let thought = random_thoughts[arr_index[i]].message;
        arr_thoughts.push(thought);
    }


    while (thoughts_div.firstChild) {
        thoughts_div.removeChild(thoughts_div.firstChild);
    }

    for (let i = 0; i < arr_thoughts.length; i++) {

        let p = document.createElement('p');
        p.textContent = '"' + arr_thoughts[i] + '"';
        thoughts_div.append(p);

    }
}