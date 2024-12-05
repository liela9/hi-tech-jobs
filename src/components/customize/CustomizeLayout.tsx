'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from "lucide-react"
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
    choices: ['Mannager', 'Experienced', 'Entry level', 'Student']
  },
]

export default function CustomizeLayout() {
  const [currentSlide, setCurrentSlide] = useState(0);

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
    console.log('Form submitted:');
    // Submit logic here
  };

  return (
    <div className="flex flex-col items-center mt-52">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center">{cards[currentSlide].title}</CardTitle>
        </CardHeader>
        <br />
        <CardContent>
          <ToggleGroup size={"lg"} type="multiple">
            {cards[currentSlide].choices.map((choice) => (
              <ToggleGroupItem value={choice}
                className="rounded-lg bg-white text-lg text-muted-foreground font-bold"
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
    </div>
  );
}
