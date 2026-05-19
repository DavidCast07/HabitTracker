import  { isSameDay } from "date-fns";
import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { type ReactNode } from "react";

type Context = {
  habits: Habit[]
  addHabit: (name: string) => void
  deleteHabit: (id: string) => void
  toggleHabit: (id: string, date: Date) => void
}

export type Habit = {
  id: string
  name: string
  completions?: Date[]
}

type HabitProviderProps = {
    children: ReactNode
}

export const HabitContext = createContext<Context | null>(null)

export function HabitProvider({ children }: HabitProviderProps) {

    const [habits, setHabits] = useLocalStorage<Habit[]>("Habits", [])
    
      function addHabit(name: string) {
         setHabits((curr: Habit[]) => [...curr, { id: crypto.randomUUID(), name, completions: [] }])
      }
    
    function deleteHabit(id: string) {
         setHabits((curr: Habit[]) => curr.filter(habit => habit.id !== id))
      }
      
      function toggleHabit(id: string, date: Date) {
        setHabits((curr: Habit[]) => (
          curr.map(h => {
            if (h.id !== id) return h
    
            const alreadyDone = h.completions?.some(c => isSameDay(c, date)) ?? false
            const completions = alreadyDone
            ? h.completions?.filter(c => !isSameDay(c, date)) ?? []
            : [...(h.completions ?? []), date]
    
            return {...h, completions}
    
          })
        ))
      }

    return <HabitContext.Provider value={{habits, addHabit, deleteHabit, toggleHabit}}>
      {children}
    </HabitContext.Provider>

} 

export function useHabits() {
    const habitContext = useContext(HabitContext)
    if (habitContext === null) {
        throw new Error("Null context")
    }
    return habitContext
}