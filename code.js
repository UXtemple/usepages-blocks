import React, { Component } from 'react';
import uniqueId from 'mini-unique-id';

export default class Code extends Component {
  constructor(props) {
    super(props);
    this.id = `code-${uniqueId()}`;
  }

  componentDidMount() {
    const editor = ace.edit(this.id);
    this.editor = editor;

    const session = editor.getSession();

    session.setMode(`ace/mode/${this.props.mode}`);
    session.setTabSize(2);
    session.setUseSoftTabs(true);
    session.setUseWrapMode(true);

    editor.setDisplayIndentGuides(false);
    editor.setFontSize(12);
    editor.setTheme(`ace/theme/${this.props.theme}`);
    editor.setOption('readOnly', this.props.readOnly);
    editor.setOption('wrap', this.props.wrap);
    editor.renderer.setShowGutter(this.props.gutter);

    if (this.props.src) {
      fetch(this.props.src)
        .then(res => res.text())
        .then(code => this.editor.setValue(code, -1));
    } else if (this.props.code) {
      editor.setValue(this.props.code, -1);
    }
  }

  componentDidUpdate(prevProps) {
    const { editor, props } = this;
    const session = editor.getSession();

    if (prevProps.mode !== props.mode) {
      session.setMode(`ace/mode/${props.mode}`);
    }
    if (prevProps.code !== props.code) {
      editor.setValue(props.code, -1);
    }
    if (prevProps.gutter !== props.gutter) {
      editor.renderer.setShowGutter(props.gutter);
    }
    if (prevProps.readyOnly !== props.readOnly) {
      editor.setOption('readOnly', props.readOnly);
    }
    if (prevProps.src !== props.src) {
      fetch(props.src)
        .then(res => res.text())
        .then(code => editor.setValue(code, -1));
    }
    if (prevProps.wrap !== props.wrap) {
      editor.setOption('wrap', props.wrap);
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
  gutter: true,
  mode: 'json',
  theme: 'idle_fingers',
  wrap: 40
}

const style = {
  height: 250,
  width: '100%'
}
