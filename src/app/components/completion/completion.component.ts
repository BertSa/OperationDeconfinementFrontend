import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Province} from '../../models/address';

@Component({
  selector: 'app-completion',
  templateUrl: './completion.component.html',
  styleUrls: ['./completion.component.css']
})
export class CompletionComponent implements OnInit {
  title: string = 'Complete your information';
  provinceEnum: any = Province;
  completionForm: FormGroup;

  tutorNeeded: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    this.setForm();
  }

  onSubmit() {
    if (this.completionForm.valid) {
      console.log('yes');
    }
  }

  // noinspection JSUnusedLocalSymbols
  keys<E extends { [I in Exclude<keyof E, ''>]: I }>(enumTest: E): Exclude<keyof E, ''>[] {
    return Object.keys(Province) as Exclude<keyof E, ''>[];
  }


  // public getPdf(username: string): Observable<Blob>{
  //   return this.http.get<Blob>(`<ton url>/${username}`, {headers : new HttpHeaders({'content-type': 'application/json', responseType: 'blob'}), responseType: 'blob' as 'json'});
  // }


  // fetchQr(): void {
  //   const email = localStorage.getItem('email') || '';
  //
  //   this.fileService.getQr(email).subscribe({
  //     next: (qr: Blob) => {
  //       const file = new Blob([qr], { type: 'image/png' });
  //       const url = URL.createObjectURL(file);
  //     },
  //     error: err => {},
  //       //handle error,
  //     complete: () => {}
  //   });
  // }
  //
  // fetchPdf(): void {
  //   const email = localStorage.getItem('email') || '';
  //
  //   this.fileService.getPdf(email).subscribe({
  //     next: (pdf: Blob) => {
  //       const file = new Blob([pdf], { type: 'application/pdf' });
  //       const url = URL.createObjectURL(file);
  //
  //       //si t'arrive <img />
  //
  //       img.src = url;
  //     },
  //     error: err =>{},
  //       //handle error,
  //     complete: () => {}
  //   });
  // }
  private setForm() {
    this.completionForm = new FormGroup({
      street: new FormControl('', [
        Validators.required,
      ]),
      apt: new FormControl(),
      city: new FormControl('', [
        Validators.required]),
      province: new FormControl('', [
        Validators.required,
      ]),
      zipCode: new FormControl('', [
        Validators.required,
        Validators.pattern('^([A-Za-z]\\s?[0-9]){3}$')
      ]),
      firstname: new FormControl({disabled: !this.tutorNeeded, value: ''}, [
        Validators.required,
      ]),
      lastname: new FormControl({disabled: !this.tutorNeeded, value: ''}, [
        Validators.required,
      ]),
      email: new FormControl({disabled: !this.tutorNeeded, value: ''}, [
        Validators.required,
      ]),
      phone: new FormControl({disabled: !this.tutorNeeded, value: ''}, [
        Validators.required,
      ]),
    });
  }
}
