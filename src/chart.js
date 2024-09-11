import * as d3 from 'd3';

class IndexChart {
  constructor(container, options) {
    this.container = container;
    this.options = options || {};
    this.data = [];
    this.svg = null;
    this.xScale = null;
    this.yScale = null;
    this.line = null;
    this.initChart();
  }

  initChart() {
    // Define width, height, and margins
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = this.options.width || 800 - margin.left - margin.right;
    const height = this.options.height || 400 - margin.top - margin.bottom;

    // Create the SVG canvas
    this.svg = d3.select(this.container)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Define X and Y scales
    this.xScale = d3.scaleTime().range([0, width]);
    this.yScale = d3.scaleLinear().range([height, 0]);

    // Line generator for D3
    this.line = d3.line()
      .x((d) => this.xScale(new Date(d.time)))  // Assuming `time` in data
      .y((d) => this.yScale(d.value))           // Assuming `value` in data
      .curve(d3.curveMonotoneX);                // Smooth line

    // Create axes
    this.svg.append('g').attr('class', 'x-axis').attr('transform', `translate(0,${height})`);
    this.svg.append('g').attr('class', 'y-axis');
  }

  updateChart(newData) {
    // Merge incoming data into existing dataset
    this.data = this.data.concat(newData);

    // Update the X and Y domains
    this.xScale.domain(d3.extent(this.data, (d) => new Date(d.time)));
    this.yScale.domain([0, d3.max(this.data, (d) => d.value)]);

    // Select and update the line
    const path = this.svg.selectAll('.line')
      .data([this.data]);

    path.enter()
      .append('path')
      .attr('class', 'line')
      .merge(path)
      .attr('d', this.line)
      .style('fill', 'none')
      .style('stroke', 'steelblue')
      .style('stroke-width', '2px');

    // Update axes
    this.svg.select('.x-axis').call(d3.axisBottom(this.xScale));
    this.svg.select('.y-axis').call(d3.axisLeft(this.yScale));
  }
}

export default IndexChart;
