
export class License {
  type: TypeLicense;
  category: CategoryLicense;
  dateCreation:Date;
  dateExpire:Date;


  constructor(type: TypeLicense, category: CategoryLicense, dateCreation: Date, dateExpire: Date) {
    this.type = type;
    this.category = category;
    this.dateCreation = dateCreation;
    this.dateExpire = dateExpire;
  }
}

export enum TypeLicense {
  Vaccine = 'Vaccine',
  Negative_Test = 'Negative_Test'
}
export enum CategoryLicense {
  Children = 'Children',
  YoungAdult = 'Young Adult',
  Adult = 'Adult',
  Senior = 'Senior'
}
