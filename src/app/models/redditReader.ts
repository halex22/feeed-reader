import { CommonReader } from "./commonReader";
import { Feed } from "./feed";
import { RedditResponse } from "./redditResponse";

export class RedditReader extends CommonReader {

  constructor(url: string) {
    super(url, true)
  }

  override parseInfo(): Feed[] {
    const info = this.rawInfo as RedditResponse
    const feedArray: Feed[] = []
    info.data.children.forEach( record => {
      console.log(record.data.title)
      feedArray.push({
        img: record.data.thumbnail,
        title: record.data.title,
        summary: 'This is a reddit and it is got no description'
      })
    })
    return feedArray
  }

}