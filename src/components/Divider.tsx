import React from 'react';

import './Divider.less';

interface Props {
  width?: any;
}

const Divider = ({ width }: Props) => (
  <div className="divider" style={width ? { width } : undefined} />
);

export default Divider;
