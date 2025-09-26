var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// node_modules/unenv/dist/runtime/_internal/utils.mjs
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
__name(PerformanceEntry, "PerformanceEntry");
var PerformanceMark = /* @__PURE__ */ __name(class PerformanceMark2 extends PerformanceEntry {
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
}, "PerformanceMark");
var PerformanceMeasure = class extends PerformanceEntry {
  entryType = "measure";
};
__name(PerformanceMeasure, "PerformanceMeasure");
var PerformanceResourceTiming = class extends PerformanceEntry {
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
__name(PerformanceResourceTiming, "PerformanceResourceTiming");
var PerformanceObserverEntryList = class {
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
__name(PerformanceObserverEntryList, "PerformanceObserverEntryList");
var Performance = class {
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
__name(Performance, "Performance");
var PerformanceObserver = class {
  __unenv__ = true;
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
__name(PerformanceObserver, "PerformanceObserver");
__publicField(PerformanceObserver, "supportedEntryTypes", []);
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
import { Socket } from "node:net";
var ReadStream = class extends Socket {
  fd;
  constructor(fd) {
    super();
    this.fd = fd;
  }
  isRaw = false;
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
  isTTY = false;
};
__name(ReadStream, "ReadStream");

// node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
import { Socket as Socket2 } from "node:net";
var WriteStream = class extends Socket2 {
  fd;
  constructor(fd) {
    super();
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  columns = 80;
  rows = 24;
  isTTY = false;
};
__name(WriteStream, "WriteStream");

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class extends EventEmitter {
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return "";
  }
  get versions() {
    return {};
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  ref() {
  }
  unref() {
  }
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: () => 0 });
  mainModule = void 0;
  domain = void 0;
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};
__name(Process, "Process");

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var { exit, platform, nextTick } = getBuiltinModule(
  "node:process"
);
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  nextTick
});
var {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  finalization,
  features,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  on,
  off,
  once,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// src/index.ts
var src_default = {
  async fetch(request, env2, ctx) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Project-Id, X-Encrypted-Yw-ID, X-Is-Login, X-Yw-Env"
    };
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }
    try {
      const url = new URL(request.url);
      const path = url.pathname;
      const method = request.method;
      const encryptedYwId = request.headers.get("X-Encrypted-Yw-ID");
      const isLogin = request.headers.get("X-Is-Login") === "1";
      if (path === "/api/leads" && method === "POST") {
        return await createLead(request, env2, encryptedYwId);
      }
      if (path === "/api/leads" && method === "GET") {
        return await getLeads(request, env2);
      }
      if (path.startsWith("/api/leads/") && method === "PUT") {
        const leadId = path.split("/")[3];
        return await updateLeadStatus(request, env2, leadId);
      }
      if (path === "/api/analytics/track" && method === "POST") {
        return await trackEvent(request, env2);
      }
      if (path === "/api/analytics/dashboard" && method === "GET") {
        return await getAnalyticsDashboard(request, env2);
      }
      if (path === "/api/reviews" && method === "POST") {
        return await createReview(request, env2, encryptedYwId);
      }
      if (path === "/api/reviews" && method === "GET") {
        return await getReviews(request, env2);
      }
      if (path.startsWith("/api/reviews/") && path.endsWith("/approve") && method === "PUT") {
        const reviewId = path.split("/")[3];
        return await approveReview(request, env2, reviewId);
      }
      if (path === "/api/city-pages" && method === "GET") {
        return await getCityPages(request, env2);
      }
      if (path.startsWith("/api/city-pages/") && method === "GET") {
        const cityName = path.split("/")[3];
        return await getCityPage(request, env2, cityName);
      }
      if (path === "/api/campaigns" && method === "GET") {
        return await getCampaignData(request, env2);
      }
      return new Response("Not Found", { status: 404, headers: corsHeaders });
    } catch (error3) {
      console.error("API Error:", error3);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Internal server error",
          message: error3 instanceof Error ? error3.message : "Unknown error"
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }
  }
};
async function createLead(request, env2, encryptedYwId) {
  try {
    const leadData = await request.json();
    if (!leadData.name || !leadData.email) {
      return new Response(
        JSON.stringify({ success: false, error: "Name and email are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    let leadScore = 0;
    if (leadData.phone)
      leadScore += 20;
    if (leadData.insurance_provider)
      leadScore += 15;
    if (leadData.service_type)
      leadScore += 10;
    if (leadData.message && leadData.message.length > 50)
      leadScore += 15;
    if (leadData.utm_source === "google-ads")
      leadScore += 25;
    else if (leadData.utm_source === "organic")
      leadScore += 20;
    const stmt = env2.DB.prepare(`
      INSERT INTO leads (
        encrypted_yw_id, name, email, phone, service_type, 
        insurance_provider, preferred_contact, message, source,
        utm_campaign, utm_medium, utm_source, lead_score
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = await stmt.bind(
      encryptedYwId,
      leadData.name,
      leadData.email,
      leadData.phone || null,
      leadData.service_type || null,
      leadData.insurance_provider || null,
      leadData.preferred_contact || "email",
      leadData.message || null,
      leadData.source || "website",
      leadData.utm_campaign || null,
      leadData.utm_medium || null,
      leadData.utm_source || null,
      leadScore
    ).run();
    return new Response(
      JSON.stringify({
        success: true,
        leadId: result.meta.last_row_id,
        leadScore
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      }
    );
  } catch (error3) {
    console.error("Create lead error:", error3);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to create lead" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
__name(createLead, "createLead");
async function getLeads(request, env2) {
  try {
    const url = new URL(request.url);
    const status = url.searchParams.get("status") || "all";
    const limit = parseInt(url.searchParams.get("limit") || "50");
    const offset = parseInt(url.searchParams.get("offset") || "0");
    let query = `
      SELECT id, name, email, phone, service_type, insurance_provider,
             source, utm_campaign, utm_medium, utm_source, lead_score,
             status, created_at
      FROM leads
    `;
    const params = [];
    if (status !== "all") {
      query += " WHERE status = ?";
      params.push(status);
    }
    query += " ORDER BY lead_score DESC, created_at DESC LIMIT ? OFFSET ?";
    params.push(limit, offset);
    const stmt = env2.DB.prepare(query);
    const { results } = await stmt.bind(...params).all();
    return new Response(
      JSON.stringify({ success: true, leads: results }),
      { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error3) {
    console.error("Get leads error:", error3);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to fetch leads" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
__name(getLeads, "getLeads");
async function updateLeadStatus(request, env2, leadId) {
  try {
    const { status } = await request.json();
    if (!["new", "contacted", "qualified", "converted", "closed"].includes(status)) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid status" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const stmt = env2.DB.prepare(`
      UPDATE leads SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
    `);
    await stmt.bind(status, leadId).run();
    return new Response(
      JSON.stringify({ success: true }),
      { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error3) {
    console.error("Update lead status error:", error3);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to update lead status" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
__name(updateLeadStatus, "updateLeadStatus");
async function trackEvent(request, env2) {
  try {
    const eventData = await request.json();
    if (!eventData.event_type) {
      return new Response(
        JSON.stringify({ success: false, error: "Event type is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const userAgent = request.headers.get("User-Agent");
    const referrer = request.headers.get("Referer");
    const cfConnectingIp = request.headers.get("CF-Connecting-IP");
    const stmt = env2.DB.prepare(`
      INSERT INTO analytics_events (
        event_type, event_data, user_agent, ip_address, referrer,
        page_url, utm_campaign, utm_medium, utm_source
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    await stmt.bind(
      eventData.event_type,
      eventData.event_data ? JSON.stringify(eventData.event_data) : null,
      userAgent,
      cfConnectingIp,
      referrer,
      eventData.page_url || null,
      eventData.utm_campaign || null,
      eventData.utm_medium || null,
      eventData.utm_source || null
    ).run();
    return new Response(
      JSON.stringify({ success: true }),
      { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error3) {
    console.error("Track event error:", error3);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to track event" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
__name(trackEvent, "trackEvent");
async function getAnalyticsDashboard(request, env2) {
  try {
    const leadStatsStmt = env2.DB.prepare(`
      SELECT 
        COUNT(*) as total_leads,
        COUNT(CASE WHEN status = 'converted' THEN 1 END) as converted_leads,
        AVG(lead_score) as avg_lead_score,
        COUNT(CASE WHEN created_at >= date('now', '-7 days') THEN 1 END) as weekly_leads
      FROM leads
    `);
    const leadStats = await leadStatsStmt.first();
    const trafficStmt = env2.DB.prepare(`
      SELECT utm_source, COUNT(*) as count
      FROM analytics_events
      WHERE utm_source IS NOT NULL AND created_at >= date('now', '-30 days')
      GROUP BY utm_source
      ORDER BY count DESC
      LIMIT 10
    `);
    const { results: trafficSources } = await trafficStmt.all();
    const eventsStmt = env2.DB.prepare(`
      SELECT event_type, COUNT(*) as count
      FROM analytics_events
      WHERE created_at >= date('now', '-7 days')
      GROUP BY event_type
      ORDER BY count DESC
    `);
    const { results: eventTypes } = await eventsStmt.all();
    return new Response(
      JSON.stringify({
        success: true,
        dashboard: {
          leadStats,
          trafficSources,
          eventTypes,
          conversionRate: leadStats.converted_leads / (leadStats.total_leads || 1) * 100
        }
      }),
      { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error3) {
    console.error("Get analytics dashboard error:", error3);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to fetch analytics" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
__name(getAnalyticsDashboard, "getAnalyticsDashboard");
async function createReview(request, env2, encryptedYwId) {
  try {
    const reviewData = await request.json();
    if (!reviewData.patient_name || !reviewData.rating) {
      return new Response(
        JSON.stringify({ success: false, error: "Patient name and rating are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (reviewData.rating < 1 || reviewData.rating > 5) {
      return new Response(
        JSON.stringify({ success: false, error: "Rating must be between 1 and 5" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const stmt = env2.DB.prepare(`
      INSERT INTO reviews (
        encrypted_yw_id, patient_name, rating, review_text,
        service_type, treatment_date, verified
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    const result = await stmt.bind(
      encryptedYwId,
      reviewData.patient_name,
      reviewData.rating,
      reviewData.review_text || null,
      reviewData.service_type || null,
      reviewData.treatment_date || null,
      encryptedYwId ? 1 : 0
      // Mark as verified if user is logged in
    ).run();
    return new Response(
      JSON.stringify({
        success: true,
        reviewId: result.meta.last_row_id
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      }
    );
  } catch (error3) {
    console.error("Create review error:", error3);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to create review" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
__name(createReview, "createReview");
async function getReviews(request, env2) {
  try {
    const url = new URL(request.url);
    const approved = url.searchParams.get("approved") !== "false";
    const limit = parseInt(url.searchParams.get("limit") || "20");
    let query = `
      SELECT id, patient_name, rating, review_text, service_type,
             treatment_date, verified, approved, created_at
      FROM reviews
    `;
    if (approved) {
      query += " WHERE approved = 1";
    }
    query += " ORDER BY created_at DESC LIMIT ?";
    const stmt = env2.DB.prepare(query);
    const { results } = await stmt.bind(limit).all();
    return new Response(
      JSON.stringify({ success: true, reviews: results }),
      { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error3) {
    console.error("Get reviews error:", error3);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to fetch reviews" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
__name(getReviews, "getReviews");
async function approveReview(request, env2, reviewId) {
  try {
    const { approved } = await request.json();
    const stmt = env2.DB.prepare(`
      UPDATE reviews SET approved = ? WHERE id = ?
    `);
    await stmt.bind(approved ? 1 : 0, reviewId).run();
    return new Response(
      JSON.stringify({ success: true }),
      { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error3) {
    console.error("Approve review error:", error3);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to approve review" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
__name(approveReview, "approveReview");
async function getCityPages(request, env2) {
  try {
    const stmt = env2.DB.prepare(`
      SELECT city_name, state_code, page_title, meta_description,
             population, published, updated_at
      FROM city_pages
      WHERE published = 1
      ORDER BY city_name
    `);
    const { results } = await stmt.all();
    return new Response(
      JSON.stringify({ success: true, cityPages: results }),
      { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error3) {
    console.error("Get city pages error:", error3);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to fetch city pages" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
__name(getCityPages, "getCityPages");
async function getCityPage(request, env2, cityName) {
  try {
    const stmt = env2.DB.prepare(`
      SELECT * FROM city_pages WHERE city_name = ? AND published = 1
    `);
    const cityPage = await stmt.bind(cityName).first();
    if (!cityPage) {
      return new Response(
        JSON.stringify({ success: false, error: "City page not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(
      JSON.stringify({ success: true, cityPage }),
      { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error3) {
    console.error("Get city page error:", error3);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to fetch city page" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
__name(getCityPage, "getCityPage");
async function getCampaignData(request, env2) {
  try {
    const campaigns = {
      google_ads: {
        keywords: [
          { keyword: "find psychiatrist online north carolina", cpc: 4.25, quality_score: 8, impressions: 1250 },
          { keyword: "book appointment psychiatrist NC", cpc: 5.1, quality_score: 9, impressions: 980 },
          { keyword: "same day psychiatrist appointment", cpc: 6.75, quality_score: 7, impressions: 2100 },
          { keyword: "ADHD treatment online NC", cpc: 3.95, quality_score: 8, impressions: 1580 },
          { keyword: "telepsychiatry north carolina", cpc: 4.8, quality_score: 9, impressions: 890 },
          { keyword: "online psychiatrist raleigh", cpc: 5.25, quality_score: 8, impressions: 750 },
          { keyword: "psychiatrist near me NC", cpc: 4.15, quality_score: 7, impressions: 1920 },
          { keyword: "depression therapy online", cpc: 3.75, quality_score: 9, impressions: 1100 },
          { keyword: "anxiety help telehealth NC", cpc: 4.5, quality_score: 8, impressions: 860 }
        ],
        budget_recommendations: {
          high_intent: ["book appointment psychiatrist NC", "same day psychiatrist appointment"],
          location_based: ["online psychiatrist raleigh", "psychiatrist near me NC"],
          condition_specific: ["ADHD treatment online NC", "depression therapy online"],
          brand_building: ["telepsychiatry north carolina"]
        }
      }
    };
    return new Response(
      JSON.stringify({ success: true, campaigns }),
      { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error3) {
    console.error("Get campaign data error:", error3);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to fetch campaign data" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
__name(getCampaignData, "getCampaignData");
export {
  src_default as default
};
//# sourceMappingURL=index.js.map
