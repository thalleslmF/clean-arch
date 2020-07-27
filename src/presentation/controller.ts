import { HttpRequest, HttpResponse } from './protocols/http/http'

export interface Controller {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>;
}
