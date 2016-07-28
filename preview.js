import Code from './code';
import React, { PropTypes } from 'react';
import Text from './text';

const Preview = ({ block: Block, props }) => {
  if (typeof Block === 'function') {
    return <Block {...props} />;
  } else {
    return (
      <div style={styles.preview}>
        <Text
          style={styles.text}
          text={`In an ideal world I'd be rendering "${Block}" with these props:`}
        />

        <Code code={JSON.stringify(props)}
          gutter={false}
          highlightActiveLine={false}
          readOnly
          theme="github"
          style={styles.code}
          wrap={40}
        />

        <Text
          style={styles.text}
          text={`However we got a ${typeof Block} instead of a React element.
          This is ok if you're using the Preview block in Pages to build Pages though :)
            (inception style :P). ¯\\_(ツ)_/¯`}
          />
      </div>
    );
  }
};

Preview.defaultProps = {
  props: {}
};

Preview.propTypes = {
  block: PropTypes.any,
  props: PropTypes.object
};

export default Preview;

const styles = {
  code: {
    height: 100,
    marginTop: 20
  },
  text: {
    marginTop: 20
  },
  preview: {
    fontSize: 12,
    margin: 20
  }
}
