import { type Feed } from "./feed";

export abstract class CommonReader {
  
  rawInfo: any

  constructor(protected url: string, protected isJson: boolean) { 
    this.fetchInfo()
  }

  fetchInfo(): Promise<Feed[]> {
    return fetch(this.url)
    .then(res => this.isJson ? res.json() : res.text())
    .then(data => {
      console.log(data)
      return this.parseInfo(data)
    })
  }

  // questo metodo a seconda della classe dovra parsare l'info in modo diverso
  // se è un rss dovra 
  abstract parseInfo(data: any): Feed[];
}