import { Injectable } from '@angular/core';

@Injectable()
export class LoggerServiceProvider {

  public LOG_DEBUG: number = 1;
  public LOG_INFO: number = 2;
  public LOG_WARN: number = 3;
  public LOG_ERROR: number = 4;

  //Logging is set to ERROR level, change this if you want finer logging.
  private logLevel: number = this.LOG_DEBUG;

  constructor() { }

  setLogLevel = function (logLevel) {
    this.logLevel = logLevel;
  }

  getLogLevel = function () {
    return this.logLevel;
  }

  log(...message: any[]) {
    if (this.logLevel > this.LOG_INFO) return;
    if (message.length == 1)
      console.log(this.getCurrentTime() + " : ", message[0]);
    else
      console.log(this.getCurrentTime() + " : ", message);
  }

  error(...message: any[]) {
    if (this.logLevel > this.LOG_ERROR) return;
    if (message.length == 1)
      console.error(this.getCurrentTime() + " : ", message[0]);
    else
      console.error(this.getCurrentTime() + " : ", message);
  }

  debug(message: any) {
    if (this.logLevel > this.LOG_DEBUG) return;
    console.dir(this.getCurrentTime() + " : " + JSON.stringify(message));
  }

  warning(message: any) {
    if (this.logLevel > this.LOG_WARN) return;
    console.warn(this.getCurrentTime() + " : ", message);
  }

  getCurrentTime() {
    return new Date().toISOString().replace('T', " ").substr(0, 19);
  }
}
