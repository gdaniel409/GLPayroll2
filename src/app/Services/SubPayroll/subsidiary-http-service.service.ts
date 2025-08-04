/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { APP_SETTINGS } from '../../app.settings';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { IHttp } from '../../Interfaces/IHttp';
import { IID } from '../../Interfaces/IID';
import { SignalRService } from '../SignalR/signal-rservice.service';
import { AuthenticationService } from '../Authentication/authentication.service';

@Injectable(
  {providedIn: 'root'}
)
export abstract class SubsidiaryHttpService<model extends IID> implements IHttp<model>{

  public http = inject(HttpClient);
  public appSettings = inject(APP_SETTINGS);
  public signalRService = inject(SignalRService);
  public authenticationservice = inject(AuthenticationService);

  public list: model[]=[];
  
  public abstract apiString: string;
  abstract downloaded: boolean;
 
  constructor() {
    this.signalRService.addReceiveMessageListener((token, apiString, action)=>
    {
    
     //message we sent
      if(token == this.authenticationservice.token){
        return;
      }
      else if(apiString == this.apiString){
        this.downloaded = false;
      }

    })
  }
  
  public getList(): Observable<model[]>{

    if (!this.downloaded) {
       
        const urlAddr : string = this.appSettings.getString(this.apiString + "list");
 
        return this.http.get<model[]>(urlAddr).pipe(
              map(data => {
    
               // const id = data[0].id;

              this.list = data;
              this.downloaded = true;
              return data;
    
            }),
            catchError(this.handleError)
          );

        
        }
        else {
           return of(this.list);
        }

  }

  getItem(id: Number): Observable<model> | undefined{

    if(this.downloaded)
        {
           const foundItem  = this.list.find(item=>item.id === id);
           return of(foundItem!);
    
        }
        else{
    
          const urlAddr : string = this.appSettings.getString(this.apiString + "list");
    
          return this.http.get<model[]>(urlAddr).pipe(
            map(data=>{
    
              this.list = data;
              this.downloaded = true;
    
              const foundItem  = data.find(item=>item.id === id);
              return foundItem!;
            }), catchError(this.handleError)
          )
    
         }

  }

  addItem(newItem: model): Observable<model> {

    const urlAddr : string = this.appSettings.getString(this.apiString + "additem");

    //************************************************************* */
    //For demo purposes only*******************************************
    //*************************************************************888 */
    if(this.list != undefined && this.list.length > 0){
    let largestValue = this.list.reduce((max, current) => (current.id! > max! ? current.id : max), this.list[0].id);
      newItem.id = ++largestValue!;
    }else{
      newItem.id = 1;
    }
    //************************************************************** */
    return this.http.post<model>(urlAddr, newItem).pipe(
          map(data => {
            this.list.push(data);
            this.signalRService.sendMessage(this.authenticationservice.token, this.apiString, "addItem");
            return data;
          }),
          catchError(this.handleError)
        );
  }

  updateItem(editItem: model): Observable<model> {
   
    const urlAddr : string = this.appSettings.getString(this.apiString + "updateitem");
    
    let newModel : Observable<model>;
          
    return this.http.post<model>(urlAddr, editItem).pipe(
          map((data)=>{
    
            const ndx = this.list.findIndex(item=>item.id === editItem.id);
            this.list.splice(ndx, 1, editItem);
            this.signalRService.sendMessage(this.authenticationservice.token, this.apiString, "updateItem");
            return data;
    
          }),
          catchError(this.handleError)
    );
  }
  
  refresh(): Observable<model[]> {

    this.downloaded = false;
    return this.getList();
    
  }

  deleteItem(id : number) :  Observable<model[]>{

    const urlAddr : string = this.appSettings.getString(this.apiString + "delete");
    
    let params = new HttpParams().set('id', id);
 
    return this.http.get<model[]>(urlAddr, {params: params}).pipe(
          map((data)=>{
    
            const ndx = this.list.findIndex(item=>item.id === id);
            this.list.splice(ndx, 1);
    
            return this.list;
    
          }),
          catchError(this.handleError)

        );

    
  }

  handleError(error: HttpErrorResponse) {
    let message = '';

    switch (error.status) {
      case 0:
        message = 'Client error';
        break;
      case HttpStatusCode.InternalServerError:
        message = 'Server error';
        break;
      case HttpStatusCode.BadRequest:
        message = 'Request error';
        break;
      default:
        message = 'Unknown error';
    }

    console.error(message, error.error);

    return throwError(() => error);
  }
}
