import { useEffect, useState } from 'react'
import './App.css'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { api } from './lib/api'


function App() {
  const [totalSpent, setTotalSpent] = useState(0)

  useEffect(() => {
    async function fetchTotalSpent() {
      const response = await api.expenses["total-spent"].$get()
      const data = await response.json()
      setTotalSpent(data.total)
    }
    fetchTotalSpent()
  }, [])

  return (
    <Card className='w-[350px] m-auto'>
   <CardHeader>
    <CardTitle>Total Spent</CardTitle>
    <CardDescription>The total amount you've spent</CardDescription>
   </CardHeader>
   <CardContent>{totalSpent}</CardContent>
    </Card>
  )
}

export default App
