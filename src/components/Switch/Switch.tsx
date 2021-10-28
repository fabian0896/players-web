import React, { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';

interface SwitchProps {
  value?: boolean
  onChange?: (enabled: boolean) => void
}

const SwitchComponent: React.FC<SwitchProps> = ({ value, onChange }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(Boolean(value));
  }, [value])

  return(
    <Switch
      checked={enabled}
      onChange={onChange || setEnabled}
      className={`${
        enabled ? 'bg-green-500' : 'bg-gray-300'
      } w-11 h-6 rounded-full transition relative inline-flex items-center 
      focus:ring-2 focus:outline-none focus:ring-gray-400 focus:ring-offset-2`}    
    >
      <span className={`${
        enabled ? 'translate-x-1' : 'translate-x-6'
      } inline-block shadow-lg transition ease-in-out h-4 w-4 bg-white rounded-full transform`} />
    </Switch>
  );
};

export default SwitchComponent;
