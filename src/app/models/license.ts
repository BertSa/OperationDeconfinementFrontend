export class License {
  type: TypeLicense;
  category: CategoryLicense;
  dateCreation: Date;
  dateExpire: Date;


  constructor(type: TypeLicense, category: CategoryLicense, dateCreation: Date, dateExpire: Date) {
    this.type = type;
    this.category = category;
    this.dateCreation = dateCreation;
    this.dateExpire = dateExpire;
  }

  isValid(): boolean {
    if (this.type === TypeLicense.VACCINE) {
      return true;
    }
    return this.getNumberOfDays() > 0;
  }

  public getNumberOfDays(): number {
    let difference = (new Date(this.dateExpire).getTime() - new Date(Date.now()).getTime());
    return Math.ceil(difference / (1000 * 3600 * 24));
  }
}

export enum TypeLicense {
  VACCINE = 'VACCINE',
  NEGATIVETEST = 'NEGATIVETEST'
}

export enum CategoryLicense {
  Children = 'Children',
  YoungAdult = 'Young Adult',
  Adult = 'Adult',
  Senior = 'Senior'
}
