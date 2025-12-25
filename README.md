# Sunbay Node.js SDK

Official Node.js SDK for Sunbay Nexus Payment Platform

## Features

- ✅ Simple and intuitive API
- ✅ Support Node.js 18+
- ✅ Automatic authentication
- ✅ Automatic retry for GET requests
- ✅ Comprehensive exception handling
- ✅ Works with both JavaScript and TypeScript (compiled to JavaScript, includes type definitions)
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

> **Note**: This SDK is written in TypeScript but compiled to JavaScript. You can use it in both **JavaScript** and **TypeScript** projects without any compilation step. The SDK is already compiled and ready to use.

### 1. Initialize Client

The `NexusClient` is thread-safe and can be reused across multiple requests. Create once and reuse:

**JavaScript (CommonJS)**
```javascript
const { NexusClient } = require('@sunbay/sunbay-nexus-sdk');

// Create once and reuse
const client = new NexusClient({
  apiKey: process.env.SUNBAY_API_KEY || '{YOUR_API_KEY}',
  baseUrl: 'https://open.sunbay.us',
  connectTimeout: 30000,
  readTimeout: 60000,
  maxRetries: 3,
});

// Use the client throughout your application
```

**TypeScript / ES Modules**
```typescript
import { NexusClient } from '@sunbay/sunbay-nexus-sdk';

// Create once and reuse
const client = new NexusClient({
  apiKey: process.env.SUNBAY_API_KEY || '{YOUR_API_KEY}',
  baseUrl: 'https://open.sunbay.us',
  connectTimeout: 30000,
  readTimeout: 60000,
  maxRetries: 3,
});

// Use the client throughout your application
```

### 2. Sale Transaction

**JavaScript (CommonJS)**
```javascript
const {
  NexusClient,
  SunbayBusinessException,
  SunbayNetworkException,
} = require('@sunbay/sunbay-nexus-sdk');

// Assume client is already initialized
// const client = ... (from step 1)

// Set expiration time (optional)
const expireTime = new Date();
expireTime.setMinutes(expireTime.getMinutes() + 10);
const timeExpire = expireTime.toISOString();

// Build amount
const amount = {
  orderAmount: 100.00,
  pricingCurrency: 'USD',
};

// Build sale request
const request = {
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
  // If code reaches here, the transaction is successful (code = '0')
  console.log('Transaction ID:', response.transactionId);
  console.log('Reference Order ID:', response.referenceOrderId);
} catch (error) {
  if (error.name === 'SunbayNetworkException') {
    console.error('Network Error:', error.message);
    if (error.retryable) {
      console.log('This error is retryable');
    }
  } else if (error.name === 'SunbayBusinessException') {
    console.error('API Error:', error.code, error.message);
    if (error.traceId) {
      console.error('Trace ID:', error.traceId);
    }
  }
}
```

**TypeScript / ES Modules**
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
  // If code reaches here, the transaction is successful (code = '0')
  console.log('Transaction ID:', response.transactionId);
  console.log('Reference Order ID:', response.referenceOrderId);
} catch (error) {
  if (error.name === 'SunbayNetworkException') {
    console.error('Network Error:', error.message);
    if (error.retryable) {
      console.log('This error is retryable');
    }
  } else if (error.name === 'SunbayBusinessException') {
    console.error('API Error:', error.code, error.message);
    if (error.traceId) {
      console.error('Trace ID:', error.traceId);
    }
  }
}
```

### 3. Query Transaction

**JavaScript (CommonJS)**
```javascript
const { NexusClient, TransactionStatus, TransactionType } = require('@sunbay/sunbay-nexus-sdk');

// Query by transactionId
const request = {
  appId: 'app_123456',
  merchantId: 'mch_789012',
  transactionId: 'TXN20231119001',
};

const response = await client.query(request);
// Response fields are automatically converted to enum types
console.log('Transaction Status:', response.transactionStatus); // TransactionStatus enum (e.g., TransactionStatus.INITIAL)
console.log('Transaction Type:', response.transactionType);     // TransactionType enum (e.g., TransactionType.SALE)

// Use enum for comparison
if (response.transactionStatus === TransactionStatus.SUCCESS) {
  console.log('Transaction completed successfully');
}
```

**TypeScript / ES Modules**
```typescript
import { NexusClient, QueryRequest, TransactionStatus, TransactionType } from '@sunbay/sunbay-nexus-sdk';

// Query by transactionId
const request: QueryRequest = {
  appId: 'app_123456',
  merchantId: 'mch_789012',
  transactionId: 'TXN20231119001',
};

const response = await client.query(request);
// Response fields are automatically converted to enum types
console.log('Transaction Status:', response.transactionStatus); // TransactionStatus enum
console.log('Transaction Type:', response.transactionType);     // TransactionType enum

// Use enum for type-safe comparison
if (response.transactionStatus === TransactionStatus.SUCCESS) {
  console.log('Transaction completed successfully');
}
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

Check error type by `error.name` property:

