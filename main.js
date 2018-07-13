/* Table & Chart 1 */

var div = document.createElement("div");
div.id = "tabdiv";
var container = document.getElementById("mw-content-text");

container.insertBefore(div, table1);

var data = [];
var table = document.getElementById("table1");
var years = table.getElementsByTagName("tr")[1].getElementsByTagName("th");
var yearsArray = [];



for(let i = 2; i < years.length; i++) {
        let content = years[i].innerHTML;
        yearsArray.push(content);
}

var rows = table.getElementsByTagName("tr");



for(let i = 2; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName("td");

        for(let j = 0; j < cells.length; j++) {
                if(j === 0) {
                        var pays = cells[j].innerHTML;
                }
                        
                else if(!isNaN(parseInt(cells[j].innerHTML))) {
                        data.push({data:parseInt(cells[j].innerHTML), pays:pays, years:yearsArray[j-1]});
                }

        }
}

var svg = dimple.newSvg("#tabdiv", "100%", 450);
var myChart = new dimple.chart(svg, data);
myChart.setBounds(30, 110, "90%", 305);
var x = myChart.addCategoryAxis("x", ["years", "pays"]);
var y = myChart.addMeasureAxis("y", "data");
y.ticks = 20;
myChart.addSeries("pays", dimple.plot.line);
myChart.addSeries("pays", dimple.plot.scatter);
myChart.addLegend(10, 10, "100%", 200);
myChart.draw();

/* Table & Chart 2 */

var div = document.createElement("div");
div.id = "tabdiv2";
var container = document.getElementById("mw-content-text"); 

container.insertBefore(div, table2);

var data = [];
var table = document.getElementById("table2");
var years = table.getElementsByTagName("tr")[0].getElementsByTagName("th");
var yearsArray = [];

console.log(yearsArray)

for(let i = 2; i < years.length; i++) {
        let content = years[i].innerHTML;
        yearsArray.push(content);
}

var rows = table.getElementsByTagName("tr");

for(let i = 2; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName("td");

        for(let j = 0; j < cells.length; j++) {
                if(j === 0) {
                        var pays = cells[j].innerHTML;
                }
                        
                else if(!isNaN(parseInt(cells[j].innerHTML))) {
                        data.push({data:parseInt(cells[j].innerHTML), pays:pays, years:yearsArray[j-1]});
                }

        }
}

console.log(data)
    
var myChart = new dimple.chart(dimple.newSvg("#tabdiv2", "100%", 550), data);
myChart.setBounds(35, 180, "90%", 305);
var x = myChart.addCategoryAxis("x", ["years", "pays"]);
x.addOrderRule("years", false);
var y = myChart.addMeasureAxis("y", "data");
y.ticks = 15;
myChart.addSeries("pays", dimple.plot.bar);
myChart.addSeries("pays", dimple.plot.scatter);
myChart.addLegend(10, 10, "100%", 200);
myChart.draw();

/* Table & Chart 3 */

var div = document.createElement("div");
div.id = "tabdiv3";
var bodyContent = document.getElementById("bodyContent");
var container = document.getElementById("content");


container.insertBefore(div, bodyContent);
var myChart;
var tab3 = [];
var request = new XMLHttpRequest();

request.open('GET', 'https://inside.becode.org/api/v1/data/random.json', true);

request.onload = function() {
        
  if (request.status >= 200 && request.status < 400) {
    var data = JSON.parse(request.responseText);
    
  for(i = 0; i < data.length; i ++){
    
    let object = { 
        "data1": parseInt(data[i][0]),
        "data2": parseInt(data[i][1])

    }

    tab3.push(object)
} 

     myChart = new dimple.chart(dimple.newSvg("#tabdiv3", "100%", 550), tab3);
    myChart.setBounds(35, 180, "90%", 305);
    var x = myChart.addCategoryAxis("x", "data1");
    x.addOrderRule("data1", false);
    var y = myChart.addMeasureAxis("y", "data2");
    y.ticks = 15;
    myChart.addSeries(null, dimple.plot.bar);
    myChart.addSeries(null, dimple.plot.scatter);
    myChart.draw();
    updateChart()
  } 
};

request.send();


function updateChart(){
    request.open('GET', 'https://inside.becode.org/api/v1/data/random.json', true);
    
    request.onload = function() {
        
        if (request.status >= 200 && request.status < 400) {
          var data = JSON.parse(request.responseText);
          
        for(i = 0; i < data.length; i ++){
          
          let object = { 
              "data1": parseInt(data[i][0]),
              "data2": parseInt(data[i][1])
           }
      
        tab3.push(object)
        }
        console.log(tab3)  

        myChart.data = tab3;
        myChart.draw();
        setTimeout(function(){updateChart()}, 1000);


        }     
    }
    request.send()
    
}
