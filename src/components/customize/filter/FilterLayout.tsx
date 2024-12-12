'use client'

import React, { useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle } from "@/components/ui/card"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

import { ROOT_PATH } from "@/lib/utils"
import { MoveRight, X } from 'lucide-react'

interface FilterLayoutProps {
    includes: string[];
    excludes: string[];
    categories: string[];
}

async function postUserPreferences(includes: string[], excludes: string[], categories: string[]) {
    try {
      await fetch(`${ROOT_PATH}/api/filter`, {
        method: 'POST',
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
            body: JSON.stringify({ jobs: jobs }),
        })
    } catch (error) {
        console.error(`Error message: `, error);
    }
}

export default function FilterLayout({includes, excludes, categories}: FilterLayoutProps) {
  const [keywords, setKeywords] = useState<string[]>(includes)
  const [inputValue, setInputValue] = useState<string>('')
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const handleAddItem = () => {
    if (inputValue.trim() && !keywords.includes(inputValue.trim())) {
        setKeywords([...keywords, inputValue.trim()])
        setInputValue('')
    }
  }

  const handleDeleteItem = (item: string) => {
    setKeywords((prev) => prev.filter((keyword) => keyword !== item));
    setSelectedItems((prev) => prev.filter((selected) => selected !== item));
  };

  const handleSelectionChange = (newItems: string[]) => {
    setSelectedItems((prev) => [...new Set([...prev, ...newItems])]);
  };  

  const handleSubmit = () => {
    // Save user preferences in the database
    postUserPreferences(selectedItems, excludes, categories)

    // Fill database with jobs
    loadJobs(selectedItems, excludes, categories)
  }

  return (
    <Card className="w-full max-w-fit max-h-fit flex flex-col items-center p-5">
      <CardHeader>
        <CardTitle>Keywords</CardTitle>
        <CardDescription>
            Select the keywords you want to see in job titles.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ToggleGroup className="flex flex-col"
          size="lg"
          type="multiple"
          value={selectedItems}
          onValueChange={handleSelectionChange}
          >
          {keywords.map((item) => (
          <div key={item}>
            <ToggleGroupItem value={item}
            className="rounded-lg bg-white text-base text-muted-foreground font-bold "
            key={item}>
              {item}
            </ToggleGroupItem>
            <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDeleteItem(item)}
            className="text-red-500"
            >
            <X className="h-4 w-4" />
            </Button>
          </div>
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
        <br />
        <Button 
            onClick={handleSubmit} 
            className="w-full p-4 font-bold text-lg"
            >
            Start explore jobs
            <MoveRight className="ml-2 h-4 w-4"/>
        </Button>
      </CardContent>
    </Card>
  )
}