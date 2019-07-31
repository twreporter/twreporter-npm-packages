import NormalLeading from './normal'

export default class SmallLeading extends NormalLeading {
  constructor(props) {
    super(props)
    this.figureWidth = {
      tablet: 576,
      desktop: 573,
      hd: 792,
    }
  }
}
