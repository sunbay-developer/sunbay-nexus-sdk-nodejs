# Sunbay Nexus SDK for Node.js 设计文档

## 1. 项目概述

### 1.1 项目背景

本项目旨在为 Sunbay Nexus 支付平台开发一个适用于 Node.js 平台的官方 SDK，提供与 Java SDK 相同的功能接口，方便 Node.js 开发者快速集成支付服务。

### 1.2 设计目标

- **专业性**：参考 AWS、Stripe、阿里云等主流平台的 SDK 设计，确保代码质量和架构设计达到业界标准
- **兼容性**：支持 Node.js 主流 LTS 版本（Node.js 14.x, 16.x, 18.x, 20.x），确保在不同环境下的稳定运行
- **易用性**：提供简洁直观的 API，符合 Node.js 开发者的使用习惯
- **可维护性**：采用模块化设计，代码结构清晰，便于扩展和维护
- **可发布性**：遵循 npm 包发布规范，支持发布到 npm 官方仓库

### 1.3 参考项目

- **Java SDK**：`/Users/sm4300/Documents/sunbay/sunbay-nexus-sdk-java`
- **主流 SDK 参考**：
  - AWS SDK for JavaScript v3
  - Stripe Node.js SDK
  - 阿里云 Node.js SDK

## 2. 技术选型

### 2.1 编程语言

- **TypeScript**：提供类型安全、更好的 IDE 支持和代码提示
- **编译目标**：ES2020（Node.js 14+ 支持）
- **模块系统**：CommonJS（兼容性）和 ES Modules（现代标准）

### 2.2 核心依赖

| 依赖 | 版本 | 用途 | 说明 |
|------|------|------|------|
| `axios` | ^1.6.0 | HTTP 客户端 | 支持请求拦截、自动重试、连接池 |
| `typescript` | ^5.3.0 | 类型系统 | 开发依赖，编译为 JavaScript |
| `@types/node` | ^20.x | Node.js 类型定义 | 开发依赖 |

### 2.3 开发工具

| 工具 | 版本 | 用途 |
|------|------|------|
| `jest` | ^29.7.0 | 测试框架 |
| `@types/jest` | ^29.5.0 | Jest 类型定义 |
| `axios-mock-adapter` | ^1.22.0 | HTTP Mock 工具（用于测试） |

### 2.4 Node.js 版本支持

- **最低版本**：Node.js 14.0.0
- **推荐版本**：Node.js 18.x LTS 或更高
- **测试覆盖**：14.x, 16.x, 18.x, 20.x

## 3. 项目结构

```
sunbay-nexus-sdk-nodejs/
├── src/                          # 源代码目录
│   ├── index.ts                  # 主入口文件，导出所有公共 API
│   ├── NexusClient.ts            # 主客户端类
│   ├── client/                   # 客户端配置
│   │   └── ClientConfig.ts       # 客户端配置接口
│   ├── http/                     # HTTP 请求封装
│   │   └── HttpClient.ts         # HTTP 客户端实现
│   ├── models/                   # 数据模型
│   │   ├── common/               # 通用模型
│   │   │   ├── BaseResponse.ts
│   │   │   ├── Amount.ts
│   │   │   ├── SaleAmount.ts
│   │   │   ├── AuthAmount.ts
│   │   │   ├── RefundAmount.ts
│   │   │   ├── PostAuthAmount.ts
│   │   │   ├── BatchTotalAmount.ts
│   │   │   └── PaymentMethodInfo.ts
│   │   ├── request/              # 请求模型
│   │   │   ├── SaleRequest.ts
│   │   │   ├── AuthRequest.ts
│   │   │   ├── ForcedAuthRequest.ts
│   │   │   ├── IncrementalAuthRequest.ts
│   │   │   ├── PostAuthRequest.ts
│   │   │   ├── RefundRequest.ts
│   │   │   ├── VoidRequest.ts
│   │   │   ├── AbortRequest.ts
│   │   │   ├── TipAdjustRequest.ts
│   │   │   ├── QueryRequest.ts
│   │   │   └── BatchCloseRequest.ts
│   │   └── response/             # 响应模型
│   │       ├── SaleResponse.ts
│   │       ├── AuthResponse.ts
│   │       ├── ForcedAuthResponse.ts
│   │       ├── IncrementalAuthResponse.ts
│   │       ├── PostAuthResponse.ts
│   │       ├── RefundResponse.ts
│   │       ├── VoidResponse.ts
│   │       ├── AbortResponse.ts
│   │       ├── TipAdjustResponse.ts
│   │       ├── QueryResponse.ts
│   │       └── BatchCloseResponse.ts
│   ├── constants/                # 常量定义
│   │   └── ApiConstants.ts
│   ├── enums/                    # 枚举类型
│   │   ├── TransactionStatus.ts
│   │   ├── TransactionType.ts
│   │   ├── EntryMode.ts
│   │   ├── CardNetworkType.ts
│   │   ├── PaymentCategory.ts
│   │   └── AuthenticationMethod.ts
│   ├── exceptions/               # 异常类
│   │   ├── SunbayBusinessException.ts
│   │   └── SunbayNetworkException.ts
│   ├── logger/                   # 日志接口和默认实现
│   │   └── Logger.ts
│   └── utils/                    # 工具函数
│       ├── IdGenerator.ts
│       ├── UserAgentUtil.ts
│       └── JsonUtil.ts
├── lib/                          # 编译后的 JavaScript 文件（不提交到 Git）
├── tests/                        # 测试文件（不提交到 Git 和 npm）
│   └── NexusClient.test.ts       # NexusClient 测试
├── package.json                  # 项目配置
├── tsconfig.json                 # TypeScript 配置
├── tsconfig.build.json           # 构建配置
├── jest.config.js                # Jest 配置
├── .npmignore                    # npm 发布忽略文件
├── .gitignore                    # Git 忽略文件
├── README.md                      # 项目说明
├── LICENSE                       # 许可证
└── DESIGN.md                     # 本文档
```