**JavaScript (CommonJS)**
```javascript
try {
  const response = await client.sale(request);
  // Handle success
} catch (error) {
  if (error.name === 'SunbayNetworkException') {
    // Network exception (e.g., connection timeout, network error)
    console.error('Network Error:', error.message);
    if (error.retryable) {
      // Can retry
    }
  } else if (error.name === 'SunbayBusinessException') {
    // Business exception (e.g., insufficient funds, parameter error)
    console.error('API Error:', error.code, error.message);
    if (error.traceId) {
      console.error('Trace ID:', error.traceId);
    }
  }
}
```

**TypeScript / ES Modules**
```typescript
try {
  const response = await client.sale(request);
  // Handle success
} catch (error: any) {
  if (error.name === 'SunbayNetworkException') {
    // Network exception (e.g., connection timeout, network error)
    console.error('Network Error:', error.message);
    if (error.retryable) {
      // Can retry
    }
  } else if (error.name === 'SunbayBusinessException') {
    // Business exception (e.g., insufficient funds, parameter error)
    console.error('API Error:', error.code, error.message);
    if (error.traceId) {
      console.error('Trace ID:', error.traceId);
    }
  }
}
```

## Enums

The SDK provides enum types for better type safety. Response fields are automatically converted from API codes/strings to enum types.

### TransactionStatus

The `transactionStatus` field in query responses is automatically converted from API code (I, P, S, F, C) to `TransactionStatus` enum:

```typescript
import { TransactionStatus } from '@sunbay/sunbay-nexus-sdk';

// API returns code "I", SDK converts to TransactionStatus instance
const response = await client.query(request);
console.log(response.transactionStatus); // TransactionStatus.INITIAL instance

// Use for comparison
if (response.transactionStatus === TransactionStatus.SUCCESS) {
  // Transaction successful
}

// Get code directly from the instance
const code = response.transactionStatus.getCode(); // "S"

// Convert code to TransactionStatus
const status = TransactionStatus.fromCode('I'); // TransactionStatus.INITIAL
```

**Available TransactionStatus values:**
- `TransactionStatus.INITIAL` - Initial state (code: "I")
- `TransactionStatus.PROCESSING` - Transaction processing (code: "P")
- `TransactionStatus.SUCCESS` - Transaction successful (code: "S")
- `TransactionStatus.FAIL` - Transaction failed (code: "F")
- `TransactionStatus.CLOSED` - Transaction closed (code: "C")

> **Note**: API returns code (I, P, S, F, C), SDK automatically converts to TransactionStatus instance. Use `getCode()` to get the original code.

### Other Enums

Other enum fields in responses are also automatically converted:
- `transactionType`: `TransactionType` enum (SALE, AUTH, FORCED_AUTH, etc.)
- `entryMode`: `EntryMode` enum (MANUAL, SWIPE, CONTACT, etc.)
- `cardNetworkType`: `CardNetworkType` enum (CREDIT, DEBIT, EBT, etc.)
- `authenticationMethod`: `AuthenticationMethod` enum (NOT_AUTHENTICATED, PIN, etc.)

**Example:**
```typescript
import { TransactionType, EntryMode } from '@sunbay/sunbay-nexus-sdk';

const response = await client.query(request);

// Type-safe enum comparison
if (response.transactionType === TransactionType.SALE) {
  console.log('This is a sale transaction');
}

if (response.entryMode === EntryMode.CONTACTLESS) {
  console.log('Contactless payment');
}
```

## Configuration

```javascript
const client = new NexusClient({
  apiKey: 'sk_test_xxx',
  baseUrl: 'https://open.sunbay.us',  // Default: https://open.sunbay.us
  connectTimeout: 30000,               // Default: 30000ms (30 seconds)
  readTimeout: 60000,                   // Default: 60000ms (60 seconds)
  maxRetries: 3,                        // Default: 3 retries for GET requests
  maxTotal: 200,                        // Default: 200 (max total connections in pool)
  maxPerRoute: 20,                      // Default: 20 (max connections per route)
});
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
- **Custom Logger**: Pass winston, pino, or any logger instance with `debug`/`info`/`warn`/`error` methods to the `logger` option. Missing methods are automatically skipped.

**Example: use default console logger (no extra config)**

```javascript
const { NexusClient } = require('@sunbay/sunbay-nexus-sdk');

const client = new NexusClient({
  apiKey: process.env.SUNBAY_API_KEY || '{YOUR_API_KEY}',
}); // Logs will be printed by console.* automatically
```

**Example: use winston logger**

```javascript
const { NexusClient } = require('@sunbay/sunbay-nexus-sdk');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  transports: [new winston.transports.Console()],
});

const client = new NexusClient({
  apiKey: process.env.SUNBAY_API_KEY || '{YOUR_API_KEY}',
  logger: logger, // SDK will call logger.debug/info/warn/error
});
```

## Requirements

- **Node.js 18.0.0 or higher** (required)
- **TypeScript 5.3.0 or higher** (optional, only needed if your project uses TypeScript)

> **Important**: The SDK is already compiled to JavaScript. You don't need TypeScript to use this SDK. If you're using JavaScript, just install and use it directly. If you're using TypeScript in your project, you'll get full type definitions and IntelliSense support automatically.

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

