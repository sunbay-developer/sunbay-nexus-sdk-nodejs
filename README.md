# Sunbay Node.js SDK

Official Node.js SDK for Sunbay Nexus Payment Platform

## Features

- ✅ Simple and intuitive API
- ✅ Builder pattern for easy request construction
- ✅ Support Node.js 14+
- ✅ Automatic authentication
- ✅ Automatic retry for GET requests
- ✅ Comprehensive exception handling
- ✅ TypeScript support with full type definitions
- ✅ Minimal dependencies
- ✅ Flexible logging support (console by default, compatible with winston/pino)

## Installation

```bash
npm install @sunbay/sunbay-nexus-sdk
```

or

```bash
yarn add @sunbay/sunbay-nexus-sdk
```

## Quick Start

### 1. Initialize Client

The `NexusClient` is thread-safe and can be reused across multiple requests. Create once and reuse:

**Option 1: Builder Pattern (Recommended)**

```typescript
import { NexusClient } from '@sunbay/sunbay-nexus-sdk';

// Create once and reuse
const client = new NexusClient.Builder()
  .apiKey(process.env.SUNBAY_API_KEY || '{YOUR_API_KEY}')
  .baseUrl('https://open.sunbay.us')
  .build();

// Use the client throughout your application
```

**Option 2: Config Object**

```typescript
import { NexusClient } from '@sunbay/sunbay-nexus-sdk';

const client = NexusClient.fromConfig({
  apiKey: process.env.SUNBAY_API_KEY || '{YOUR_API_KEY}',
  baseUrl: 'https://open.sunbay.us',
  connectTimeout: 30000,
  readTimeout: 60000,
  maxRetries: 3,
});
```

### 2. Sale Transaction

```typescript
import {
  NexusClient,
  SaleRequest,
  SaleAmount,
  SunbayBusinessException,
  SunbayNetworkException,
} from '@sunbay/sunbay-nexus-sdk';

// Assume client is already initialized
// const client = ... (from step 1)

// Set expiration time (optional)
const expireTime = new Date();
expireTime.setMinutes(expireTime.getMinutes() + 10);
const timeExpire = expireTime.toISOString();

// Build amount
const amount: SaleAmount = {
  orderAmount: 100.00,
  pricingCurrency: 'USD',
};

// Build sale request
const request: SaleRequest = {
  appId: 'app_123456',
  merchantId: 'mch_789012',
  referenceOrderId: 'ORDER20231119001',
  transactionRequestId: `PAY_REQ_${Date.now()}`,
  amount: amount,
  description: 'Product purchase',
  terminalSn: 'T1234567890',
  timeExpire: timeExpire,
};

// Execute transaction
try {
  const response = await client.sale(request);
  if (response.isSuccess && response.isSuccess()) {
    console.log('Transaction ID:', response.transactionId);
    console.log('Reference Order ID:', response.referenceOrderId);
  } else {
    console.log('Error:', response.msg);
    if (response.traceId) {
      console.log('Trace ID:', response.traceId);
    }
  }
} catch (error) {
  if (error instanceof SunbayNetworkException) {
    console.error('Network Error:', error.message);
    if (error.retryable) {
      console.log('This error is retryable');
    }
  } else if (error instanceof SunbayBusinessException) {
    console.error('API Error:', error.code, error.message);
    if (error.traceId) {
      console.error('Trace ID:', error.traceId);
    }
  }
}
```

### 3. Query Transaction

```typescript
import { NexusClient, QueryRequest } from '@sunbay/sunbay-nexus-sdk';

// Query by transactionId
const request: QueryRequest = {
  appId: 'app_123456',
  merchantId: 'mch_789012',
  transactionId: 'TXN20231119001',
};

const response = await client.query(request);
console.log('Transaction Status:', response.transactionStatus);
console.log('Transaction Type:', response.transactionType);
```

## API Methods

All request classes support object literal syntax. The SDK provides the following API methods:

### Transaction APIs

- `sale(request: SaleRequest): Promise<SaleResponse>` - Sale transaction
- `auth(request: AuthRequest): Promise<AuthResponse>` - Authorization (pre-auth)
- `forcedAuth(request: ForcedAuthRequest): Promise<ForcedAuthResponse>` - Forced authorization
- `incrementalAuth(request: IncrementalAuthRequest): Promise<IncrementalAuthResponse>` - Incremental authorization
- `postAuth(request: PostAuthRequest): Promise<PostAuthResponse>` - Post authorization (pre-auth completion)
- `refund(request: RefundRequest): Promise<RefundResponse>` - Refund
- `voidTransaction(request: VoidRequest): Promise<VoidResponse>` - Void transaction
- `abort(request: AbortRequest): Promise<AbortResponse>` - Abort transaction
- `tipAdjust(request: TipAdjustRequest): Promise<TipAdjustResponse>` - Tip adjust

