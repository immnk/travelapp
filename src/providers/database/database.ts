import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoggerServiceProvider } from '../../providers/logger-service/logger-service';

@Injectable()
export class DatabaseProvider {

  constructor(private db: AngularFireDatabase, private _logger: LoggerServiceProvider) {

  }

  getObjectData(key: string, _query: object = {}): Promise<any> {

    let promise = new Promise((resolve, reject) => {
      // this.db.object(key, _query)
      //   .subscribe((data) => {
      //     resolve(data);
      //   })
    });

    return promise;
  }

  updateData(key: string, data: object, force: boolean): Promise<any> {
    const itemObservable = this.db.object(key);
    let promise;

    if (force) {
      promise = itemObservable.set(data);
    } else {
      itemObservable.update(data);
    }

    return promise;
  }

  removeData(key: string): Promise<any> {
    return this.db.object(key).remove();
  }

  addDataToList(key: string, data: object): firebase.database.ThenableReference {
    const items = this.db.list(key);
    return items.push(data);
  }

  getListData(key: string, _query: object = {}): Promise<any> {
    this._logger.log("DatabaseProvider: getListData - start");
    this._logger.log("DatabaseProvider: getListData - inputs", key, _query);

    let promise = new Promise((resolve, reject) => {
      // this.db.list(key, _query)
      //   .subscribe((data) => {
      //     resolve(data);
      //   });
    });

    this._logger.log("DatabaseProvider: getListData - end");
    return promise;
  }

  getAsyncListData(key: string, _query: object = {}): any {
    this._logger.log("DatabaseProvider: inputs - ", key, _query);
    // return this.db.list(key, _query);
  }
}
