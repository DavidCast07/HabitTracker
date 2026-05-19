import { Header } from "./components/header"
import { HabitForm } from "./components/habitForm"
import { HabitList } from "./components/habitList"
import { HabitProvider } from "./context/HabitProvider"
import { addWeeks, eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns"
import { useState } from "react"


export default function App() {
  const[weekOffset, setWeekOffset] = useState(0)

  const week = addWeeks( new Date(), weekOffset)
  const visibleDates = eachDayOfInterval({
      start: startOfWeek(week, { weekStartsOn: 1 }),
      end: endOfWeek(week, { weekStartsOn: 1 })
    })

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
      <HabitProvider>
        <Header visibleDates={visibleDates} 
        onPrev={() => setWeekOffset(o => o - 1)}
        onNext={() => setWeekOffset(o => o + 1)}
        />
        <HabitForm/>
        <HabitList visibleDates={visibleDates}/>
      </HabitProvider>
    </div>
  )
} 



