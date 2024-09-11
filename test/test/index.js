import WebSocketHandler from './webSocketHandler.js';
import ChartManager from '../../src/chartManager.js';

const wsHandler = new WebSocketHandler('ws://localhost:3000');
const chartContainer = document.getElementById('chartContainer');
const chartManager = new ChartManager(chartContainer);

// Connect WebSocket
wsHandler.connect();
wsHandler.onData((data) => {
  // Format WebSocket data
  const formattedData = Array.isArray(data) ? data : [data];
  const processedData = formattedData.map(d => ({
    time: d.time,
    value: d.pressure
  }));

  // Update all charts
  chartManager.updateAllCharts(processedData);
});

// Initialize Charts
const chart1 = chartManager.addChart([], { width: 600, height: 300, fillColor: 'red' });
const chart2 = chartManager.addChart([], { width: 700, height: 350, fillColor: 'green' });

// Synchronize charts for zoom/pan behavior
chartManager.connectCharts([chart1, chart2], { syncZoom: true });
