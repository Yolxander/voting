"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"

type Councillor = {
    id: number
    name: string
    ward: string
    image: string
}

const councillors: Councillor[] = [
    { id: 1, name: "Paul Ainslie", ward: "Ward 24, Scarborough-Guildwood", image: "/placeholder.svg" },
    { id: 2, name: "Jennifer McKelvie", ward: "Ward 25, Scarborough-Rouge Park", image: "/placeholder.svg" },
    // Add more councillors here...
]

const councils = [
    "Etobicoke York Community",
    "North York Community",
    "Scarborough Community",
    "Toronto and East York Community"
]

export default function CouncillorList() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCouncils, setSelectedCouncils] = useState<string[]>([])
    const [timeframe, setTimeframe] = useState("2022-2026")

    const filteredCouncillors = councillors.filter((councillor) =>
        councillor.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="container mx-auto p-4">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Voting Record</h1>
                <nav>
                    <a href="#" className="mr-4">About</a>
                    <a href="#" className="mr-4">Voting Records</a>
                    <a href="#" className="mr-4">What Can I Do?</a>
                    <a href="#">Contact Us</a>
                </nav>
            </header>

            <h2 className="text-xl font-semibold mb-4">Councillors</h2>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-3/4">
                    <Input
                        type="search"
                        placeholder="Search councillor"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="mb-4"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredCouncillors.map((councillor) => (
                            <div key={councillor.id} className="border p-4 rounded-lg">
                                <Image
                                    src={councillor.image}
                                    alt={councillor.name}
                                    width={100}
                                    height={100}
                                    className="rounded-full mb-2"
                                />
                                <h3 className="font-semibold">{councillor.name}</h3>
                                <p className="text-sm text-gray-600">{councillor.ward}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="md:w-1/4">
                    <div className="border p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Filter</h3>
                        <Button variant="outline" size="sm" className="mb-2" onClick={() => setSelectedCouncils([])}>
                            Clear
                        </Button>

                        <h4 className="font-medium mt-4 mb-2">Council</h4>
                        {councils.map((council) => (
                            <div key={council} className="flex items-center mb-2">
                                <Checkbox
                                    id={council}
                                    checked={selectedCouncils.includes(council)}
                                    onCheckedChange={(checked) => {
                                        setSelectedCouncils(
                                            checked
                                                ? [...selectedCouncils, council]
                                                : selectedCouncils.filter((c) => c !== council)
                                        )
                                    }}
                                />
                                <label htmlFor={council} className="ml-2 text-sm">
                                    {council}
                                </label>
                            </div>
                        ))}

                        <h4 className="font-medium mt-4 mb-2">Timeframe</h4>
                        <div className="flex items-center mb-2">
                            <Checkbox
                                id="2022-2026"
                                checked={timeframe === "2022-2026"}
                                onCheckedChange={() => setTimeframe("2022-2026")}
                            />
                            <label htmlFor="2022-2026" className="ml-2 text-sm">
                                2022-2026
                            </label>
                        </div>
                        <div className="flex items-center mb-2">
                            <Checkbox
                                id="active"
                                checked={timeframe === "active"}
                                onCheckedChange={() => setTimeframe("active")}
                            />
                            <label htmlFor="active" className="ml-2 text-sm">
                                Show active councillors only
                            </label>
                        </div>
                        <div className="flex items-center">
                            <Checkbox
                                id="2018-2022"
                                checked={timeframe === "2018-2022"}
                                onCheckedChange={() => setTimeframe("2018-2022")}
                            />
                            <label htmlFor="2018-2022" className="ml-2 text-sm">
                                2018-2022
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}