import express from 'express'

export function clientErrorHandler(error: string | { [key: string]: any }) {
  return {
    success: false,
    timestamp: new Date().toISOString(),
    ...(typeof error !== 'string' ? { ...error } : { error }),
  }
}
