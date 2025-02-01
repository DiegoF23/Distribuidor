import React from 'react'
import Header from '../layouts/Header'
import MainStock from '../components/Stock/MainStock'
import { StockProvider } from "../contexts/Stock/StockContext"; 
const Stock = () => {
  return (
    <div>
        <div className="p-4">
           
            <StockProvider>
              <MainStock/>
            </StockProvider>
            
        </div>
    </div>
  )
}

export default Stock