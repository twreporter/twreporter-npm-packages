import NormalLeading from './normal'

export default class ExtendLeading extends NormalLeading {
  constructor(props) {
    super(props)
    this.figureWidth = {
      tablet: 768,
      desktop: 984,
      hd: 1380,
    }
  }
}
