"use client";

import { useAppSelector } from '@/app/redux';
import Header from '@/components/Header';
import { useGetProjectsQuery } from '@/state/api';
import { DisplayOption, Gantt, ViewMode } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css'
import React, { useMemo, useState } from 'react'

type TaskTypeItems = "task" | "milestone" | "project";

const Timeline = () => {
  const isDarkMode = useAppSelector(
    (state) => state.global.isDarkMode
  )
  
  const { data: projects, isLoading, isError } = useGetProjectsQuery()
  
  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US"
  })

  const ganttTask = useMemo(() => {
    return(
        projects?.map((project) => ({
            start: new Date(project.startDate as string),
            end: new Date(project.endDate as string),
            name: project.name,
            id: `Project-${project.id}`,
            type: "project" as TaskTypeItems,
            progress: 50,
            isDisabled: false
        })) || []
    )
  }, [projects])

  const handleViewModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDisplayOptions((prev) => ({
        ...prev,
        viewMode: event.target.value as ViewMode,
    }))
  }

  if(isLoading) return <div>Loading...</div>
  if(isError || !projects) return console.error(isError)

  return (
    <div className='max-w-full p-8'>
        <header className='mb-4 flex items-center justify-between'>
            <Header 
                name='Projects Timeline'
            />
            <div className='relative inline-block w-64'>
                <select 
                    className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none dark:border-dark-secodary dark:bg-dark-secodary dark:text-white"
                    value={displayOptions.viewMode}
                    onChange={handleViewModeChange}
                >
                    <option value={ViewMode.Day}>Day</option>
                    <option value={ViewMode.Week}>Week</option>
                    <option value={ViewMode.Month}>Month</option>     
                </select>
            </div>
        </header>
        
        <div className='overflow-hidden rounded-md bg-white shadow dark:bg-dark-secodary dark:text-white'>
            <div className='timeline'>
                <Gantt 
                    tasks={ganttTask}
                    {...displayOptions}
                    columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
                    listCellWidth='100px'
                    projectBackgroundColor={isDarkMode ? "#101214" : "#1F29317"}
                    projectProgressColor={isDarkMode ? "#1F2937" : "#AEB8C2"}
                    projectProgressSelectedColor={isDarkMode ? "#000" : "#9BA1A6"}
                />
            </div>
        </div>
    </div>
  )
}

export default Timeline