## 4. 架构设计

### 4.1 核心架构

```
┌─────────────────────────────────────────┐
│         Application Layer               │
│  (User's Application Code)              │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         NexusClient                     │
│  - sale()                               │
│  - auth()                               │
│  - refund()                             │
│  - query()                              │
│  - ...                                  │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         HttpClient                      │
│  - post()                               │
│  - get()                                │
│  - 请求拦截器                           │
│  - 响应拦截器                           │
│  - 自动重试                             │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         Axios (HTTP Client)             │
│  - 连接池管理                           │
│  - 请求/响应处理                        │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         Sunbay API Server               │
└─────────────────────────────────────────┘
```

### 4.2 设计模式

#### 4.2.1 Builder 模式

客户端配置使用 Builder 模式，提供链式调用：

```typescript
const client = new NexusClient.Builder()
  .apiKey('sk_test_xxx')
  .baseUrl('https://open.sunbay.us')
  .connectTimeout(30000)
  .readTimeout(60000)
  .maxRetries(3)
  .build();
```

#### 4.2.2 配置对象模式

提供配置对象方式初始化客户端：

```typescript
const client = NexusClient.fromConfig({
  apiKey: 'sk_test_xxx',
  baseUrl: 'https://open.sunbay.us',
  connectTimeout: 30000,
  readTimeout: 60000
});
```

#### 4.2.3 策略模式

HTTP 请求重试策略、错误处理策略等。

## 5. API 设计

### 5.1 客户端初始化

#### 方式一：Builder 模式（推荐）

```typescript
import { NexusClient } from '@sunmi/sunbay-nexus-sdk';

const client = new NexusClient.Builder()
  .apiKey(process.env.SUNBAY_API_KEY)
  .baseUrl('https://open.sunbay.us')  // 可选，默认值
  .connectTimeout(30000)               // 可选，默认 30000ms
  .readTimeout(60000)                  // 可选，默认 60000ms
  .maxRetries(3)                       // 可选，默认 3（仅 GET 请求）
  .build();
```

#### 方式二：配置对象

```typescript
import { NexusClient } from '@sunmi/sunbay-nexus-sdk';

const client = NexusClient.fromConfig({
  apiKey: process.env.SUNBAY_API_KEY,
  baseUrl: 'https://open.sunbay.us',
  connectTimeout: 30000,
  readTimeout: 60000,
  maxRetries: 3
});
```

### 5.2 API 方法设计

所有 API 方法都返回 Promise，支持 async/await：

