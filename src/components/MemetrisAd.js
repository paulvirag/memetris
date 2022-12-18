'use strict';

import React, { useState, useEffect } from 'react';

const SHOW_INTERVAL_LOW_MS = 5000;
const SHOW_INTERVAL_HIGH_MS = 10000;
const HIDE_INTERVAL_LOW_MS = 30000;
const HIDE_INTERVAL_HIGH_MS = 90000;

function MemetrisAd() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const low = visible ? SHOW_INTERVAL_LOW_MS : HIDE_INTERVAL_LOW_MS;
    const high = visible ? SHOW_INTERVAL_HIGH_MS : HIDE_INTERVAL_HIGH_MS;
    const randomInterval = Math.floor(Math.random() * (high - low)) + low;
    const timeout = setTimeout(() => setVisible(v => !v), randomInterval);
    return () => clearTimeout(timeout);
  }, [visible]);

  return visible ? <img className="ad" src="/images/ad.png" /> : null;
}

export default MemetrisAd;
