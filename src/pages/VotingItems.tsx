'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { fetchVotingItems } from '@/lib/fetchVotingItems'

interface VotingItem {
  ItemID: string
  Name: string
  VoteDate: string
  Result: 'Carried' | 'Lost'
  Categories: string[]
}

interface Filters {
  result: {
    carried: boolean
    lost: boolean
  }
  categories: string[]
}

export default function VotingItems() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [sortBy, setSortBy] = useState<'Date Ascending' | 'Date Descending'>('Date Ascending');
  const [votingItems, setVotingItems] = useState<VotingItem[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<Filters>({
    result: {
      carried: false,
      lost: false,
    },
    categories: [],
  })

  const itemsPerPage = 8

  const categories: string[] = [
    'Energy', 'Homes and Buildings', 'Infrastructure', 'Resilience',
    'People and Neighbourhoods', 'TransformTO', 'Transportation', 'Waste'
  ]

  const router = useRouter()

  useEffect(() => {
    const loadVotingItems = async () => {
      setLoading(true)
      try {
        const items: VotingItem[] = await fetchVotingItems()
        setVotingItems(items)
      } catch (error) {
        // Error handling removed
        console.error('Failed to load voting items', error)
      } finally {
        setLoading(false)
      }
    }

    loadVotingItems()
  }, [])

  const handleItemClick = (item: VotingItem) => {
    router.push(`/voting/${encodeURIComponent(item.ItemID)}`)
  }

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

  const handleFilterChange = (type: 'result', value: { carried: boolean, lost: boolean }) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: value
    }))
  }

  const handleCategoryChange = (category: string) => {
    setFilters((prevFilters) => {
      const isSelected = prevFilters.categories.includes(category)
      const newCategories = isSelected
          ? prevFilters.categories.filter((c) => c !== category)
          : [...prevFilters.categories, category]
      return {
        ...prevFilters,
        categories: newCategories
      }
    })
  }

  const handleClearFilters = () => {
    setFilters({
      result: {
        carried: false,
        lost: false,
      },
      categories: [],
    })
  }

  const filteredItems = votingItems.filter((item) => {
    const matchesSearch = item.Name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesResult = (filters.result.carried && item.Result === 'Carried') ||
        (filters.result.lost && item.Result === 'Lost') ||
        (!filters.result.carried && !filters.result.lost)
    const matchesCategory = filters.categories.length === 0 ||
        filters.categories.some((category) => item.Categories.includes(category))

    return matchesSearch && matchesResult && matchesCategory
  }).sort((a, b) => {
    if (sortBy === 'Date Ascending') {
      return new Date(a.VoteDate).getTime() - new Date(b.VoteDate).getTime()
    } else {
      return new Date(b.VoteDate).getTime() - new Date(a.VoteDate).getTime()
    }
  })

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const currentItems = filteredItems.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
  )

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  type SelectTriggerProps = {
    children: React.ReactNode;
    className?: string; // Add className prop
  };

// In your Select.Trigger component
  const SelectTrigger: React.FC<SelectTriggerProps> = ({ children, className }) => {
    return <div className={className}>{children}</div>; // Apply className to a wrapping element
  };

  return (
      <div className="min-h-screen flex flex-col bg-white text-black">
        <header className="border-b border-black">
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
          <h1 className="text-2xl font-bold mb-4">Motions</h1>

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
                      className="pl-10 border-black"
                  />
                </div>
                <div className="flex-shrink-0">
                  <div className="flex-shrink-0">
                    <div className="flex-shrink-0">
                      <Select value={sortBy} onValueChange={(value: string) => setSortBy(value as 'Date Ascending' | 'Date Descending')}>
                        <div className="w-[180px] border-black">
                          <Select.Trigger>
                            <Select.Value placeholder="Sort By" />
                          </Select.Trigger>
                        </div>
                        <Select.Content>
                          <Select.Item value="Date Ascending">Date Ascending</Select.Item>
                          <Select.Item value="Date Descending">Date Descending</Select.Item>
                        </Select.Content>
                      </Select>
                    </div>

                  </div>

                </div>
              </div>

              <div className="space-y-4">
                {currentItems.length > 0 ? (
                    currentItems.map((item) => (
                        <div
                            key={item.ItemID}
                            onClick={() => handleItemClick(item)}
                            className="block border border-black p-4 rounded hover:bg-gray-100 cursor-pointer"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="text-sm text-gray-500">{item.ItemID}</div>
                              <h2 className="font-semibold">{item.Name}</h2>
                              <div className="text-sm text-gray-500">{item.VoteDate}</div>
                              <p className="underline text-sm">View Details</p>
                            </div>
                            {item.Result === 'Carried' && (
                                <span className="text-sm">✓ Carried</span>
                            )}
                          </div>
                        </div>
                    ))
                ) : (
                    <p>No voting items found.</p>
                )}
              </div>

              <div className="flex justify-center items-center space-x-4 mt-8">
                <Button variant="outline" size="sm" onClick={handlePrevPage} disabled={currentPage === 1} className="border-black text-black">
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <span className="font-bold">{currentPage}</span>
                <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages} className="border-black text-black">
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </div>
            </div>

            <div className="w-full md:w-64 space-y-6">
              <div>
                <h2 className="font-semibold mb-2">Filter</h2>
                <Button variant="outline" size="sm" onClick={handleClearFilters} className="border-black text-black">Clear</Button>
                <div className="flex flex-col space-y-2">
                  <h3 className="font-semibold mb-2">Results</h3>
                  <Checkbox
                      label="Carried"
                      checked={filters.result.carried}
                      onChange={() => handleFilterChange('result', { carried: !filters.result.carried, lost: filters.result.lost })}
                  />
                  <Checkbox
                      label="Lost"
                      checked={filters.result.lost}
                      onChange={() => handleFilterChange('result', { carried: filters.result.carried, lost: !filters.result.lost })}
                  />
                  <h3 className="font-semibold mb-2">Categories</h3>
                  <div className="flex flex-col space-y-2">
                    {categories.map((category) => (
                        <Checkbox
                            key={category}
                            label={category}
                            checked={filters.categories.includes(category)}
                            onChange={() => handleCategoryChange(category)}
                        />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
  )
}
