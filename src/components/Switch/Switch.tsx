import React, { useState } from 'react';
import { Switch } from '@headlessui/react';

const SwitchComponent: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  return(
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className="w-14 h-7 rounded-full bg-green-500 relative inline-flex items-center"
    >
      <span className="inline-block h-6 w-6 bg-white rounded-full"></span>
    </Switch>
  );
};

export default SwitchComponent;
