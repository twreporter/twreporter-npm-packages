# Confirmation

## Usage

```javascript
import Confirmation from '@twreporter/react-components/lib/confirmation'

const Page = props => (
  <div>
    <Confirmation
      onCancel={this.onCancel}
      onConfirm={this.onConfirm}
      content={DIALOG_CONTENT}
      confirm={DIALOG_CONFIRM}
      cancel={DIALOG_CANCEL}
    />
  </div>
)
```

**Props:**

- `onCancel`(func): User click on cancel button will trigger onCancel
- `onConfirm`(func): User click on cancel button will trigger onConfirm
- `content`(string): Information in dialog
- `confirm`(string): confirm button text
- `cancel`(string): cancel button text
