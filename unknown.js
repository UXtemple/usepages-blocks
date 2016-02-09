import Code from './code';
import React from 'react';
import stringify from 'json-stable-stringify';

export default props => {
  const { _block, ...rest } = props;

  const code = stringify({
    block: _block,
    props: rest
  }, {space: '\t'});

  return (
    <div style={style.wrapper}>
      <div>Sorry but I don't know how to render this block :/</div>
      <Code code={code} gutter={false} readOnly={true} highlightActiveLine={false} style={style.code} />
    </div>
  );
}

const style = {
  code: {
    marginTop: 10
  },
  wrapper: {
    backgroundColor: '#323232',
    color: 'white',
    fontSize: 12,
    padding: 20
  }
};
