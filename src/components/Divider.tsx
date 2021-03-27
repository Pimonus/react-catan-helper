import React from 'react';

import './Divider.css';

interface Props {
  width?: any;
}

const Divider = ({ width }: Props) => (
  <div className="divider" style={width ? { width } : undefined} />
);

export default Divider;
