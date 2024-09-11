import IndexChart from './chart.js';
import * as d3 from 'd3';

class ChartManager {
  constructor(container) {
    this.container = container;
    this.charts = [];
    this.syncOptions = {};
  }

  addChart(data, userOptions) {
    const defaultOptions = {
      width: 800,
      height: 400,
      fillColor: 'steelblue',
      lineStrokeWidth: 2,
      radius: 5,
      syncZoom: true
    };
    const options = { ...defaultOptions, ...userOptions };
    const chart = new IndexChart(this.container, options);
    this.charts.push(chart);
    chart.updateChart(data);
    return chart;
  }

  connectCharts(charts, syncOptions = { syncZoom: true }) {
    this.syncOptions = syncOptions;

    const zoomHandler = d3.zoom().on('zoom', (event) => {
      charts.forEach(chart => {
        const newXScale = event.transform.rescaleX(chart.xScale);
        chart.svg.select('.x-axis').call(d3.axisBottom(newXScale));
        chart.svg.select('.line').attr('d', chart.line.x(d => newXScale(new Date(d.time))));
      });
    });

    if (syncOptions.syncZoom) {
      charts.forEach(chart => {
        chart.svg.call(zoomHandler);
      });
    }
  }

  updateAllCharts(newData) {
    this.charts.forEach(chart => {
      chart.updateChart(newData);
    });
  }

  resetCharts() {
    this.charts.forEach(chart => {
      d3.select(chart.container).select('svg').remove();
    });
    this.charts = [];
  }
}

export default ChartManager;
