import pino from 'pino';
import { LoggerAdapter } from '@shared/domain/adapter/logger.adapter';

export class PinoLoggerAdapter implements LoggerAdapter {
  private readonly logger: pino.Logger;

  constructor() {
    this.logger = pino();
  }

  log(message: any, ...optionalParams: any[]): void {
    this.call('info', message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]): void {
    this.call('warn', message, ...optionalParams);
  }

  verbose?(message: any, ...optionalParams: any[]): void {
    this.call('trace', message, ...optionalParams);
  }

  info(message: any, ...optionalParams: any[]) {
    this.log(message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    this.call('error', message, ...optionalParams);
  }

  debug(message: any, ...optionalParams: any[]) {
    this.call('debug', message, ...optionalParams);
  }

  private call(level: pino.Level, message: any, ...optionalParams: any[]) {
    const objArg: Record<string, any> = {};

    // optionalParams contains extra params passed to logger
    // context name is the last item
    let params: any[] = [];
    if (optionalParams.length !== 0) {
      objArg['context'] = optionalParams[optionalParams.length - 1];
      params = optionalParams.slice(0, -1);
    }

    if (typeof message === 'object') {
      if (message instanceof Error) {
        objArg.err = message;
      } else {
        Object.assign(objArg, message);
      }
      this.logger[level](objArg, ...params);
    } else if (this.isWrongExceptionsHandlerContract(level, message, params)) {
      objArg.err = new Error(message);
      objArg.err.stack = params[0];
      this.logger[level](objArg);
    } else {
      this.logger[level](objArg, message, ...params);
    }
  }

  private isWrongExceptionsHandlerContract(
    level: pino.Level,
    message: any,
    params: any[],
  ): params is [string] {
    return (
      level === 'error' &&
      typeof message === 'string' &&
      params.length === 1 &&
      typeof params[0] === 'string' &&
      /\n\s*at /.test(params[0])
    );
  }
}
