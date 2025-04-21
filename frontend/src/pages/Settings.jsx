import React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import GeneralSettings from '@/components/Settings/GeneralSettings'
import FinancialSettings from '@/components/Settings/FinancialSettings'
import BookingSettings from '@/components/Settings/BookingSettings'
import RoomSettings from '@/components/Settings/RoomSettings'
import GuestsManagement from '@/components/Settings/GuestsManagement'
import StaffSettings from '@/components/Settings/StaffSettings'
import OperationalSettings from '@/components/Settings/OperationalSettings'
import IntegrationSettings from '@/components/Settings/IntegrationSettings'

export const Settings = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <Separator />
      </div>
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General Settings</TabsTrigger>
          <TabsTrigger value="financial">Financial Settings</TabsTrigger>
          <TabsTrigger value="booking">Booking Management</TabsTrigger>
          <TabsTrigger value="room">Room Settings</TabsTrigger>
          <TabsTrigger value="guest">Guest Management</TabsTrigger>
          <TabsTrigger value="staff">Staff Settings</TabsTrigger>
          <TabsTrigger value="operational">Operational Settings</TabsTrigger>
          <TabsTrigger value="integrations">Integration Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <GeneralSettings />
        </TabsContent>
        <TabsContent value="financial">
          <FinancialSettings />
        </TabsContent>
        <TabsContent value="booking">
          <BookingSettings />
        </TabsContent>
        <TabsContent value="room">
          <RoomSettings />
        </TabsContent>
        <TabsContent value="guest">
          <GuestsManagement />
        </TabsContent>
        <TabsContent value="staff">
          <StaffSettings />
        </TabsContent>
        <TabsContent value="operational">
          <OperationalSettings />
        </TabsContent>
        <TabsContent value="integrations">
          <IntegrationSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
