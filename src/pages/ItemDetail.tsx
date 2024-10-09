// import { useState } from 'react'
// import { Search, ChevronDown } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
//
// interface CouncilMember {
//   name: string
//   ward: string
//   vote: 'Yes' | 'No'
//   image: string
// }
//
// export default function ItemDetail() {
//   const [searchTerm, setSearchTerm] = useState('')
//
//   const councilMembers: CouncilMember[] = [
//     { name: 'Paul Ainslie', ward: 'Ward 24, Scarborough-Guildwood', vote: 'Yes', image: '/placeholder.svg' },
//     { name: 'Ana Bailão', ward: 'Ward 9, Davenport', vote: 'Yes', image: '/placeholder.svg' },
//     { name: 'Brad Bradford', ward: 'Ward 19, Beaches-East York', vote: 'Yes', image: '/placeholder.svg' },
//     { name: 'Shelley Carroll', ward: 'Ward 17, Don Valley North', vote: 'Yes', image: '/placeholder.svg' },
//     { name: 'Mike Colle', ward: 'Ward 8, Eglinton-Lawrence', vote: 'Yes', image: '/placeholder.svg' },
//     { name: 'Gary Crawford', ward: 'Ward 20, Scarborough Southwest', vote: 'Yes', image: '/placeholder.svg' },
//     { name: 'Joe Cressy', ward: 'Ward 10, Spadina-Fort York', vote: 'Yes', image: '/placeholder.svg' },
//     { name: 'John Filion', ward: 'Ward 18, Willowdale', vote: 'Yes', image: '/placeholder.svg' },
//     { name: 'Paula Fletcher', ward: 'Ward 14, Toronto-Danforth', vote: 'Yes', image: '/placeholder.svg' },
//     { name: 'Michael Ford', ward: 'Ward 1, Etobicoke North', vote: 'No', image: '/placeholder.svg' },
//     // Add more council members here...
//   ]
//
//   const filteredMembers = councilMembers.filter(member =>
//       member.name.toLowerCase().includes(searchTerm.toLowerCase())
//   )
//
//   return (
//       <div className="min-h-screen flex flex-col">
//         <header className="border-b">
//           <div className="container mx-auto px-4 py-2 flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <span className="font-bold">Climate</span>
//               <span>Voting Record</span>
//             </div>
//             <nav>
//               <ul className="flex space-x-4">
//                 <li>Voting Records <ChevronDown className="inline-block w-4 h-4" /></li>
//                 <li>Summary</li>
//                 <li>What Can I Do?</li>
//                 <li>Contact Us</li>
//               </ul>
//             </nav>
//           </div>
//         </header>
//
//         <main className="flex-grow container mx-auto px-4 py-8">
//           <div className="mb-6">
//             <h1 className="text-2xl font-bold mb-2">2021.IE26.16</h1>
//             <h2 className="text-xl font-semibold mb-4">TransformTO - Critical Steps for Net Zero by 2040</h2>
//             <p className="text-sm text-gray-500">Nov 19, 2021</p>
//           </div>
//
//           <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-6">
//             <span className="font-semibold">Result:</span> Carried
//             <span className="ml-4">Yes: 24</span>
//             <span className="ml-4">No: 3</span>
//             <span className="ml-4">Absent: 1</span>
//           </div>
//
//           <div className="mb-6">
//             <h3 className="font-semibold mb-2">Background</h3>
//             <p className="text-sm">
//               {/* eslint-disable-next-line react/no-unescaped-entities */}
//               "The climate crisis grows more urgent every year. The window to make significant and lasting
//               change is disappearing. Action must happen immediately and it must be at the necessary
//               {/* eslint-disable-next-line react/no-unescaped-entities */}
//               scale required to respond to this crisis." In response, the Net Zero Strategy targets new and
//               accelerated actions to drive down community-wide emissions, particularly in the near- and
//               the short term, and establishes the trajectory needed to reach net zero by 2040.
//             </p>
//             <Button variant="link" className="text-sm p-0">Read More</Button>
//           </div>
//
//           <div className="mb-6">
//             <h3 className="font-semibold mb-2">Details</h3>
//             <p className="text-sm">
//               {/* eslint-disable-next-line react/no-unescaped-entities */}
//               This item "recommends that Toronto adopt a new net zero by 2040 goal. By doing so,
//               Toronto will ensure alignment with the 2030 trajectory to meet the necessary science-based
//               {/* eslint-disable-next-line react/no-unescaped-entities */}
//               commitments to keep the planet's temperature habitable."
//             </p>
//             <Button variant="link" className="text-sm p-0">Read More</Button>
//           </div>
//
//           <div className="mb-6">
//             <h3 className="font-semibold mb-2">Proposed by</h3>
//             <p className="text-sm">Infrastructure and Environment Committee</p>
//           </div>
//
//           <div>
//             <h3 className="font-semibold mb-4">Votes</h3>
//             <div className="relative mb-4">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <Input
//                   type="text"
//                   placeholder="Search councillors"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10"
//               />
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//               {filteredMembers.map((member, index) => (
//                   <div key={index} className="border rounded p-4 flex items-center space-x-4">
//                     <img src={member.image} alt={member.name} className="w-12 h-12 rounded-full" />
//                     <div>
//                       <p className="font-semibold">{member.name}</p>
//                       <p className="text-sm text-gray-500">{member.ward}</p>
//                       <p className={`text-sm ${member.vote === 'Yes' ? 'text-green-600' : 'text-red-600'}`}>
//                         {member.vote}
//                       </p>
//                     </div>
//                   </div>
//               ))}
//             </div>
//           </div>
//         </main>
//
//         <footer className="bg-gray-100 py-8">
//           <div className="container mx-auto px-4">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               <div>
//                 <h3 className="font-semibold mb-2">About this Website</h3>
//                 <ul className="space-y-1 text-sm">
//                   <li>Our Story</li>
//                   <li>Get Involved</li>
//                   <li>Contact Us</li>
//                 </ul>
//               </div>
//               <div>
//                 <h3 className="font-semibold mb-2">Join Mailing List</h3>
//                 <form className="space-y-2">
//                   <Input type="email" placeholder="Email address" />
//                   <Button type="submit">Sign Up</Button>
//                 </form>
//               </div>
//               <div>
//                 <h3 className="font-semibold mb-2">Land Acknowledgement</h3>
//                 <p className="text-sm">
//                   The Climate Voting Records Project acknowledges that this initiative took place on
//                   the traditional territory of many nations including the Mississaugas of the Credit, the
//                   Anishnabeg, the Chippewa, the Haudenosaunee and the Wendat peoples and is now
//                   home to many diverse First Nations, Inuit and Métis peoples...
//                 </p>
//               </div>
//             </div>
//           </div>
//         </footer>
//       </div>
//   )
// }