```typescript
// Sale 交易
async function createSale() {
  const request: SaleRequest = {
    appId: 'app_123456',
    merchantId: 'mch_789012',
    referenceOrderId: 'ORDER20231119001',
    transactionRequestId: `PAY_REQ_${Date.now()}`,
    amount: {
      orderAmount: 100.00,
      pricingCurrency: 'USD'
    },
    description: 'Product purchase',
    terminalSn: 'T1234567890'
  };

  try {
    const response = await client.sale(request);
    if (response.isSuccess()) {
      console.log('Transaction ID:', response.transactionId);
    }
  } catch (error) {
    if (error instanceof SunbayBusinessException) {
      console.error('Business Error:', error.code, error.message);
    } else if (error instanceof SunbayNetworkException) {
      console.error('Network Error:', error.message);
    }
  }
}
```

### 5.3 支持的 API 方法

与 Java SDK 保持一致：

#### 交易 API
- `sale(request: SaleRequest): Promise<SaleResponse>`
- `auth(request: AuthRequest): Promise<AuthResponse>`
- `forcedAuth(request: ForcedAuthRequest): Promise<ForcedAuthResponse>`
- `incrementalAuth(request: IncrementalAuthRequest): Promise<IncrementalAuthResponse>`
- `postAuth(request: PostAuthRequest): Promise<PostAuthResponse>`
- `refund(request: RefundRequest): Promise<RefundResponse>`
- `voidTransaction(request: VoidRequest): Promise<VoidResponse>`
- `abort(request: AbortRequest): Promise<AbortResponse>`
- `tipAdjust(request: TipAdjustRequest): Promise<TipAdjustResponse>`

#### 查询 API
- `query(request: QueryRequest): Promise<QueryResponse>`

#### 结算 API
- `batchClose(request: BatchCloseRequest): Promise<BatchCloseResponse>`

## 6. 数据模型设计

### 6.1 请求模型

所有请求模型使用 TypeScript 接口定义，支持可选字段：

```typescript
export interface SaleRequest {
  appId: string;
  merchantId: string;
  referenceOrderId: string;
  transactionRequestId: string;
  amount: SaleAmount;
  paymentMethod?: PaymentMethodInfo;
  description: string;
  terminalSn: string;
  attach?: string;
  notifyUrl?: string;
  timeExpire?: string;
}
```

### 6.2 响应模型

所有响应模型继承自 `BaseResponse`：

```typescript
export interface BaseResponse {
  code: string;
  msg: string;
  traceId?: string;
  isSuccess(): boolean;
}

export interface SaleResponse extends BaseResponse {
  transactionId?: string;
  referenceOrderId?: string;
  transactionRequestId?: string;
  // ... 其他字段
}
```

### 6.3 枚举类型

使用 TypeScript 枚举：

```typescript
export enum TransactionStatus {
  INITIAL = 'INITIAL',
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
  CLOSED = 'CLOSED',
}
```

## 7. 错误处理

### 7.1 异常类型

#### SunbayBusinessException

业务异常，包含错误码和 traceId：

```typescript
export class SunbayBusinessException extends Error {
  public readonly code: string;
  public readonly traceId?: string;

  constructor(code: string, message: string, traceId?: string) {
    super(message);
    this.name = 'SunbayBusinessException';
    this.code = code;
    this.traceId = traceId;
  }
}
```

#### SunbayNetworkException

网络异常，包含重试标识：

```typescript
export class SunbayNetworkException extends Error {
  public readonly retryable: boolean;

  constructor(message: string, cause?: Error, retryable: boolean = false) {
    super(message);
    this.name = 'SunbayNetworkException';
    this.retryable = retryable;
    if (cause) {
      this.cause = cause;
    }
  }
}
```

### 7.2 错误处理示例

```typescript
try {
  const response = await client.sale(request);
  // 处理成功响应
} catch (error) {
  if (error instanceof SunbayBusinessException) {
    // 业务错误（参数错误、业务逻辑错误等）
    console.error(`Business Error [${error.code}]: ${error.message}`);
    if (error.traceId) {
      console.error(`Trace ID: ${error.traceId}`);
    }
  } else if (error instanceof SunbayNetworkException) {
    // 网络错误（连接超时、网络错误等）
    console.error(`Network Error: ${error.message}`);
    if (error.retryable) {
      // 可以重试
      console.log('This error is retryable');
    }
  } else {
    // 其他未知错误
    console.error('Unknown error:', error);
  }
}
```

## 8. HTTP 客户端设计

### 8.1 请求拦截器

HttpClient 使用 axios 的请求拦截器自动添加请求头：
- `Authorization: Bearer {apiKey}`
- `X-Client-Request-Id: {uuid}`
- `X-Timestamp: {timestamp}`
- `User-Agent: SunbayNexusSDK-Node.js/{version} Node.js/{version} {OS}/{version}`
- `Content-Type: application/json` (POST 请求)

