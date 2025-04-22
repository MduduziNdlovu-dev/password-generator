import React, { useState } from 'react';
import zxcvbn from 'zxcvbn';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import API from '@/api/axios';
import { toast } from 'sonner';

export default function GeneratePage() {
  const [length, setLength] = useState(12);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0);
  const [title, setTitle] = useState('');

  const pools = {
    lower: 'abcdefghijklmnopqrstuvwxyz',
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
  };

  const generatePassword = () => {
    let charset = '';
    if (includeLower) charset += pools.lower;
    if (includeUpper) charset += pools.upper;
    if (includeNumbers) charset += pools.numbers;
    if (includeSymbols) charset += pools.symbols;
    if (!charset) return toast.error('Select at least one option');

    let pwd = '';
    for (let i = 0; i < length; i++) {
      pwd += charset[Math.floor(Math.random() * charset.length)];
    }
    setPassword(pwd);
    setStrength(zxcvbn(pwd).score);
  };

  const savePassword = async () => {
    if (!password) return toast.error('Nothing to save');
    try {
      await API.post('/passwords', { title: title || 'Untitled', passwordValue: password });
      toast.success('Saved');
      setTitle('');
    } catch {
      toast.error('Save failed');
    }
  };

  const labels = ['Too Weak','Weak','Fair','Good','Strong'];
  const colors = ['bg-red-500','bg-orange-500','bg-yellow-500','bg-green-400','bg-green-600'];

  return (
    <Card className="max-w-md mx-auto p-4 space-y-4">
      <CardContent>
        <h2 className="text-xl font-semibold">Generate Password</h2>
        <div className="grid grid-cols-2 gap-2">
          <label><input type="checkbox" checked={includeLower} onChange={() => setIncludeLower(!includeLower)} /> Lowercase</label>
          <label><input type="checkbox" checked={includeUpper} onChange={() => setIncludeUpper(!includeUpper)} /> Uppercase</label>
          <label><input type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} /> Numbers</label>
          <label><input type="checkbox" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} /> Symbols</label>
        </div>
        <div>
          <Label htmlFor="length">Length: {length}</Label>
          <input id="length" type="range" min={4} max={32} value={length} onChange={e => setLength(+e.target.value)} className="w-full" />
        </div>
        <Button onClick={generatePassword} className="w-full">Generate</Button>
        {password && (
          <>  
            <div><Label>Password</Label><Input readOnly value={password} className="font-mono" /></div>
            <div className="flex space-x-2">
              <Input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} className="flex-1"/>
              <Button onClick={savePassword}>Save</Button>
            </div>
            <div>
              <Label>Strength: {labels[strength]}</Label>
              <div className="h-2 w-full bg-gray-200 rounded"><div className={`${colors[strength]} h-2 rounded`} style={{width:`${(strength+1)*20}%`}}/></div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
