import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import API from '@/api/axios';

// Define types for the password item and the state
interface PasswordItem {
  _id: string;
  title: string;
  passwordValue: string;
}

export default function SavedPasswordsPage() {
  const [items, setItems] = useState<PasswordItem[]>([]); // Type the state for items
  const [revealed, setRevealed] = useState<{ [key: string]: boolean }>({}); // Type the state for revealed

  useEffect(() => {
    // You might want to handle errors and loading states as well
    API.get('/passwords').then(res => setItems(res.data));
  }, []);

  return (
    <Card className="max-w-md mx-auto p-4 space-y-4">
      <CardContent>
        <h2 className="text-xl font-semibold">Saved Passwords</h2>
        <ul className="space-y-2">
          {items.map(item => (
            <li key={item._id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
              <div>
                <strong>{item.title}</strong>: {' '}{revealed[item._id] ? item.passwordValue : '*'.repeat(item.passwordValue.length)}
              </div>
              <Button size="sm" onClick={() => setRevealed(prev => ({ ...prev, [item._id]: !prev[item._id] }))}>
                {revealed[item._id] ? 'Hide' : 'Show'}
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
