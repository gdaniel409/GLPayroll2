import { inject, Injectable } from '@angular/core';
//import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

import * as signalR from '@microsoft/signalr';
import { APP_SETTINGS } from '../../app.settings';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

 
  private hubConnection!: signalR.HubConnection;
  private appSettings = inject(APP_SETTINGS);

  constructor() {

    //TODO: enable this for real-time updates
   // this.startConnection();
    
   }

  private startConnection(): void {

    let url : string = this.appSettings.hostSubApi + 'glpayrollHub';

    this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(url) // Match the URL mapped in your backend
            .withAutomaticReconnect()
            .build();

    this.hubConnection.start()
            .then(() => console.log('SignalR connection started'))
            .catch(err => console.error('Error while starting SignalR connection: ' + err));

  }

    public sendMessage(token: string, apiString: string, action: string){
      if(this.hubConnection !== undefined && this.hubConnection.state == signalR.HubConnectionState.Connected)
      {
        this.hubConnection.invoke("SendMessage", token, apiString, action)
        .catch(err=>console.error(err));
      }
  }

    public addReceiveMessageListener(callback: (token: string, apiString : string, action:string)=>void){

      if(this.hubConnection !== undefined && this.hubConnection.state == signalR.HubConnectionState.Connected)
      {
        this.hubConnection.on("ReceiveMessage", callback);
      }

    }


}
