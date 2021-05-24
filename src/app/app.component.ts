import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {UserService} from './services/user.service';

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'OperationDeconfinementFrontend';

  constructor(private service: UserService) {
  }

  @HostListener('window:beforeunload')
  onBeforeUnload(): void {
    this.service.saveSession();
  }
  ngOnInit(): void {
    this.service.getSessionSaved();
  }

}
