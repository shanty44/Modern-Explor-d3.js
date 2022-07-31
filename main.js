// CHART START
const width = 800
const height = 500
const margin = {
    top:10,
    bottom: 40,
    left: 60,
    right: 10
}
const svg = d3.select("#chart").append("svg").attr("width", width).attr("height",height)
const elementGroup = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`).attr("id", "elementGroup")
// grupo ejes
const axisGroup = svg.append("g").attr("id", "axisGroup")
// const para axis x e y
const xAxisGroup = axisGroup.append("g").attr("transform", `translate(${margin.left}, ${height-margin.bottom})`)
const yAxisGroup = axisGroup.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`)
// defino escala x: cant titulos y: paises
const x = d3.scaleLinear().range([0, width - margin.left - margin.right])
const y = d3.scaleBand().range([height - margin.top - margin.bottom, 0]).padding(0.05)

// defino ejes
const xAxis = d3.axisBottom().scale(x)
const yAxis = d3.axisLeft().scale(y)
 


d3.csv("data.csv").then(data =>{
    data = d3.nest()
         .key(d => d.winner)
         .entries(data.filter(d => d.winner != ""))
    // console.log(data)
        data.map(d =>{
            d.year = +d.year
        // ver estox
    })

    
    x.domain([0, d3.max(data.map(d => d. values. length)),10])
    y.domain(data.map(d => d.key))
    xAxisGroup.call(xAxis)
    yAxisGroup.call(yAxis)

    elementGroup.selectAll("rect").data(data)
        .join("rect") 
            .attr("class", d => d.key)
            .attr("x",0)
            .attr("y", d => y(d.key))
            .attr("width", d => x(d.values.length))
            .attr("height",y.bandwidth())
    
        
       
})







// CHART END

// slider:
function slider() {    
    var sliderTime = d3
        .sliderBottom()
        .min(d3.min(years))  // rango años
        .max(d3.max(years))
        .step(4)  // cada cuánto aumenta el slider
        .width(580)  // ancho de nuestro slider
        .ticks(years.length)  
        .default(years[years.length -1])  // punto inicio de la marca
        .on('onchange', val => {
            console.log("La función aún no está conectada con la gráfica")
            // conectar con la gráfica aquí
        });

        var gTime = d3
        .select('div#slider-time')  // div donde lo insertamos
        .append('svg')
        .attr('width', width * 0.8)
        .attr('height', 100)
        .append('g')
        .attr('transform', 'translate(30,30)');

        gTime.call(sliderTime);

        d3.select('p#value-time').text(sliderTime.value());
}