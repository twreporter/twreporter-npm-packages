import annotateAxiosError from './helpers/annotate-axios-error'
import AnnotatingError from './annotating-error'
import generalHelpers from './helpers/general'
import printHelpers from './helpers/print'

export default {
  helpers: {
    annotateAxiosError,
    ...generalHelpers,
    ...printHelpers,
  },
  AnnotatingError,
}
