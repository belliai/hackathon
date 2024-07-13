"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import PageContainer from "@/components/layout/PageContainer"

export default function Page() {
  const [data, setData] = useState<any>(null)
  const [productName, setProductName] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  const handleClick = async () => {
    try {
      console.log('Fetching data...');
      const response = await fetch('https://ptds3bnpl6.execute-api.us-west-2.amazonaws.com/prod/predict', { // Replace with your API Gateway endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_name: productName }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json()
      console.log('Data received:', result);
      setData(result)
      setError(null)
    } catch (error) {
      console.error('Error fetching data:', error)
      setError(error.message)
    }
  }

  return (
    <PageContainer className="gap-6" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f4f4f9' }}>
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '600px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
            style={{
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '0.25rem',
              flex: '1',
              marginRight: '0.5rem',
              color: 'black',
              fontSize: '1rem',
            }}
          />
          <Button
            onClick={handleClick}
            style={{
              fontSize: '0.875rem',
              backgroundColor: '#FF5722',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.25rem',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Extract Data
          </Button>
        </div>
        {error && (
          <div style={{ color: 'red', marginBottom: '1rem' }}>
            {error}
          </div>
        )}
        {data && (
          <div style={{ marginTop: '1rem', backgroundColor: '#f9f9f9', padding: '1rem', borderRadius: '0.25rem', border: '1px solid #ddd' }}>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
    </PageContainer>
  )
}
