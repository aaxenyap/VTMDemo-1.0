const {alias} = require('react-app-rewire-alias')

module.exports = function override(config) {
  alias({
    '@Components': 'src/component',
    '@Assets'    : 'src/assets',
    '@View'      : 'src/view',
    '@Img'       : 'projectassets/img'      
  })(config)

  return config
}