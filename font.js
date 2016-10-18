import { load } from 'webfontloader'
import { Component, PropTypes } from 'react'

export default class Font extends Component {
  componentDidMount() {
    this.load()
  }

  componentDidUpdate() {
    this.load()
  }

  load() {
    const { props } = this

    let source = props.source
    let weight = ''

    let urls
    if (props.family === 'FontAwesome') {
      source = 'custom'
      urls = [
        'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css'
      ]
    } else {
      weight = `:${props.weight}`
    }

    load({
      [source]: {
        families: [
          `${props.family}${weight}`
        ],
        urls
      }
    })
  }

  render() {
    return null
  }
}
Font.defaultProps = {
  source: 'google',
  weight: '300'
}
Font.propTypes = {
  family: PropTypes.string.isRequired,
  source: PropTypes.oneOf([
    'custom',
    'google'
  ]).isRequired,
  weight: PropTypes.string.isRequired
}
