"use client"

import { useState } from "react"
import { CreditCard, Trash2, Plus } from "lucide-react"

export function PaymentMethods() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [cards, setCards] = useState([
    {
      id: "1",
      type: "Visa",
      last4: "4242",
      expMonth: "12",
      expYear: "2025",
      isDefault: true,
    },
  ])

  const [newCard, setNewCard] = useState({
    cardNumber: "",
    cardName: "",
    expMonth: "",
    expYear: "",
    cvv: "",
    isDefault: false,
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setNewCard({
      ...newCard,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // In a real app, you would send this data to your payment processor
    // For this demo, we'll just add it to our local state
    const last4 = newCard.cardNumber.slice(-4)
    const cardType = getCardType(newCard.cardNumber)

    const newCardData = {
      id: `card-${Date.now()}`,
      type: cardType,
      last4,
      expMonth: newCard.expMonth,
      expYear: newCard.expYear,
      isDefault: newCard.isDefault,
    }

    // If the new card is default, update other cards
    const updatedCards = newCard.isDefault ? cards.map((card) => ({ ...card, isDefault: false })) : [...cards]

    setCards([...updatedCards, newCardData])

    // Reset form
    setNewCard({
      cardNumber: "",
      cardName: "",
      expMonth: "",
      expYear: "",
      cvv: "",
      isDefault: false,
    })

    setShowAddForm(false)
  }

  const handleRemoveCard = (id) => {
    setCards(cards.filter((card) => card.id !== id))
  }

  const handleSetDefault = (id) => {
    setCards(
      cards.map((card) => ({
        ...card,
        isDefault: card.id === id,
      })),
    )
  }

  // Simple function to determine card type based on first digit
  const getCardType = (number) => {
    const firstDigit = number.charAt(0)
    switch (firstDigit) {
      case "4":
        return "Visa"
      case "5":
        return "Mastercard"
      case "3":
        return "American Express"
      case "6":
        return "Discover"
      default:
        return "Credit Card"
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Your Payment Methods</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            {showAddForm ? (
              "Cancel"
            ) : (
              <>
                <Plus size={16} />
                Add Payment Method
              </>
            )}
          </button>
        </div>

        {showAddForm && (
          <div className="mb-6 rounded-md border p-4">
            <h3 className="text-md font-medium mb-4">Add New Payment Method</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="cardName" className="block text-sm font-medium mb-1">
                  Name on Card
                </label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  value={newCard.cardName}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={newCard.cardNumber}
                  onChange={handleInputChange}
                  placeholder="XXXX XXXX XXXX XXXX"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="expMonth" className="block text-sm font-medium mb-1">
                    Exp. Month
                  </label>
                  <select
                    id="expMonth"
                    name="expMonth"
                    value={newCard.expMonth}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                    required
                  >
                    <option value="">Month</option>
                    {Array.from({ length: 12 }, (_, i) => {
                      const month = (i + 1).toString().padStart(2, "0")
                      return (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      )
                    })}
                  </select>
                </div>
                <div>
                  <label htmlFor="expYear" className="block text-sm font-medium mb-1">
                    Exp. Year
                  </label>
                  <select
                    id="expYear"
                    name="expYear"
                    value={newCard.expYear}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                    required
                  >
                    <option value="">Year</option>
                    {Array.from({ length: 10 }, (_, i) => {
                      const year = (new Date().getFullYear() + i).toString()
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      )
                    })}
                  </select>
                </div>
                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={newCard.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isDefault"
                  name="isDefault"
                  checked={newCard.isDefault}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <label htmlFor="isDefault" className="ml-2 text-sm">
                  Set as default payment method
                </label>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-900"
                >
                  Add Payment Method
                </button>
              </div>
            </form>
          </div>
        )}

        {cards.length === 0 ? (
          <div className="text-center py-8">
            <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No payment methods</h3>
            <p className="mt-1 text-sm text-gray-500">Add a payment method to make checkout faster.</p>
            <div className="mt-6">
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-900"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Payment Method
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {cards.map((card) => (
              <div key={card.id} className="flex items-center justify-between rounded-md border p-4">
                <div className="flex items-center">
                  <div className="mr-4">
                    <CreditCard className="h-8 w-8 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {card.type} •••• {card.last4}
                    </p>
                    <p className="text-xs text-gray-500">
                      Expires {card.expMonth}/{card.expYear}
                    </p>
                    {card.isDefault && (
                      <span className="mt-1 inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                        Default
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!card.isDefault && (
                    <button
                      onClick={() => handleSetDefault(card.id)}
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      Set as default
                    </button>
                  )}
                  <button onClick={() => handleRemoveCard(card.id)} className="text-gray-500 hover:text-gray-700">
                    <Trash2 size={18} />
                    <span className="sr-only">Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-lg border p-6">
        <h2 className="text-lg font-medium mb-4">Billing Address</h2>
        <p className="text-sm text-gray-500 mb-4">
          Your billing address should match the address on your credit card statement.
        </p>
        <div className="rounded-md border p-4 mb-4">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium">Home Address</p>
              <p className="text-sm text-gray-500">
                John Doe
                <br />
                123 Main St
                <br />
                Apt 4B
                <br />
                New York, NY 10001
                <br />
                United States
              </p>
              <span className="mt-2 inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                Default
              </span>
            </div>
            <div>
              <button className="text-sm text-gray-600 hover:text-gray-900">Edit</button>
            </div>
          </div>
        </div>
        <button className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900">
          <Plus size={16} />
          Add New Address
        </button>
      </div>
    </div>
  )
}

