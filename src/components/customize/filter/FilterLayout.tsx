'use client'

import React, { useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { ROOT_PATH } from "@/lib/utils";
import { MoveRight } from 'lucide-react'

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
        
        // read data from source
        const res = await fetch(`${ROOT_PATH}/api/initialization?data=${encodedData}`, {
            method: 'GET',
        })
        const jobs = await res.json()
        console.log('jobs:',jobs)

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

    const handleAddItem = () => {
        if (inputValue.trim() && !keywords.includes(inputValue.trim())) {
            setKeywords([...keywords, inputValue.trim()])
            setInputValue('')
        }
  }

  const handleSubmit = () => {
    // Save user preferences in the database
    postUserPreferences(includes, excludes, categories)

    // Fill database with jobs
    loadJobs(keywords, excludes, categories)
  }

  return (
    <Card className="w-full max-w-md flex flex-col items-center mt-36 p-6">
      <CardHeader>
        <CardTitle>Keywords</CardTitle>
        <CardDescription>
            Select the keywords you want to see in job titles.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="space-y-2">
            {keywords.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox 
                  id={`checkbox-${index}`}
                />
                <Label htmlFor={`checkbox-${index}`} className='text-md font-bold'>
                  {item}
                </Label>
              </div>
            ))}
          </div>

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
        </div>  
      </CardContent>
    </Card>
  )
}