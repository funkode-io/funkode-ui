/**
 * Counter Component Demo
 * 
 * This file demonstrates how to use the counter component
 */

import '../lib/components/counter-component.js';

document.addEventListener('DOMContentLoaded', () => {
  // Create a container for our demo
  const container = document.createElement('div');
  container.className = 'demo-container';
  
  // Add some instructions
  const instructions = document.createElement('div');
  instructions.innerHTML = `
    <h1>Counter Component Demo</h1>
    <p>This demonstrates the usage of our custom counter web component.</p>
    <p>The component below is a fully encapsulated web component with its own styling and functionality.</p>
  `;
  container.appendChild(instructions);
  
  // Add the counter component
  const counter = document.createElement('counter-component');
  container.appendChild(counter);
  
  // Add an event listener to demonstrate the custom events
  const eventDisplay = document.createElement('div');
  eventDisplay.className = 'event-display';
  eventDisplay.innerHTML = '<h3>Event Log:</h3><pre id="event-log"></pre>';
  container.appendChild(eventDisplay);
  
  const eventLog = eventDisplay.querySelector('#event-log');
  counter.addEventListener('count-changed', (event) => {
    const logEntry = document.createElement('div');
    logEntry.textContent = `Count changed: ${event.detail.count}`;
    eventLog.appendChild(logEntry);
    
    // Keep only the last 5 events
    while (eventLog.children.length > 5) {
      eventLog.removeChild(eventLog.firstChild);
    }
  });
  
  // Add some custom controls to demonstrate the API
  const apiControls = document.createElement('div');
  apiControls.className = 'api-controls';
  apiControls.innerHTML = `
    <h3>API Controls:</h3>
    <div>
      <label for="set-count">Set Count:</label>
      <input type="number" id="set-count" value="0">
      <button id="apply-count">Apply</button>
    </div>
  `;
  container.appendChild(apiControls);
  
  const setCountInput = apiControls.querySelector('#set-count');
  const applyCountButton = apiControls.querySelector('#apply-count');
  
  applyCountButton.addEventListener('click', () => {
    counter.count = setCountInput.value;
  });
  
  // Add some styling for the demo
  const style = document.createElement('style');
  style.textContent = `
    .demo-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      font-family: Arial, sans-serif;
    }
    
    .event-display {
      margin-top: 2rem;
      padding: 1rem;
      background-color: #f5f5f5;
      border-radius: 4px;
    }
    
    #event-log {
      height: 150px;
      overflow-y: auto;
      background-color: #333;
      color: #fff;
      padding: 0.5rem;
      border-radius: 4px;
    }
    
    .api-controls {
      margin-top: 2rem;
      padding: 1rem;
      background-color: #e9e9e9;
      border-radius: 4px;
    }
    
    .api-controls input {
      padding: 0.5rem;
      margin-right: 0.5rem;
    }
    
    .api-controls button {
      padding: 0.5rem 1rem;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .api-controls button:hover {
      background-color: #45a049;
    }
  `;
  document.head.appendChild(style);
  
  // Add the container to the document
  document.body.appendChild(container);
});
