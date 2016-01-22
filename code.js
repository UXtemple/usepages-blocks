import React, { Component } from 'react';

export default class Code extends Component {
  constructor(props) {
    super(props);
    this.id = `code-${Date.now()}`;
  }

  componentDidMount() {
    const editor = ace.edit(this.id);
    const session = editor.getSession();

    session.setMode(`ace/mode/${this.props.mode}`);
    session.setTabSize(2);
    session.setUseSoftTabs(true);
    session.setUseWrapMode(true);

    editor.setDisplayIndentGuides(false);
    editor.setFontSize(12);
    editor.setTheme(`ace/theme/${this.props.theme}`);
    editor.setOption('readOnly', true);
    editor.setOption('wrap', this.props.wrap);
    if (this.props.src) {
      fetch(this.props.src)
        .then(res => res.text())
        .then(code => this.editor.setValue(code, -1));
    } else {
      editor.setValue(this.props.code, -1);
    }

    this.editor = editor;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.mode !== this.props.mode) {
      this.editor.getSession().setMode(`ace/mode/${this.props.mode}`);
    }
    if (prevProps.code !== this.props.code) {
      this.editor.setValue(this.props.code, -1);
    }
    if (prevProps.src !== this.props.src) {
      fetch(this.props.src)
        .then(res => res.text())
        .then(code => this.editor.setValue(code, -1));
    }
  }

  render() {
    const { id } = this;

    return (
      <div>
        <style>{`
          #${id} span {
            display: inline;
          }
          #${id} div {
            display: block;
          }
          #${id} .ace_gutter-cell span {
            display: inline-block;
          }
        `}</style>

        <div id={this.id} style={{...style, ...this.props.style}}></div>
      </div>
    );
  }
}

Code.defaultProps = {
  mode: 'json',
  theme: 'idle_fingers',
  wrap: 40
}

const style = {
  height: 250,
  width: '100%'
}
