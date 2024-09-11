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
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = this.options.width || 800 - margin.left - margin.right;
    const height = this.options.height || 400 - margin.top - margin.bottom;

    this.svg = d3.select(this.container)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    this.xScale = d3.scaleTime().range([0, width]);
    this.yScale = d3.scaleLinear().range([height, 0]);

    this.line = d3.line()
      .x(d => this.xScale(new Date(d.time)))
      .y(d => this.yScale(d.value))
      .curve(d3.curveMonotoneX);

    this.svg.append('g').attr('class', 'x-axis').attr('transform', `translate(0,${height})`);
    this.svg.append('g').attr('class', 'y-axis');
  }

  updateChart(newData) {
    this.data = this.data.concat(newData);

    this.xScale.domain(d3.extent(this.data, d => new Date(d.time)));
    this.yScale.domain([0, d3.max(this.data, d => d.value)]);

    const path = this.svg.selectAll('.line')
      .data([this.data]);

    path.enter()
      .append('path')
      .attr('class', 'line')
      .merge(path)
      .attr('d', this.line)
      .style('fill', 'none')
      .style('stroke', this.options.fillColor || 'steelblue')
      .style('stroke-width', this.options.lineStrokeWidth || '2px');

    path.exit().remove();

    this.svg.select('.x-axis').call(d3.axisBottom(this.xScale));
    this.svg.select('.y-axis').call(d3.axisLeft(this.yScale));
  }
}

export default IndexChart;
