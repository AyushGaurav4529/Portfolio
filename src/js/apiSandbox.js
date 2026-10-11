// src/js/apiSandbox.js
// Dynamic In-Browser Live API Sandbox Execution Runner

import { playUiSound } from './audio.js';

export function runApiSandboxTest(runBtn, outputText, endpointText) {
  if (!runBtn || !outputText) return;

  runBtn.innerHTML = `<span>Testing...</span>`;
  outputText.textContent = `[HTTP POST] Connecting to endpoint gateway...`;
  playUiSound(950, 0.05);

  setTimeout(() => {
    const sampleOutput = {
      status: 200,
      statusText: "OK",
      latency: "18ms",
      endpoint: endpointText ? endpointText.textContent.trim() : "/api/v1/process-request",
      timestamp: new Date().toISOString(),
      payload: {
        success: true,
        message: "API Pipeline executed successfully",
        threatLevelDetected: "Low / Normal",
        activeNodes: 4,
        serviceStatus: "Operational"
      }
    };
    outputText.textContent = JSON.stringify(sampleOutput, null, 2);
    runBtn.innerHTML = `<span>Test API</span>`;
  }, 500);
}
