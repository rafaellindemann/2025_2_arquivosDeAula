
//F = (C × 1.8) + 32
//C = (F-32)/1.8

//k = c + 273.15
//c = k - 273.15

import React from 'react'

function Temperaturas() {
    function converterDeCelsius(){
        setInputF((inputC * 1.8) + 32)
        setInpuK(inputC + 273.15)
    }
  return (
    <div>
        <h2>Temperaturas</h2>
        <input type="text" /> // c
        <input type="text" /> // f
        <input type="text" /> // k

        <button onClick={converterDeCelsius}>C para F e K</button>

    </div>
  )
}

export default Temperaturas