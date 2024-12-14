'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import { ChevronLeft, ChevronRight } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, 
  CardFooter, 
  CardContent, 
  CardHeader, 
  CardDescription,
  CardTitle } from "@/components/ui/card"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

import { ROOT_PATH } from "@/lib/utils"

interface FilterLayoutProps {
  includes: string[];
  excludes: string[];
  categories: string[];
}

async function postUserPreferences(includes: string[], excludes: string[], categories: string[]) {
  try {
    await fetch(`${ROOT_PATH}/api/filter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({ includes: includes, excludes: excludes, categories: categories}),
    })
  } catch (error) {
    console.error(`Error message: `, error);
  }
}

async function loadJobs(includes: string[], excludes: string[], categories: string[]) {
  try {
    // clear jobs table from previous data
    await fetch(`${ROOT_PATH}/api/jobs`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }, 
    })
    
    const encodedData = JSON.stringify({ keywords: includes, blacklist: excludes, categories: categories })
    
    // read jobs from source
    const res = await fetch(`${ROOT_PATH}/api/initialization?data=${encodedData}`, {
      method: 'GET',
    })
    
    const jobs = await res.json()
    
    // insert data to DB
    await fetch(`${ROOT_PATH}/api/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({ jobs: jobs }),
    })
  } catch (error) {
    console.error(`Error message: `, error);
  }
}

export default function FilterLayout({includes, excludes, categories}: FilterLayoutProps) {
  const router = useRouter()
  const [inputValue, setInputValue] = useState<string>('')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedItems, setSelectedItems] = useState<{[key: string]: string[]}>({
    includes: [],
    excludes: []
  });  
  
  const [cards, setCards] = useState([
    {
      id: "includes",
      title: "Choose includes",
      description: "Select keywords to be included in jobs title",
      choices: includes
    },
    {
      id: "excludes",
      title: "Choose excludes",
      description: "Select keywords that jobs containing them WILL NOT be displayed",
      choices: excludes
    },
  ])

  const handleAddItem = () => {
    const currentCardId = cards[currentSlide].id;
    const item = inputValue.trim()

    if (item === '') return; 

    setSelectedItems((prev) => ({
      ...prev,
      [currentCardId]: [...prev[currentCardId], item], 
    }));

    setCards((prevCards) => {
      const updatedCards = [...prevCards];
      updatedCards[currentSlide] = {
        ...updatedCards[currentSlide],
        choices: [...updatedCards[currentSlide].choices, inputValue.trim()],
      };
      return updatedCards;
    });  

    setInputValue(''); // clear the input field
  }

  const handleSelectionChange = (newItems: string[]) => {
    const currentCardId = cards[currentSlide].id;
    setSelectedItems(prev => ({
      ...prev,
      [currentCardId]: newItems
    }));
  };  

  const handleNext = () => {
    if (currentSlide < cards.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };
  
  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    let blacklist = []
    const userIncludes = cards[0].choices
    const userExcludes = cards[1].choices

    // the blacklist will contain the words in 'excludes' and not in 'includes'
    for (const word of userExcludes) {
      if (!userIncludes.includes(word)) {
        blacklist.push(word)
      }
    }

    // Save user preferences in the database
    postUserPreferences(userIncludes, blacklist, categories)

    // Fill database with jobs
    loadJobs(userIncludes, blacklist, categories)

    router.push(`${ROOT_PATH}/jobs`)
  }

  return (
    <div className="flex flex-col max-w-fit max-h-full items-center">
        <Card className="w-full">
          <CardHeader className='gap-3'>
            <CardTitle className="text-center">{cards[currentSlide].title}</CardTitle>
            <CardDescription>{cards[currentSlide].description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ToggleGroup 
              className="flex flex-col"
              size="lg"
              type="multiple"
              value={selectedItems[cards[currentSlide].id]}
              onValueChange={handleSelectionChange}
              >
              {cards[currentSlide].choices.map((choice) => (
                <ToggleGroupItem value={choice}
                className="rounded-lg bg-white text-base text-muted-foreground font-bold"
                key={choice}>
                  {choice}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <br />
            <div className="flex space-x-2">
              <Input 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter new keyword"
                className="flex-grow"
                />
              <Button variant="outline" onClick={handleAddItem}>
                Add
              </Button>
            </div>
          </CardContent>
          <CardFooter className="w-full bg-slate-100 p-4">
            <div className="w-full flex justify-between">
                <Button
                    className=" hover:bg-white"
                    variant="ghost"
                    size="sm"
                    onClick={handlePrev}
                    disabled={currentSlide === 0}
                    >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
                {currentSlide < cards.length - 1 ? (
                  <Button
                  className="hover:bg-white"
                  variant="ghost"
                  size="sm"
                  onClick={handleNext}
                  disabled={currentSlide === cards.length - 1}
                  >
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                  className="bg-black"
                  size="sm"
                  onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                )}
            </div>
          </CardFooter>
      </Card> 
    </div>
  );
}