import React, { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'

const IntegrationSettings = () => {
  const [settings, setSettings] = useState({
    keyCardSystems: { enabled: false, value: '' },
    posIntegration: { enabled: false, value: '' },
    crmSystems: { enabled: false, value: '' },
    smartDevices: { enabled: false, value: '' },
  });

  const handleSwitchChange = (setting) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [setting]: {
        ...prevSettings[setting],
        enabled: !prevSettings[setting].enabled,
      },
    }));
  };

  const handleInputChange = (setting, value) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [setting]: {
        ...prevSettings[setting],
        value,
      },
    }));
  };

  return (
    <Card>
      <CardContent>
        <div>
          <Label>Key Card Systems</Label>
          <Switch
            checked={settings.keyCardSystems.enabled}
            onChange={() => handleSwitchChange('keyCardSystems')}
          />
          {settings.keyCardSystems.enabled && (
            <Input
              value={settings.keyCardSystems.value}
              onChange={(e) => handleInputChange('keyCardSystems', e.target.value)}
            />
          )}
        </div>
        <div>
          <Label>POS Integration</Label>
          <Switch
            checked={settings.posIntegration.enabled}
            onChange={() => handleSwitchChange('posIntegration')}
          />
          {settings.posIntegration.enabled && (
            <Input
              value={settings.posIntegration.value}
              onChange={(e) => handleInputChange('posIntegration', e.target.value)}
            />
          )}
        </div>
        <div>
          <Label>CRM Systems</Label>
          <Switch
            checked={settings.crmSystems.enabled}
            onChange={() => handleSwitchChange('crmSystems')}
          />
          {settings.crmSystems.enabled && (
            <Input
              value={settings.crmSystems.value}
              onChange={(e) => handleInputChange('crmSystems', e.target.value)}
            />
          )}
        </div>
        <div>
          <Label>Smart Devices</Label>
          <Switch
            checked={settings.smartDevices.enabled}
            onChange={() => handleSwitchChange('smartDevices')}
          />
          {settings.smartDevices.enabled && (
            <Input
              value={settings.smartDevices.value}
              onChange={(e) => handleInputChange('smartDevices', e.target.value)}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegrationSettings;
