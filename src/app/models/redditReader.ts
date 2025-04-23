import { CommonReader } from "./commonReader";
import { Feed } from "./feed";
import { RedditResponse } from "./redditResponse";

export class RedditReader extends CommonReader {

  constructor(url: string) {
    super(url, true)
  }

  override parseInfo(): Feed[] {
    const info = this.rawInfo as RedditResponse
    info.data.children.forEach( record => {
      console.log(record.data.title)
    })
    return [{ img: '', title: '', summary: ''}]
  }

}