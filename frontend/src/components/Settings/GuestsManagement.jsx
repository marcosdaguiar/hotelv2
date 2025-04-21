import React, { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'

const GuestsManagement = () => {
  const [settings, setSettings] = useState({
    guestPreferences: { enabled: false, value: '' },
    loyaltyPrograms: { enabled: false, value: '' },
    guestCommunication: { enabled: false, value: '' },
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
      <CardContent className="space-y-4">
        {Object.keys(settings).map(setting => (
          <div key={setting} className="flex items-center space-x-4">
            <Switch
              checked={settings[setting].enabled}
              onCheckedChange={() => handleSwitchChange(setting)}
            />
            <Label>{setting.replace(/([A-Z])/g, ' $1')}</Label>
            <Input
              value={settings[setting].value}
              onChange={e => handleInputChange(setting, e.target.value)}
              disabled={!settings[setting].enabled}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default GuestsManagement
