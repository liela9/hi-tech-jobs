'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, MoveRight } from "lucide-react"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { CATEGORIES } from "@/lib/utils"

const cards: Card[] = [
  {
    id: "category",
    title: "Choose categories of jobs",
    choices: CATEGORIES
  },
  {
    id: "level",
    title: "What is your experience level?",
    choices: ['Mannager', 'Experienced', 'Junior', 'Student']
  },
]

let mannagerInclude = ['mannager', 'leader', 'lead']
let mannagerExclude = ['student', 'junior', 'senior', 'developer', 'principal', 'architect']
let experiencedInclude = ['senior', 'developer', 'principal', 'architect']
let experiencedExclude = ['student', 'junior', 'mannager', 'leader', 'lead']
let juniorInclude = ['engineer', 'representative', 'developer']
let juniorExclude = ['mannager', 'leader', 'lead', 'senior', 'principal', 'architect']
let studentInclude = ['student']

export default function CustomizeLayout() {
  let includesKeywords = new Set<string>()
  let excludesKeywords = new Set<string>()

  const [includes, setIncludes] = useState<string[]>([]);
  const [excludes, setExcludes] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedItems, setSelectedItems] = useState<{[key: string]: string[]}>({
    category: [],
    level: []
  });
  const [profileReady, setProfileReady] = useState<boolean>(false);
    
  const handleSelectionChange = (values: string[]) => {
    const currentCardId = cards[currentSlide].id;
    setSelectedItems(prev => ({
      ...prev,
      [currentCardId]: values
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
    if (selectedItems['level'].includes('Mannager')) {
      mannagerInclude.forEach(element => includesKeywords.add(element))
      mannagerExclude.forEach(element => excludesKeywords.add(element))
    }
    
    if (selectedItems['level'].includes('Experienced')) {
      experiencedInclude.forEach(element => includesKeywords.add(element))
      experiencedExclude.forEach(element => excludesKeywords.add(element))
    }
    
    if (selectedItems['level'].includes('Junior')) {
      juniorInclude.forEach(element => includesKeywords.add(element))
      juniorExclude.forEach(element => excludesKeywords.add(element))
    }
    
    if (selectedItems['level'].includes('Student')) {
      studentInclude.forEach(element => includesKeywords.add(element))
    }

    console.log('includes:', Array.from(includesKeywords))
    console.log('excludes:', Array.from(excludesKeywords))
    setIncludes(Array.from(includesKeywords))
    setExcludes(Array.from(excludesKeywords))  
    setProfileReady(true)
  };

  return (
    <div className="flex flex-col items-center mt-52">
      {!profileReady ? ( 
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center">{cards[currentSlide].title}</CardTitle>
          </CardHeader>
          <br />
          <CardContent>
            <ToggleGroup 
              size={"lg"} 
              type="multiple"
              value={selectedItems[cards[currentSlide].id]}
              onValueChange={handleSelectionChange}
              >
              {cards[currentSlide].choices.map((choice) => (
                <ToggleGroupItem value={choice}
                className="rounded-lg bg-white text-lg text-muted-foreground font-bold h-16"
                key={choice}>
                  {choice}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </CardContent>
          <br />
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
      ) : (
        <Link 
        href={{
          pathname: '/customize/filter',
          query: { includes: JSON.stringify(Array.from(includes)), excludes: JSON.stringify(Array.from(excludes)) },
        }}
        >
          <Button 
            className="p-6 font-bold text-lg my-24"
            size="sm"
            >
            Start explore jobs
            <MoveRight className="ml-2 h-4 w-4"/>
          </Button>
        </Link>
      )}
    </div>
  );
}