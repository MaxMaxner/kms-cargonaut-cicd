import {Injectable, NgZone} from '@angular/core';


@Injectable({ providedIn: 'root' })
export class AlertService {

  toasts: any[] = [];
  constructor(private zone: NgZone) { }

  show(header: string, body: string){
    this.zone.run(() => {
        this.toasts.push({header, body});
      }
    )
  }
  remove(toast: any){
    this.toasts = this.toasts.filter(t => t != toast);
  }

}
