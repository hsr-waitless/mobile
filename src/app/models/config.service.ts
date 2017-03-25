import { Observable } from 'rxjs/Observable';

export abstract class ConfigService {
  abstract set(key: string, value: string): Promise<void>;
  abstract get(key: string): Observable<string>;
}
