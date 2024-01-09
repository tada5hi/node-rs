/* eslint-disable */
/* prettier-ignore */

/* auto-generated by NAPI-RS */

const __nodeFs= require('node:fs')
const __nodePath = require('node:path')
const { WASI: __nodeWASI } = require('node:wasi')
const { Worker } = require('node:worker_threads')

const { instantiateNapiModuleSync: __emnapiInstantiateNapiModuleSync } = require('@emnapi/core')
const { getDefaultContext: __emnapiGetDefaultContext } = require('@emnapi/runtime')

const __wasi = new __nodeWASI({
  version: 'preview1',
  env: process.env,
  preopens: {
    '/': '/',
  },
})

const __emnapiContext = __emnapiGetDefaultContext()

const __sharedMemory = new WebAssembly.Memory({
  initial: 1024,
  maximum: 10240,
  shared: true,
})

let __wasmFilePath = __nodePath.join(__dirname, 'xxhash.wasm32-wasi.wasm')

if (!__nodeFs.existsSync(__wasmFilePath)) {
  try {
    __wasmFilePath = __nodePath.resolve('@node-rs/xxhash-wasm32-wasi')
  } catch {
    throw new Error(
      'Cannot find xxhash.wasm32-wasi.wasm file, and @node-rs/xxhash-wasm32-wasi package is not installed.',
    )
  }
}

const {
  instance: __napiInstance,
  module: __wasiModule,
  napiModule: __napiModule,
} = __emnapiInstantiateNapiModuleSync(__nodeFs.readFileSync(__wasmFilePath), {
  context: __emnapiContext,
  asyncWorkPoolSize: (function () {
    const threadsSizeFromEnv = Number(process.env.NAPI_RS_ASYNC_WORK_POOL_SIZE ?? process.env.UV_THREADPOOL_SIZE)
    // NaN > 0 is false
    if (threadsSizeFromEnv > 0) {
      return threadsSizeFromEnv
    } else {
      return 4
    }
  })(),
  wasi: __wasi,
  onCreateWorker() {
    return new Worker(__nodePath.join(__dirname, 'wasi-worker.mjs'), {
      env: process.env,
      execArgv: ['--experimental-wasi-unstable-preview1'],
    })
  },
  overwriteImports(importObject) {
    importObject.env = {
      ...importObject.env,
      ...importObject.napi,
      ...importObject.emnapi,
      memory: __sharedMemory,
    }
    return importObject
  },
  beforeInit({ instance }) {
    __napi_rs_initialize_modules(instance)
  },
})

function __napi_rs_initialize_modules(__napiInstance) {
  __napiInstance.exports['__napi_register__xxh32_0']?.()
  __napiInstance.exports['__napi_register__Xxh32_struct_1']?.()
  __napiInstance.exports['__napi_register__Xxh32_impl_6']?.()
  __napiInstance.exports['__napi_register__xxh64_7']?.()
  __napiInstance.exports['__napi_register__Xxh64_struct_8']?.()
  __napiInstance.exports['__napi_register__Xxh64_impl_13']?.()
  __napiInstance.exports['__napi_register__xxh64_14']?.()
  __napiInstance.exports['__napi_register__xxh64_with_secret_15']?.()
  __napiInstance.exports['__napi_register__xxh128_16']?.()
  __napiInstance.exports['__napi_register__xxh128_with_secret_17']?.()
  __napiInstance.exports['__napi_register__Xxh3_struct_18']?.()
  __napiInstance.exports['__napi_register__Xxh3_impl_24']?.()
}
module.exports.Xxh32 = __napiModule.exports.Xxh32
module.exports.Xxh64 = __napiModule.exports.Xxh64
module.exports.xxh32 = __napiModule.exports.xxh32
module.exports.xxh64 = __napiModule.exports.xxh64
module.exports.xxh3 = __napiModule.exports.xxh3
