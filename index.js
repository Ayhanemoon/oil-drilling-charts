import WebSocketHandler from './test/webSocketHandler/index.js'; // Ensure this path is correct
import ChartManager from './src/chartManager.js';

// Initialize WebSocketHandler with the WebSocket URL
const webSocketURL = 'ws://localhost:3003';  // Ensure you're using the correct port
const wsHandler = new WebSocketHandler(webSocketURL);

// Set up the container for the charts
const container = document.getElementById('chartContainer');

// Initialize the ChartManager
const chartManager = new ChartManager(container);

// Add and set up charts as usual...
const chartOptions = { width: 600, height: 300, fillColor: 'red', syncZoom: true };
const chart1 = chartManager.addChart([], chartOptions);

// Synchronize charts and WebSocket data updates
chartManager.connectCharts([chart1], { syncZoom: true });

wsHandler.connect();
wsHandler.onData((data) => {
  const formattedData = data.map(d => ({
    time: d.time,        // Use the timestamp for the X-axis
    value: d.pressure    // Use the pressure for the Y-axis
  }));
  
  chartManager.updateAllCharts(formattedData);  // Update chart with new WebSocket data
});
