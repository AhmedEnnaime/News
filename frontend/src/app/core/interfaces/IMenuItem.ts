export class IMenuItem {
  text: string;
  url: string;
  [key: string]: any;

  constructor(text: string, url: string) {
    this.text = text;
    this.url = url;
  }
}
