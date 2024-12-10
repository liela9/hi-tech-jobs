'use client'

import { useState } from 'react'
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

const mannagerInclude = ['mannager', 'leader', 'lead']
const mannagerExclude = ['student', 'junior', 'senior', 'developer', 'principal', 'architect']
const experiencedInclude = ['senior', 'developer', 'principal', 'architect']
const experiencedExclude = ['student', 'junior', 'mannager', 'leader', 'lead']
const juniorInclude = ['engineer', 'representative', 'developer']
const juniorExclude = ['mannager', 'leader', 'lead', 'senior', 'principal', 'architect']
const studentInclude = ['student']

export default function CustomizeLayout() {
  const includesKeywords = new Set<string>()
  const excludesKeywords = new Set<string>()
  const categories = new Set<string>()
  
  const [includes, setIncludes] = useState<string[]>([]);
  const [excludes, setExcludes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
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
  
  function checkedLevel() {
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
  }

  function checkedCategory() {
    for (const category of selectedItems['category']) {
      categories.add(category)
    }
  }
  
  const handleSubmit = () => {
    checkedLevel()
    checkedCategory()
    
    setIncludes(Array.from(includesKeywords))
    setExcludes(Array.from(excludesKeywords)) 
    setSelectedCategories(Array.from(categories))

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
              size="lg"
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
          query: { includes: JSON.stringify(Array.from(includes)), excludes: JSON.stringify(Array.from(excludes)), categories: JSON.stringify(Array.from(selectedCategories)) },
        }}
        >
          <Button 
            className="p-6 font-bold text-lg my-24"
            size="sm"
            >
            Custom filtering
          </Button>
        </Link>
      )}
    </div>
  );
}
