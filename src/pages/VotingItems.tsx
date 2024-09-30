'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation' // Import from next/navigation instead of next/router
import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { fetchVotingItems } from '@/lib/fetchVotingItems'

export default function VotingItems() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('Date Ascending')
  const [timeFrame, setTimeFrame] = useState('2022 - 2026')
  const [votingItems, setVotingItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8 // Set items per page

  const router = useRouter() // Using the updated router hook from next/navigation

  useEffect(() => {
    const loadVotingItems = async () => {
      setLoading(true)
      setError(null)
      try {
        const items = await fetchVotingItems()
        setVotingItems(items)
      } catch (error) {
        setError('Failed to load voting items. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    loadVotingItems()
  }, [])

  const handleItemClick = (item) => {
    router.push(`/voting/${encodeURIComponent(item.ItemID)}`) // Adjusted for next/navigation push
  }

  const totalPages = Math.ceil(votingItems.length / itemsPerPage)

  const currentItems = votingItems
      .filter(item => item.Name.toLowerCase().includes(searchTerm.toLowerCase())) // Filter based on search term
      .slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
      )

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  if (loading) {
    return <div>Loading...</div> // Return loading state
  }

  return (
      <div className="min-h-screen flex flex-col">
        <header className="border-b">
          <div className="container mx-auto px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-bold">Climate</span>
              <span>Voting Record</span>
            </div>
            <nav>
              <ul className="flex space-x-4">
                <li>Voting Records <ChevronDown className="inline-block w-4 h-4" /></li>
                <li>Summary</li>
                <li>What Can I Do?</li>
                <li>Contact Us</li>
              </ul>
            </nav>
          </div>
        </header>

        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Items</h1>

          {error && <p className="text-red-500">{error}</p>}

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-grow">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                      type="text"
                      placeholder="Search items"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                  />
                </div>
                <div className="flex-shrink-0">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <Select.Trigger className="w-[180px]">
                      <Select.Value placeholder="Sort By" />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="Date Ascending">Date Ascending</Select.Item>
                      <Select.Item value="Date Descending">Date Descending</Select.Item>
                    </Select.Content>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                {currentItems.length > 0 ? (
                    currentItems.map((item, index) => (
                        <div
                            key={item.ItemID}
                            onClick={() => handleItemClick(item)}
                            className="block border p-4 rounded hover:bg-gray-100 cursor-pointer"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="text-sm text-gray-500">{item.ItemID}</div>
                              <h2 className="font-semibold">{item.Name}</h2>
                              <div className="text-sm text-gray-500">{item.VoteDate}</div>
                              <p className="text-blue-500 underline text-sm">View Details</p>
                            </div>
                            {item.Result === 'Carried' && (
                                <span className="text-green-500 text-sm">✓ Carried</span>
                            )}
                          </div>
                        </div>
                    ))
                ) : (
                    <p>No voting items found.</p>
                )}
              </div>

              <div className="flex justify-center items-center space-x-4 mt-8">
                <Button variant="outline" size="sm" onClick={handlePrevPage} disabled={currentPage === 1}>
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <span className="font-bold">{currentPage}</span>
                <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages}>
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </div>
            </div>

            <div className="w-full md:w-64 space-y-6">
              {/* Sidebar content remains unchanged */}
              <div>
                <h2 className="font-semibold mb-2">Filter</h2>
                <Button variant="outline" size="sm">Clear</Button>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Result</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox id="carried" />
                    <label htmlFor="carried" className="ml-2">Carried</label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="lost" />
                    <label htmlFor="lost" className="ml-2">Lost</label>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Categories</h3>
                <div className="space-y-2">
                  {['Energy', 'Homes and Buildings', 'Infrastructure', 'Resilience', 'People and Neighbourhoods', 'TransformTO', 'Transportation', 'Waste'].map((category) => (
                      <div key={category} className="flex items-center">
                        <Checkbox id={category} />
                        <label htmlFor={category} className="ml-2">{category}</label>
                      </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Time Frame</h3>
                <div className="flex space-x-2 mb-2">
                  <Button variant="default" size="sm">Cohort</Button>
                  <Button variant="outline" size="sm">Custom</Button>
                </div>
                <Select value={timeFrame} onValueChange={setTimeFrame}>
                  <Select.Trigger className="w-full">
                    <Select.Value placeholder="Select time frame" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="2022 - 2026">2022 - 2026</Select.Item>
                    <Select.Item value="2018 - 2022">2018 - 2022</Select.Item>
                  </Select.Content>
                </Select>
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-gray-100 py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-2">About this Website</h3>
                <ul className="space-y-1">
                  <li>Our Story</li>
                  <li>Get Involved</li>
                  <li>Contact Us</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Join Mailing List</h3>
                <form className="space-y-2">
                  <Input type="email" placeholder="Email address" />
                  <Button type="submit">Sign Up</Button>
                </form>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Land Acknowledgement</h3>
                <p className="text-sm">
                  The Climate Voting Records Project acknowledges that this initiative took place on
                  the traditional territory of many nations including the Mississaugas of the Credit, the
                  Anishnabeg, the Chippewa, the Haudenosaunee and the Wendat peoples and is now
                  home to many diverse First Nations, Inuit and Métis peoples...
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
  )
}