### Query APIs

- `query(request: QueryRequest): Promise<QueryResponse>` - Query transaction

### Settlement APIs

- `batchClose(request: BatchCloseRequest): Promise<BatchCloseResponse>` - Batch close

## Exception Handling

The SDK throws two types of exceptions:

- **SunbayNetworkException**: Network-related errors (connection timeout, network error, etc.)
- **SunbayBusinessException**: Business logic errors (parameter validation, API business errors, etc.)

Always catch `SunbayNetworkException` before `SunbayBusinessException`:

```typescript
try {
  const response = await client.sale(request);
  // Handle success
} catch (error) {
  if (error instanceof SunbayNetworkException) {
    // Network exception (e.g., connection timeout, network error)
    console.error('Network Error:', error.message);
    if (error.retryable) {
      // Can retry
    }
  } else if (error instanceof SunbayBusinessException) {
    // Business exception (e.g., insufficient funds, parameter error)
    console.error('API Error:', error.code, error.message);
    if (error.traceId) {
      console.error('Trace ID:', error.traceId);
    }
  }
}
```

## Configuration

```typescript
const client = new NexusClient.Builder()
  .apiKey('sk_test_xxx')
  .baseUrl('https://open.sunbay.us')  // Default: https://open.sunbay.us
  .connectTimeout(30000)               // Default: 30000ms (30 seconds)
  .readTimeout(60000)                   // Default: 60000ms (60 seconds)
  .maxRetries(3)                        // Default: 3 retries for GET requests
  .maxTotal(200)                        // Default: 200 (max total connections in pool)
  .maxPerRoute(20)                      // Default: 20 (max connections per route)
  .build();
```

### Connection Pool Configuration

The SDK uses axios with HTTP Agent's connection pool to manage HTTP connections efficiently. You can configure:

- **maxTotal**: Maximum total connections in the connection pool across all routes (default: 200)
  - This is the total number of connections that can be open simultaneously across all hosts/routes
  - Example: If you have 10 different API endpoints, the total connections to all endpoints combined cannot exceed this value

- **maxPerRoute**: Maximum connections per route/host (default: 20)
  - This is the maximum number of connections that can be open to a single host/route
  - A route is typically defined by the scheme (http/https), host, and port
  - Example: For `https://open.sunbay.us`, you can have at most 20 concurrent connections

**Example:**
- If `maxTotal = 200` and `maxPerRoute = 20`
- You can have up to 20 connections to `https://open.sunbay.us` (limited by maxPerRoute)
- But if you're connecting to multiple hosts, the total across all hosts cannot exceed 200 (limited by maxTotal)

These settings help optimize performance for high-concurrency scenarios.

## Logging

- **Default**: SDK uses `console` for logging (zero dependencies). Logs include HTTP method, URL, headers (Authorization masked), request/response body, status codes, retries, and errors.
- **Custom Logger**: Pass winston, pino, or any logger instance with `debug`/`info`/`warn`/`error` methods to `NexusClient.Builder().logger(logger)` or `NexusClient.fromConfig({ logger })`. Missing methods are automatically skipped.

**Example: use default console logger (no extra config)**

```typescript
import { NexusClient } from '@sunbay/sunbay-nexus-sdk';

const client = new NexusClient.Builder()
  .apiKey(process.env.SUNBAY_API_KEY || '{YOUR_API_KEY}')
  .build(); // Logs will be printed by console.* automatically
```

**Example: use winston logger**

```typescript
import { NexusClient } from '@sunbay/sunbay-nexus-sdk';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  transports: [new winston.transports.Console()],
});

const client = new NexusClient.Builder()
  .apiKey(process.env.SUNBAY_API_KEY || '{YOUR_API_KEY}')
  .logger(logger) // SDK will call logger.debug/info/warn/error
  .build();
```

## Requirements

- Node.js 14.0.0 or higher
- TypeScript 5.3.0 or higher (optional, for TypeScript projects)

## Project Structure

```
src/
├── NexusClient.ts          # Main client class
├── client/
│   └── ClientConfig.ts     # Client configuration interface
├── http/
│   └── HttpClient.ts       # HTTP client implementation
├── models/                 # Data models (request/response/common)
├── constants/              # API constants
├── enums/                  # Enum types
├── exceptions/             # Exception classes
├── logger/                 # Logger interface and default implementation
│   └── Logger.ts          # Logger interface and default implementation
├── utils/                  # Utility functions
└── index.ts               # Main entry point
```

## License

MIT License

