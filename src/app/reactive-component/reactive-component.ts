import { OnDestroy, Type } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import * as uuid from 'uuid/v4';

export abstract class ReactiveComponent implements OnDestroy {
  protected _ngOnDestroy: Observable<void>;
  protected _uuid: string;

  private _destroySubject: Subject<void>;
  private _subjectMap: Map<string, Subject<any>>;

  constructor() {
    this._uuid = uuid();
    this._destroySubject = new Subject();
    this._ngOnDestroy = this._destroySubject.asObservable();
  }

  ngOnDestroy(): void {
    if (this._destroySubject && this._destroySubject.observers.length > 0 && !this._destroySubject.closed) {
      this._destroySubject.next();
      this._destroySubject.complete();
    }
  }
}
