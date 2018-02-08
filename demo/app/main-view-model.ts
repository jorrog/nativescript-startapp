import { Observable } from 'tns-core-modules/data/observable';
import { Startapp } from 'nativescript-startapp';

export class HelloWorldModel extends Observable {
  public message: string;
  private startapp: Startapp;

  constructor() {
    super();

    this.startapp = new Startapp();
    this.message = this.startapp.message;
  }
}
