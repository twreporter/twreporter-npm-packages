import mq from '@twreporter/core/lib/utils/media-query'
import styled from 'styled-components'
import color from '../../constants/color'

const PostsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  ${mq.mobileOnly`
    flex-direction: column;
    justify-content: flex-start;
    a {
      border-bottom: solid 1px ${color.gray};
    }
    a:last-child {
      border-bottom: medium none currentcolor;
    }
  `}
`

export default PostsContainer
