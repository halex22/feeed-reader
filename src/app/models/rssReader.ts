import { CommonReader } from "./commonReader";
import { Feed } from "./feed";

export class RssReader extends CommonReader {

  constructor(url: string) {
    super(url, false)
  }

  override parseInfo(): Feed[] {
    const parsedInfo = new DOMParser().parseFromString(this.rawInfo, 'text/xml')
    return [{ img: '', title: '', summary: ''}]
  }
}