import IndexChart from './chart.js';
import * as d3 from 'd3';

class ChartManager {
  constructor(container) {
    this.container = container;
    this.charts = []; // Store multiple chart instances
    this.syncOptions = {};
  }

  // Add a new chart with user-defined options and data
  addChart(data, userOptions) {
    const defaultOptions = {
      width: 800,
      height: 400,
      fillColor: 'steelblue',
      lineStrokeWidth: 2,
      radius: 5,
      syncZoom: true
    };

    // Merge user-defined options with default options
    const options = { ...defaultOptions, ...userOptions };

    const chart = new IndexChart(this.container, options); // Create new IndexChart
    this.charts.push(chart); // Add the chart to the manager's list
    chart.updateChart(data); // Initial update with provided data
    return chart; // Return the chart instance for further customizations
  }

  // Connect charts to sync zooming and panning across multiple charts
  connectCharts(charts, syncOptions = { syncZoom: true }) {
    this.syncOptions = syncOptions;

    // Define a zoom handler that syncs zoom/pan across all charts
    const zoomHandler = d3.zoom().on('zoom', (event) => {
      charts.forEach(chart => {
        const svg = d3.select(chart.container).select('svg');
        svg.attr('transform', event.transform); // Apply zoom/pan to all connected charts
      });
    });

    // If syncZoom is enabled, attach the zoom handler to each chart
    if (syncOptions.syncZoom) {
      charts.forEach(chart => {
        const svg = d3.select(chart.container).select('svg');
        svg.call(zoomHandler); // Attach zoom behavior to each chart's SVG
      });
    }
  }

  // Update all charts with new data from WebSocket or any other source
  updateAllCharts(newData) {
    this.charts.forEach(chart => {
      chart.updateChart(newData); // Update each chart with the new incoming data
    });
  }

  // Reset all charts, useful when you want to clear the existing charts
  resetCharts() {
    this.charts.forEach(chart => {
      d3.select(chart.container).select('svg').remove(); // Remove the current SVG
    });
    this.charts = []; // Clear chart array
  }
}

export default ChartManager;
