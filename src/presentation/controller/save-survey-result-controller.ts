import { LoadSurveysById, SaveSurveyResult } from '@domain/usecases'
import { InvalidParamError } from '@presentation/errors'
import { forbidden, serverError, successResponse } from '@presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols'

export class SaveSurveyResultController implements Controller {
  constructor(
    private readonly loadSurveyById: LoadSurveysById,
    private readonly saveSurveyResult: SaveSurveyResult
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const survey = await this.loadSurveyById.loadById(surveyId)

      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }

      const { answer } = httpRequest.body
      const { accountId } = httpRequest
      const answers = survey.answers.map((a) => a.answer)
      if (!answers.includes(answer)) {
        return forbidden(new InvalidParamError('answer'))
      }
      const surveyResult = await this.saveSurveyResult.save({
        surveyId,
        accountId,
        answer,
        date: new Date()
      })

      return successResponse(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}
