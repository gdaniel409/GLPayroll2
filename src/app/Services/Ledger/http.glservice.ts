/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  Ledger HTTP service connects to a general ledger transaction API and creates
  GL Trxns.  It also authenticate users and returns an authentication token which
  will then be sent through a header to the the backend API
*/
import { Inject, Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserModel } from '../../Models/UserModel';
import { PostModel } from '../../Models/PostModel';
import { TrxnBatchModel } from '../../Models/TrxnsModel';
import { TrxnModel } from '../../Models/TrxnModel';
import { map, Observable } from 'rxjs';

import { APP_SETTINGS } from '../../app.settings';

@Injectable({
 
  providedIn: 'root',
     
  /*  */
})
export class LedgerHttpService {
  sessionKey: string | undefined;
  roles : string[] | undefined;

  constructor() {}   
 
  http = inject(HttpClient);
  private appSettings = inject(APP_SETTINGS)

  //authenticates user
  authenticateUser(username: string, password : string, 
    organizationID : number, applicationName : string) : Observable<UserModel>{

    let params = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('organizationID', organizationID.toString())
      .set('applicationName', applicationName);

      const host = this.appSettings.hostGLApi;
      const url = this.appSettings.authenticateUserEndPoint;
      const urlAddr = host + url;

     return this.http.get<UserModel>(urlAddr, {params: params}).pipe(map(usermodel=> 
        {
          this.sessionKey = usermodel.sessionKey;
          this.roles = usermodel.roles;
          
          return usermodel})
        );
    
  }
//getLockCount is used mainly for debugging the service layer and offline pessimistic lock
  getLockCount() : Observable<string>{

    let params = new HttpParams()
      .set('sessionKey', this.sessionKey!);

    let headers: HttpHeaders = new HttpHeaders({'tr-7': this.sessionKey!})

    const options = {
  
      headers: headers,
      params: params

    };

  //  let ep : string = this.appSettings.getLockCountEndPoint;

    //return this.http.get<string>(this.appSettings.getLockCountEndPoint,{headers}).pipe(map(key=>{return key}));
    
    const host = this.appSettings.hostGLApi;
    const url = this.appSettings.getLockCountEndPoint;
    const urlAddr = host + url;

    return this.http.get<string>(urlAddr, options).pipe(map(key=>{return key}));
  }

 //post transactions to the ledger
  post(postModel : PostModel) : Observable<Object> {

    const host = this.appSettings.hostGLApi;
    const url = this.appSettings.postEndPoint;
    const urlAddr = host + url;

    return this.http.post(urlAddr, postModel);

  }

 //journalize transactions
  journalizeTrxn(trxnModel : TrxnModel) : Observable<Object>{

    const host = this.appSettings.hostGLApi;
    const url = this.appSettings.trxnEndPoint;
    const urlAddr = host + url;

    return this.http.post(urlAddr, trxnModel);
  
  }
 
  //journalizes transactions in batches
  journalizeBatchTrxns(trxnBatch:TrxnBatchModel) : Observable<Object>{
 
    const host = this.appSettings.hostGLApi;
    const url = this.appSettings.trxnBatchEndPoint;
    const urlAddr = host + url;

    return this.http.post(this.appSettings.trxnBatchEndPoint, trxnBatch);
 
  }

}


