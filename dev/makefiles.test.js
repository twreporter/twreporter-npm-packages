/* global describe test expect */
import * as utils from './utils'
import * as constants from './constants'
import fs from 'fs'
import forEach from 'lodash/forEach'
import path from 'path'

const _ = {
  forEach,
}

describe('The makefile of each package should have the same content with `dev/source.makefile`.', () => {
  const packageDirnames = utils.getPackageDirnames()
  const sourceMakefilePath = path.resolve(__dirname, 'source.makefile')
  const souceMakefileContent = fs.readFileSync(sourceMakefilePath).toString()
  _.forEach(packageDirnames, packageDirname => {
    test(`The content of makefile in \`packages/${packageDirname}\` is equal with it in source.`, () => {
      const makefilePath = path.resolve(
        constants.packagesAbsolutePath,
        packageDirname,
        'makefile'
      )
      const packageMakefileContent = fs.readFileSync(makefilePath).toString()
      expect(souceMakefileContent).toEqual(packageMakefileContent)
    })
  })
})
