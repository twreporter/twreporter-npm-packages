import React, { useState } from 'react'
// components
import { LogoFooter } from '../logo'
// @twreporter
import predefinedPropTypes from '@twreporter/core/lib/constants/prop-types'
import releaseBranchConsts from '@twreporter/core/lib/constants/release-branch'
import origins from '@twreporter/core/lib/constants/request-origins'
import Link from '../customized-link'

const Logo = ({ releaseBranch = releaseBranchConsts.release }) => {
  const mainOrigin = origins.forClientSideRendering[releaseBranch].main
  const [over, setOver] = useState(false)
  return (
    <Link
      to={mainOrigin}
      onMouseOver={() => setOver(true)}
      onMouseOut={() => setOver(false)}
    >
      <LogoFooter
        releaseBranch={releaseBranch}
        type={over ? LogoFooter.Type.DEFAULT : LogoFooter.Type.WHITE}
      />
    </Link>
  )
}

Logo.propTypes = {
  releaseBranch: predefinedPropTypes.releaseBranch,
}

export default Logo