### 8.2 响应处理

- 解析响应 JSON
- 处理 `data` 字段（API 返回格式：`{code, msg, data, traceId}`）
- 检查响应状态码
- 转换业务异常
- 自动添加 `isSuccess()` 方法到响应对象

### 8.3 自动重试

- **仅对 GET 请求自动重试**（与 Java SDK 保持一致）
- 默认重试 3 次
- 指数退避策略：`delay = baseDelay * attempt`
- 仅对可重试的网络错误进行重试

### 8.4 连接池配置

使用 axios 的 HTTP Agent 配置连接池：

```typescript
import https from 'https';

const agent = new https.Agent({
  keepAlive: true,
  maxSockets: 200,        // 最大连接数
  maxFreeSockets: 20,     // 每个路由的最大空闲连接数
  timeout: 30000
});
```

## 9. 类型定义

### 9.1 TypeScript 类型

- 所有公共 API 提供完整的 TypeScript 类型定义
- 使用接口（Interface）而非类型别名（Type Alias）以提高可扩展性
- 导出所有类型，方便用户使用

### 9.2 类型导出

```typescript
// index.ts
export { NexusClient } from './NexusClient';
export type { ClientConfig } from './client/ClientConfig';

export type { SaleRequest } from './models/request/SaleRequest';
export type { SaleResponse } from './models/response/SaleResponse';
// ... 其他类型

export { SunbayBusinessException } from './exceptions/SunbayBusinessException';
export { SunbayNetworkException } from './exceptions/SunbayNetworkException';

export { TransactionStatus } from './enums/TransactionStatus';
// ... 其他枚举
```

## 10. 测试策略

### 10.1 单元测试

- **测试框架**：Jest
- **测试方式**：直接调用真实 API（不使用 Mock）
- **测试内容**：
  - NexusClient 的 `sale` 和 `query` 接口
  - Builder 模式初始化
  - 配置对象初始化
  - 成功场景测试
  - 错误处理测试（业务异常、网络异常）

### 10.2 测试文件

- `tests/NexusClient.test.ts` - NexusClient 接口测试
- 测试文件不提交到 GitHub 和 npm，仅用于本地开发测试

## 11. 构建与发布

### 11.1 构建配置

#### TypeScript 配置

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "declaration": true,
    "declarationMap": true,
    "outDir": "./lib",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "tests", "lib"]
}
```

#### package.json 配置

```json
{
  "name": "@sunmi/sunbay-nexus-sdk",
  "version": "1.0.0",
  "description": "Official Node.js SDK for Sunbay Nexus Payment Platform",
  "main": "lib/index.js",
  "types": "lib/index.d.ts",
  "files": [
    "lib",
    "README.md",
    "LICENSE"
  ],
  "scripts": {
    "build": "tsc -p tsconfig.build.json",
    "test": "jest",
    "test:coverage": "jest --coverage"
  },
  "keywords": [
    "sunbay",
    "nexus",
    "payment",
    "sdk",
    "nodejs"
  ],
  "engines": {
    "node": ">=14.0.0"
  }
}
```

### 11.2 发布流程

#### 1. 版本管理

遵循语义化版本控制（SemVer）：
- **MAJOR**：不兼容的 API 变更
- **MINOR**：向下兼容的新功能
- **PATCH**：向下兼容的 bug 修复

#### 2. 发布前检查清单

- [ ] 所有测试通过
- [ ] 代码覆盖率达标
- [ ] 更新版本号
- [ ] 构建成功
- [ ] 类型定义正确生成

#### 3. 发布到 npm

```bash
# 1. 登录 npm
npm login

# 2. 构建项目
npm run build

# 3. 运行测试
npm test

