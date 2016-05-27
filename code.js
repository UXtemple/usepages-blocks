import React, { Component } from 'react';
import uniqueId from 'mini-unique-id';

export default class Code extends Component {
  constructor(props) {
    super(props);
    const id = `code-${uniqueId()}`;
    this.id = id;
    this.setHeight = this.setHeight.bind(this);
    this.state = {
      height: 16
    };
    this.style = (
      <style>{`
        #${id} span {
          display: inline;
        }
        #${id} div {
          display: block;
        }
        #${id} .ace_gutter-cell span {
          display: inline-block;
        }`}
      </style>
    );
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

    editor.$blockScrolling = Infinity;
    editor.setDisplayIndentGuides(false);
    editor.setFontSize(12);
    editor.setHighlightActiveLine(props.highlightActiveLine);
    editor.setTheme(`ace/theme/${props.theme}`);
    editor.setOption('readOnly', props.readOnly);
    editor.setOption('wrap', props.wrap);
    editor.renderer.setShowGutter(props.gutter);

    session.on('change', this.setHeight);

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
    if (prevProps.theme !== props.theme) {
      editor.setTheme(`ace/theme/${props.theme}`);
    }
    if (prevProps.wrap !== props.wrap) {
      editor.setOption('wrap', props.wrap);
    }
  }

  componentWillUnmount() {
    this.editor.getSession().off('change', this.setHeight);
  }

  setHeight() {
    const { editor } = this;
    const session = editor.getSession();

    editor.setOption('minLines', session.getLength());
    editor.setOption('maxLines', session.getLength());

    this.setState({
      height: editor.renderer.scrollBarV.inner.style.height // editor.renderer.layerConfig.minHeight
    });
  }

  render() {
    const { id, props, state } = this;

    return (
      <div id={props.id} data-block={props['data-block']}>
        {this.style}

        <div id={id} ref='code' style={{ ...props.style, height: state.height }} />
      </div>
    );
  }
}

Code.defaultProps = {
  gutter: true,
  highlightActiveLine: true,
  mode: 'json',
  style: {
    width: '100%'
  },
  theme: 'idle_fingers',
  wrap: 40
};
