import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import './/../../app/globals.css'

interface CouncilMember {
  name: string
  ward: string
  vote: 'Yes' | 'No'
  image: string
}

interface VotingItem {
  ItemID: string
  Name: string
  VoteDate: string
  Result: 'Carried' | 'Lost'
  Categories: string[]
}

const API_BASE_URL = 'https://climatefast.webcomand.com/ws/get'
const API_KEY = '6njQdl3IpkiuMODvQoXdPoV9RQ3vkUXM'

async function fetchVotingItem(itemId: string): Promise<VotingItem | null> {
  try {
    const response = await fetch(`${API_BASE_URL}?query=SELECT * FROM Motion WHERE ItemID='${itemId}'`, {
      headers: {
        'Authorization': `Token ${API_KEY}`,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    // Log the contents key to verify that it holds the voting items
    console.log('Full API response:', data)
    console.log('Contents:', data.contents)

    // Check if contents exist and is an array, return it if so
    if (data.contents && Array.isArray(data.contents)) {
      return data.contents[0]; // Assuming you're interested in the first item
    } else {
      throw new Error('Unexpected data structure in contents')
    }
  } catch (error) {
    console.error('Error fetching voting item:', error)
    return null
  }
}

export default function ItemDetail() {
  const [searchTerm, setSearchTerm] = useState('')
  const [votingItem, setVotingItem] = useState<VotingItem | null>(null)
  const router = useRouter()
  const itemId = '2020.IE15.11'; // Get itemId safely from router.query

  useEffect(() => {
    if (itemId) {
      // Fetch specific voting item details if needed
      const loadVotingItem = async () => {
        try {
          // Call the correct function to fetch the voting item
          const votingItem = await fetchVotingItem(itemId);
          setVotingItem(votingItem);
        } catch (error) {
          console.error('Failed to load voting item:', error);
          alert('Failed to load voting item. Please try again later.');
        }
      }
      loadVotingItem();
    }
  }, [itemId]);

  const councilMembers: CouncilMember[] = [
    { name: 'Paul Ainslie', ward: 'Ward 24, Scarborough-Guildwood', vote: 'Yes', image: '/placeholder.svg?height=48&width=48' },
    { name: 'Ana Bailão', ward: 'Ward 9, Davenport', vote: 'Yes', image: '/placeholder.svg?height=48&width=48' },
    { name: 'Brad Bradford', ward: 'Ward 19, Beaches-East York', vote: 'Yes', image: '/placeholder.svg?height=48&width=48' },
    { name: 'Shelley Carroll', ward: 'Ward 17, Don Valley North', vote: 'Yes', image: '/placeholder.svg?height=48&width=48' },
    { name: 'Mike Colle', ward: 'Ward 8, Eglinton-Lawrence', vote: 'Yes', image: '/placeholder.svg?height=48&width=48' },
    { name: 'Gary Crawford', ward: 'Ward 20, Scarborough Southwest', vote: 'Yes', image: '/placeholder.svg?height=48&width=48' },
    // Add more council members as needed
  ]

  const filteredMembers = councilMembers.filter(member =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
      <div className="min-h-screen flex flex-col bg-white text-black">
        <header className="border-b border-black">
          <div className="container mx-auto px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-bold">Voting Item Details</span>
            </div>
            <nav>
              <ul className="flex space-x-4">
                <li className="flex items-center">Voting Records <ChevronDown className="inline-block w-4 h-4 ml-1" /></li>
                <li>Summary</li>
                <li>What Can I Do?</li>
                <li>Contact Us</li>
              </ul>
            </nav>
          </div>
        </header>

        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">2021.IE26.16</h1>
            <h2 className="text-xl font-semibold mb-4">TransformTO - Critical Steps for Net Zero by 2040</h2>
            <p className="text-sm text-gray-600">Nov 19, 2021</p>
          </div>

          <div className="bg-gray-100 px-4 py-2 rounded mb-6">
            <span className="font-semibold">Result:</span> Carried
            <span className="ml-4">Yes: 24</span>
            <span className="ml-4">No: 3</span>
            <span className="ml-4">Absent: 1</span>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Background</h3>
            <p className="text-sm">
              "The climate crisis grows more urgent every year. The window to make significant and lasting
              change is disappearing. Action must happen immediately and it must be at the necessary
              scale required to respond to this crisis." In response, the Net Zero Strategy targets new and
              accelerated actions to drive down community-wide emissions, particularly in the near- and
              the short term, and establishes the trajectory needed to reach net zero by 2040.
            </p>
            <Button variant="link" className="text-sm p-0 mt-2">Read More</Button>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Details</h3>
            <p className="text-sm">
              This item "recommends that Toronto adopt a new net zero by 2040 goal. By doing so,
              Toronto will ensure alignment with the 2030 trajectory to meet the necessary science-based
              commitments to keep the planet's temperature habitable."
            </p>
            <Button variant="link" className="text-sm p-0 mt-2">Read More</Button>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Proposed by</h3>
            <p className="text-sm">Infrastructure and Environment Committee</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Votes</h3>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                  type="text"
                  placeholder="Search councillors"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-black"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMembers.map((member, index) => (
                  <div key={index} className="border border-black rounded p-4 flex items-center space-x-4">
                    <img src={member.image} alt={member.name} className="w-12 h-12 rounded-full" />
                    <div>
                      <p className="font-semibold">{member.name}</p>
                      <p className="text-sm text-gray-600">{member.ward}</p>
                      <p className={`text-sm font-medium ${member.vote === 'Yes' ? 'text-black' : 'text-gray-600'}`}>
                        {member.vote}
                      </p>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </main>

        <footer className="bg-gray-100 py-8 border-t border-black">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-2">About this Website</h3>
                <ul className="space-y-1 text-sm">
                  <li>Our Story</li>
                  <li>Get Involved</li>
                  <li>Contact Us</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Join Mailing List</h3>
                <form className="space-y-2">
                  <Input type="email" placeholder="Email address" className="border-black" />
                  <Button type="submit" className="bg-black text-white hover:bg-gray-800">Sign Up</Button>
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
