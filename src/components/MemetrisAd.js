'use strict';

import React, { useState, useEffect, useMemo } from 'react';

const INTERVAL_LOW_MS = 30000;
const INTERVAL_HIGH_MS = 90000;

function MemetrisAd() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const randomInterval =
      Math.floor(Math.random() * (INTERVAL_HIGH_MS - INTERVAL_LOW_MS)) +
      INTERVAL_LOW_MS;
    const timeout = setTimeout(() => setVisible(v => !v), randomInterval);
    return () => clearTimeout(timeout);
  }, [visible]);

  return visible ? <img className="ad" src="/images/ad.png" /> : null;
}

export default MemetrisAd;
