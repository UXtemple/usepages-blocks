import Code from './code';
import React from 'react';

export default ({ 'data-block': dataBlock, ...props }) => {
  const code = JSON.stringify(props, { space: '\t' });

  return (
    <div data-block={dataBlock} style={style.wrapper}>
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
