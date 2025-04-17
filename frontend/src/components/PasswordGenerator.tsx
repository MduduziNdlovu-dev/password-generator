import { useState } from "react";
import { toast } from "sonner";
import  zxcvbn  from "zxcvbn";

const PasswordGenerator = () => {
  const [length, setLength] = useState<number>(12);
  const [includeUpper, setIncludeUpper] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const generatePassword = (): void => {
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+=-";

    let chars = lower;
    if (includeUpper) chars += upper;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    let genPassword = "";
    for (let i = 0; i < length; i++) {
      genPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPassword(genPassword);
    toast.success("Password generated!");
  };

  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(password);
    toast.success("Copied to clipboard!");
  };

  const strength = zxcvbn(password).score;

  return (
    <div className="bg-white shadow-xl p-6 rounded-2xl w-full max-w-md">
      <h1 className="text-xl font-bold mb-4">Password Generator</h1>

      <label className="block font-medium mb-1">Length: {length}</label>
      <input
        type="range"
        min={6}
        max={32}
        value={length}
        onChange={(e) => setLength(Number(e.target.value))}
        className="w-full mb-4"
      />

      <div className="flex flex-col gap-2 mb-4">
        <label>
          <input
            type="checkbox"
            checked={includeUpper}
            onChange={(e) => setIncludeUpper(e.target.checked)}
          />
          <span className="ml-2">Include Uppercase</span>
        </label>

        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          <span className="ml-2">Include Numbers</span>
        </label>

        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
          <span className="ml-2">Include Symbols</span>
        </label>
      </div>

      <button
        onClick={generatePassword}
        className="w-full bg-black text-white py-2 rounded-xl mb-3 hover:bg-gray-800"
      >
        Generate Password
      </button>

      {password && (
        <>
          <div className="bg-gray-100 p-2 rounded mb-2">{password}</div>
          <div className="flex justify-between text-sm">
            <span>Password Strength:</span>
            <span className={`font-semibold ${strength > 2 ? "text-green-600" : "text-red-500"}`}>
              {["Weak", "Weak", "Fair", "Good", "Strong"][strength]}
            </span>
          </div>

          <button
            onClick={copyToClipboard}
            className="mt-3 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
          >
            Copy Password
          </button>
        </>
      )}
    </div>
  );
};

export default PasswordGenerator;
