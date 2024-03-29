import { Router } from 'express'
import { adaptRoute } from '../adapters'
import {
  makeAddSurveyController,
  makeLoadSurveysController
} from '../factories'
import { adminAuth, auth } from '../middlewares'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
