import { environment } from 'app/../environments/environment';

export class Logger {
  log(...args) {
    if (!environment.production) {
      console.log.apply(console, args);
    }
  }
}
