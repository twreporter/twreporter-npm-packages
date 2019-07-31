# Slider

## Usage

```jsx
import Slider, { Indicator, Rail, Progress } from './slider'

const Container = styled.div`
  width: 80%;
  height: 20px;
  border: 1px solid gray;
  margin: 80px 60px;
  position: relative;
  ${Indicator} {
    background: blue;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
  }
  ${Rail} {
    background: url(rail-bg.jpg);
  }
  ${Progress} {
    background: url(progress-bg.jpg);
  }
`

class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0,
    }
    this._audio = new Audio() // an audio generator
  }
  handleSeekEnd = ({ value }) => {
    this.setState({
      current: value,
    })
    this._audio.seek(value)
    this._audio.play()
  }
  handleSeekStart = () => {
    this._audio.pause()
  }
  render() {
    return (
      <Container>
        <Slider
          defaultValue={0}
          value={this.state.current}
          min={0}
          max={150}
          onSeekEnd={this.handleSeekEnd}
          onSeekStart={this.handleSeekStart}
        />
      </Container>
    )
  }
}
```
