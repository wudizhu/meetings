import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let gifts = [
      {id: 1, name: 'iPad'},
      {id: 2, name: 'Nice Wok Pot'},
      {id: 3, name: 'Drawing Pen'},
      {id: 4, name: 'iPad Cover'}
    ];
    return {gifts};
  }
}
