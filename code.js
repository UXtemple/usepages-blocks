import React, { Component } from 'react';
import uniqueId from 'mini-unique-id';

export default class Code extends Component {
  constructor(props) {
    super(props);
    this.id = `code-${uniqueId()}`;
  }

  componentDidMount() {
    const { props } = this;
    const editor = ace.edit(this.id);
    this.editor = editor;

    const session = editor.getSession();

    session.setMode(`ace/mode/${props.mode}`);
    session.setTabSize(2);
    session.setUseSoftTabs(true);
    session.setUseWrapMode(true);

    editor.setDisplayIndentGuides(false);
    editor.setFontSize(12);
    editor.setHighlightActiveLine(props.highlightActiveLine);
    editor.setTheme(`ace/theme/${props.theme}`);
    editor.setOption('readOnly', props.readOnly);
    editor.setOption('wrap', props.wrap);
    editor.renderer.setShowGutter(props.gutter);

    if (props.src) {
      fetch(props.src)
        .then(res => res.text())
        .then(code => this.editor.setValue(code, -1));
    } else if (props.code) {
      editor.setValue(props.code, -1);
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
    if (prevProps.highlightActiveLine !== props.highlightActiveLine) {
      editor.setHighlightActiveLine(props.highlightActiveLine);
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
      <div id={this.props.id}>
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

        <div id={id} style={{...style, ...this.props.style}}></div>
      </div>
    );
  }
}

Code.defaultProps = {
  gutter: true,
  highlightActiveLine: true,
  mode: 'json',
  theme: 'idle_fingers',
  wrap: 40
}

const style = {
  height: 250,
  width: '100%'
}
