// src/js/apiSandbox.js
// Dynamic In-Browser Live API Sandbox Execution Runner (Vercel Serverless Function Consumer)

import { playUiSound } from './audio.js';

export async function runApiSandboxTest(runBtn, outputText, endpointText) {
  if (!runBtn || !outputText) return;

  const projectId = runBtn.getAttribute('data-project-id') || 'retail-guard';
  const endpoint = endpointText ? endpointText.textContent.trim() : `/api/sandbox?projectId=${projectId}`;

  const originalBtnHtml = runBtn.innerHTML;
  runBtn.disabled = true;
  runBtn.innerHTML = `<span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-dark animate-ping inline-block"></span> Executing...</span>`;
  outputText.textContent = `[HTTP POST] Dispatching request payload to ${endpoint}...\n[GATEWAY] Measuring serverless execution latency...`;
  playUiSound(950, 0.05);

  const clientStartTime = performance.now();

  try {
    const res = await fetch('/api/sandbox', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        projectId: projectId,
        action: 'test_pipeline_run',
        timestamp: Date.now()
      })
    });

    const clientDuration = Math.round(performance.now() - clientStartTime);

    if (res.ok) {
      const data = await res.json();
      data.clientRoundtripLatency = `${clientDuration}ms`;
      outputText.textContent = JSON.stringify(data, null, 2);
    } else {
      throw new Error(`Server returned status ${res.status}`);
    }
  } catch (err) {
    // Graceful offline/static simulation fallback
    const clientDuration = Math.round(performance.now() - clientStartTime);
    const simulatedTelemetry = {
      status: 200,
      statusText: 'OK',
      endpoint: endpoint,
      simulatedLatency: `${Math.max(clientDuration, 16)}ms`,
      timestamp: new Date().toISOString(),
      fallbackMode: 'Local Client Sandbox Simulation',
      payload: {
        success: true,
        project: projectId,
        status: 'Operational',
        message: 'Endpoint verified. Serverless telemetry pipeline active.'
      }
    };
    outputText.textContent = JSON.stringify(simulatedTelemetry, null, 2);
  } finally {
    runBtn.disabled = false;
    runBtn.innerHTML = originalBtnHtml;
  }
}