# 4. 发布（自动执行 prepublishOnly 钩子）
npm publish --access public
```

#### 4. 发布后验证

- [ ] 在 npm 官网验证包已发布
- [ ] 测试安装：`npm install @sunmi/sunbay-nexus-sdk`
- [ ] 验证类型定义可用

## 12. 文档要求

### 12.1 README.md

包含以下内容：
- 项目介绍
- 安装说明
- 快速开始
- 错误处理
- 配置说明
- 常见问题
- 许可证信息

## 13. 兼容性设计

### 13.1 与 Java SDK 的兼容性

- **API 方法名**：保持一致
- **请求/响应模型**：字段名保持一致
- **错误处理**：异常类型和错误码保持一致
- **配置项**：配置参数保持一致

### 13.2 Node.js 版本兼容性

- 使用 ES2020 特性（Node.js 14+ 支持）
- 避免使用实验性特性
- 测试覆盖主要 LTS 版本

### 13.3 模块系统兼容性

- **主入口**：CommonJS（`main` 字段）
- **ES Modules**：提供 `module` 字段（可选）
- **TypeScript**：提供完整的类型定义

## 14. 安全性考虑

### 14.1 API Key 管理

- **不硬编码**：建议使用环境变量
- **不提交到 Git**：使用 `.gitignore` 和 `.npmignore`
- **文档提醒**：在 README 中强调安全性

### 14.2 请求安全

- **HTTPS 强制**：仅支持 HTTPS
- **请求签名**：如需签名，在请求拦截器中实现
- **敏感信息脱敏**：日志中脱敏 API Key（Authorization header 仅显示前 4 位和后 4 位）

### 14.3 依赖安全

- 定期更新依赖
- 使用 `npm audit` 检查安全漏洞

## 15. 性能优化

### 15.1 HTTP 连接池

- 复用 HTTP 连接
- 配置合理的连接池大小
- 使用 keep-alive

### 15.2 请求优化

- 避免不必要的序列化/反序列化
- 使用流式处理（如需要）
- 压缩请求/响应（如需要）

### 15.3 内存管理

- 及时释放资源
- 避免内存泄漏
- 使用 WeakMap/WeakSet（如适用）

## 16. 开发规范

### 16.1 代码风格

- TypeScript 严格模式
- 遵循 TypeScript 官方编码规范
- 保持代码简洁清晰

### 16.2 提交规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/)：

```
feat: add sale transaction API
fix: handle network timeout correctly
docs: update README with examples
refactor: simplify HTTP client
test: add unit tests for client
```

### 16.3 代码审查

- 所有代码变更需要 Code Review
- 确保测试覆盖
- 确保文档更新

## 17. 后续扩展

### 17.1 功能扩展

- Webhook 验证
- 请求签名（如需要）
- 更多支付方式支持
- 批量操作 API

### 17.2 平台扩展

- 浏览器环境支持（如需要）
- Deno 支持（如需要）
- Bun 支持（如需要）

## 18. 时间计划

### 阶段一：基础架构（1-2 周）
- 项目初始化
- 核心架构搭建
- HTTP 客户端实现
- 基础模型定义

### 阶段二：API 实现（2-3 周）
- 实现所有交易 API
- 实现查询 API
- 实现结算 API
- 错误处理完善

### 阶段三：测试与文档（1-2 周）
- 单元测试编写
- 集成测试编写
- README 文档编写

### 阶段四：发布准备（1 周）
- npm 发布配置
- 最终测试
- 正式发布

## 19. 参考资源

### 19.1 官方文档

- [Node.js 官方文档](https://nodejs.org/docs/)
- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
- [npm 发布指南](https://docs.npmjs.com/packages/publishing-a-package)

### 19.2 SDK 参考

- [AWS SDK for JavaScript v3](https://github.com/aws/aws-sdk-js-v3)
- [Stripe Node.js SDK](https://github.com/stripe/stripe-node)
- [阿里云 Node.js SDK](https://github.com/aliyun/alibabacloud-sdk-nodejs)

### 19.3 最佳实践

- [Node.js 最佳实践](https://github.com/goldbergyoni/nodebestpractices)
- [TypeScript 最佳实践](https://github.com/30-seconds/30-seconds-of-typescript)
- [npm 包最佳实践](https://github.com/sindresorhus/awesome-npm)

## 20. 总结

本设计文档基于 Java SDK 的实现，参考了 AWS、Stripe、阿里云等主流平台的 SDK 设计，旨在创建一个专业、易用、兼容性强的 Node.js SDK。

关键设计要点：
1. **TypeScript 类型安全**：提供完整的类型定义
2. **异步优先**：所有 API 返回 Promise，支持 async/await
3. **错误处理完善**：区分业务异常和网络异常
4. **自动重试机制**：仅对 GET 请求自动重试
5. **连接池优化**：提升性能
6. **模块化设计**：便于维护和扩展
7. **完整的文档**：提供详细的 README 使用文档

通过遵循本设计文档，可以确保 SDK 的质量和专业性，满足 Node.js 开发者的需求。

---

**文档版本**：1.0.0  
**最后更新**：2025-01-XX  
**维护者**：Sunbay SDK Team

