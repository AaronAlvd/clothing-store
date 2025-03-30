"use client"

import type React from "react"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"

export default function SettingsPage() {
  const [generalSettings, setGeneralSettings] = useState({
    storeName: "Clothing Store",
    storeEmail: "info@clothingstore.com",
    storePhone: "+1 (555) 123-4567",
    currency: "USD",
    timezone: "America/New_York",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    orderConfirmation: true,
    orderShipped: true,
    orderDelivered: true,
    lowStock: true,
    newCustomer: false,
  })

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setGeneralSettings({
      ...generalSettings,
      [name]: value,
    })
  }

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setNotificationSettings({
      ...notificationSettings,
      [name]: checked,
    })
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your store settings and preferences</p>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-medium text-gray-900">General Settings</h2>
          <p className="mt-1 text-sm text-gray-500">Basic information about your store</p>

          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">
                  Store Name
                </label>
                <input
                  type="text"
                  name="storeName"
                  id="storeName"
                  value={generalSettings.storeName}
                  onChange={handleGeneralChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="storeEmail" className="block text-sm font-medium text-gray-700">
                  Store Email
                </label>
                <input
                  type="email"
                  name="storeEmail"
                  id="storeEmail"
                  value={generalSettings.storeEmail}
                  onChange={handleGeneralChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="storePhone" className="block text-sm font-medium text-gray-700">
                  Store Phone
                </label>
                <input
                  type="text"
                  name="storePhone"
                  id="storePhone"
                  value={generalSettings.storePhone}
                  onChange={handleGeneralChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  value={generalSettings.currency}
                  onChange={handleGeneralChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                  <option value="AUD">AUD - Australian Dollar</option>
                </select>
              </div>

              <div>
                <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                  Timezone
                </label>
                <select
                  id="timezone"
                  name="timezone"
                  value={generalSettings.timezone}
                  onChange={handleGeneralChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                >
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="Europe/London">Greenwich Mean Time (GMT)</option>
                  <option value="Europe/Paris">Central European Time (CET)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-medium text-gray-900">Notification Settings</h2>
          <p className="mt-1 text-sm text-gray-500">Configure which notifications you want to receive</p>

          <div className="mt-6 space-y-4">
            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="orderConfirmation"
                  name="orderConfirmation"
                  type="checkbox"
                  checked={notificationSettings.orderConfirmation}
                  onChange={handleNotificationChange}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="orderConfirmation" className="font-medium text-gray-700">
                  Order Confirmation
                </label>
                <p className="text-gray-500">Receive notifications when a new order is placed.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="orderShipped"
                  name="orderShipped"
                  type="checkbox"
                  checked={notificationSettings.orderShipped}
                  onChange={handleNotificationChange}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="orderShipped" className="font-medium text-gray-700">
                  Order Shipped
                </label>
                <p className="text-gray-500">Receive notifications when an order is shipped.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="orderDelivered"
                  name="orderDelivered"
                  type="checkbox"
                  checked={notificationSettings.orderDelivered}
                  onChange={handleNotificationChange}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="orderDelivered" className="font-medium text-gray-700">
                  Order Delivered
                </label>
                <p className="text-gray-500">Receive notifications when an order is delivered.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="lowStock"
                  name="lowStock"
                  type="checkbox"
                  checked={notificationSettings.lowStock}
                  onChange={handleNotificationChange}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="lowStock" className="font-medium text-gray-700">
                  Low Stock
                </label>
                <p className="text-gray-500">Receive notifications when product inventory is low.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="newCustomer"
                  name="newCustomer"
                  type="checkbox"
                  checked={notificationSettings.newCustomer}
                  onChange={handleNotificationChange}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="newCustomer" className="font-medium text-gray-700">
                  New Customer
                </label>
                <p className="text-gray-500">Receive notifications when a new customer registers.</p>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

