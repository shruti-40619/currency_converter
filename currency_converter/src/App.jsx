import { useState } from 'react'
import './App.css'
import InputBox from './components/InputBox'
import useCurrencyInfo from './UseCurrencyInfo'

function App() {

  const [amount,setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const[to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)

  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }

 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 font-poppins px-4">
            <div className="backdrop-blur-md bg-white/10 p-10 rounded-3xl shadow-2xl border border-white/50 max-w-xl w-full ">
            <h1 className="text-4xl font-bold text-white text-center mb-8 drop-shadow-md ">
            Currency Converter</h1>
            <form onSubmit={(e) => {
              e.preventDefault();
              convert()
            }}>
              <div className="w-full mb-1">
                <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setAmount(amount)}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
                />
              </div>
              <div className="relative w-full h-0.5">
                <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2
                -translate-y-1/2 border-2border-white rounded-md
                bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}> swap </button>
              </div>
              <div className="w-full mt-1 mb-4">
                <InputBox
                     label="To"
                     amount={convertedAmount}
                     currencyOptions={options}
                     onCurrencyChange={(currency) => setTo(currency)}
                     selectCurrency={to}
                     amountDisable 
                />
              </div>
              <button type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>

            </form>
            </div>
    </div>
  )
}

export default App
