import { AddSurvey } from '../../domain/usecases'
import { ServerError } from '../errors'
import { badRequest, serverError } from '../helpers'
import { Controller, HttpRequest, HttpResponse, Validation } from '../protocols'

export class AddSurveyController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }

      const { question, answers } = httpRequest.body

      await this.addSurvey.add({
        question,
        answers
      })
      return null
    } catch (error) {
      return serverError(new ServerError())
    }
  }
}