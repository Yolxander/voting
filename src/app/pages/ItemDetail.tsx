import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { fetchVotingItems } from '@/lib/fetchVotingItems'

export default function ItemDetail() {
  const router = useRouter()
  const { itemId } = router.query
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!itemId) return

    const loadItemDetails = async () => {
      setLoading(true)
      setError(null)
      try {
        const items = await fetchVotingItems()
        const selectedItem = items.find(i => i.ItemID === itemId)
        setItem(selectedItem)
      } catch (error) {
        setError('Failed to load item details. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    loadItemDetails()
  }, [itemId])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  if (!item) return <p>Item not found.</p>

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-2">
          <h1 className="font-bold text-2xl">{item.Name}</h1>
          <p className="text-sm text-gray-500">{item.VoteDate}</p>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-4">Details</h2>
        <p className="text-sm mb-4">{item.ItemDetails}</p>
        <Button as="a" href={item.ItemSourceURL} target="_blank" rel="noopener noreferrer" variant="link">
          View Source
        </Button>

        <div className="mt-6">
          <h3 className="text-lg font-semibold">Result</h3>
          <p>{item.Result}</p>
        </div>
      </main>
    </div>
  )
}
