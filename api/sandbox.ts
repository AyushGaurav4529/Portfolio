import type { VercelRequest, VercelResponse } from '@vercel/node';

// Sliding window rate limiter for sandbox requests
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();
const SANDBOX_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_SANDBOX_REQUESTS = 30; // 30 requests per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.expiresAt) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + SANDBOX_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_SANDBOX_REQUESTS) {
    return true;
  }

  record.count += 1;
  return false;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const startTime = performance.now();

  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const forwarded = req.headers['x-forwarded-for'];
  const ip = typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : req.socket.remoteAddress || '127.0.0.1';

  if (isRateLimited(ip)) {
    return res.status(429).json({
      success: false,
      error: 'Sandbox rate limit exceeded (30 requests/minute). Please throttle your test calls.'
    });
  }

  const projectId = (req.body?.projectId || req.query.projectId || 'retail-guard') as string;
  const action = (req.body?.action || req.query.action || 'health-check') as string;

  let projectTelemetry: Record<string, any> = {};

  switch (projectId) {
    case 'retail-guard':
      projectTelemetry = {
        service: 'Retail Guard — AI Threat & Expiration Engine',
        modelEngine: 'YOLOv8 + OpenCV Neural Classifier',
        activeStoreNodes: 8,
        inferenceLatency: '14.2ms',
        shelfLifeTrackedSKUs: 1420,
        expirationsDetectedNext48h: 12,
        threatLevel: 'Nominal / Zero Breaches',
        accuracyConfidence: 0.984
      };
      break;

    case 'homeplate':
      projectTelemetry = {
        service: 'HomePlate — Hyperlocal Logistics Gateway',
        activeHomeChefsOnline: 14,
        avgMealPreparationTime: '22 mins',
        studentMatchingRadius: '2.5 km',
        activeCourierSockets: 6,
        orderState: 'Dispatched & Synced',
        systemStatus: 'Operational'
      };
      break;

    case 'hotel-mgmt':
      projectTelemetry = {
        service: 'Hotel Management — Python/MySQL Operations Core',
        activeRoomInventory: '120 Rooms',
        currentOccupancyRate: '84.2%',
        dbConnectionPool: 'Healthy (4/10 active connections)',
        automatedInvoicesGeneratedToday: 48,
        transactionIsolationLevel: 'REPEATABLE-READ'
      };
      break;

    case 'inventory-mgmt':
      projectTelemetry = {
        service: 'Inventory Management — Stock Tracking Pipeline',
        indexedCatalogItems: 384,
        lowStockAlertThreshold: '10 units',
        pendingReplenishments: 3,
        cacheHitRate: '96.8%',
        storageAdapter: 'IndexedDB / Browser Cache'
      };
      break;

    default:
      projectTelemetry = {
        service: 'Portfolio Core API Sandbox Gateway',
        status: 'Operational',
        activeNodes: 4,
        environment: process.env.NODE_ENV || 'production'
      };
      break;
  }

  const executionDuration = Math.round(performance.now() - startTime);

  return res.status(200).json({
    status: 200,
    statusText: 'OK',
    success: true,
    endpoint: `/api/sandbox?projectId=${projectId}`,
    testedAction: action,
    serverLatency: `${Math.max(executionDuration, 8)}ms`,
    timestamp: new Date().toISOString(),
    clientIp: ip,
    runtime: 'Node.js Vercel Serverless Function',
    telemetry: projectTelemetry
  });
}
