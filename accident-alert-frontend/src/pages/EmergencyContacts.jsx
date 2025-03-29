import React, { useState } from 'react';
import { FiPhone, FiPlus, FiTrash2 } from 'react-icons/fi';

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Local Police', phone: '119', type: 'Police' },
    { id: 2, name: 'Ambulance Service', phone: '110', type: 'Medical' },
    { id: 3, name: 'Emergency Contact', phone: '+94 71 234 5678', type: 'Personal' }
  ]);

  const [newContact, setNewContact] = useState({ name: '', phone: '', type: 'Personal' });

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      setContacts([...contacts, { ...newContact, id: contacts.length + 1 }]);
      setNewContact({ name: '', phone: '', type: 'Personal' });
    }
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Emergency Contacts
          </h2>

          {/* Add New Contact Form */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Contact Name"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                className="rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={newContact.phone}
                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                className="rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
              <select
                value={newContact.type}
                onChange={(e) => setNewContact({ ...newContact, type: e.target.value })}
                className="rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Personal">Personal</option>
                <option value="Medical">Medical</option>
                <option value="Police">Police</option>
              </select>
            </div>
            <button
              onClick={handleAddContact}
              className="mt-4 flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FiPlus className="h-5 w-5" />
              <span>Add Contact</span>
            </button>
          </div>

          {/* Contacts List */}
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between bg-white border rounded-lg p-4 hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <FiPhone className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{contact.name}</h4>
                    <p className="text-sm text-gray-600">{contact.phone}</p>
                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                      {contact.type}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteContact(contact.id)}
                  className="text-red-600 hover:text-red-700 p-2"
                >
                  <FiTrash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContacts;