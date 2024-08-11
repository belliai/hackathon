"use client"

import React, { useEffect, useRef, useCallback, useState } from "react"
import { useRouter, useSearchParams } from 'next/navigation'
import PageContainer from "@/components/layout/PageContainer"
import { Separator } from "@/components/ui/separator"

type ListProps = {
  name: string
  value: string
  pageComponent: React.ReactNode
}

interface BaseSettingPageProps {
  settingList: ListProps[]
}

const BaseSettingPage: React.FC<BaseSettingPageProps> = ({ settingList }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentTab, setCurrentTab] = useState<string | null>(searchParams.get('section') || '')
  const observerRef = useRef<IntersectionObserver | null>(null)
  const initialScrollCompleted = useRef(false)

  const updateQueryParam = useCallback((value: string) => {
    const currentParams = new URLSearchParams(searchParams.toString())
    if (currentParams.get('section') !== value) {
      currentParams.set('section', value)
      router.push(`?${currentParams.toString()}`, { scroll: false })
    }
  }, [router, searchParams])

  useEffect(() => {
    let intersectionRatios: { [key: string]: number } = {}

    const observerOptions = {
      threshold: new Array(101).fill(0).map((_, i) => i / 100),
      rootMargin: '0px'
    }

    observerRef.current = new IntersectionObserver((entries) => {
      if (!initialScrollCompleted.current) return;

      entries.forEach((entry) => {
        intersectionRatios[entry.target.id] = entry.intersectionRatio
      })

      const mostVisibleElement = Object.keys(intersectionRatios).reduce((a, b) => 
        intersectionRatios[a] > intersectionRatios[b] ? a : b
      )

      if (mostVisibleElement !== currentTab) {
        setCurrentTab(mostVisibleElement)
        updateQueryParam(mostVisibleElement)
      }
    }, observerOptions)

    settingList.forEach((setting) => {
      const element = document.getElementById(setting.value)
      if (element) {
        observerRef.current?.observe(element)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [settingList, updateQueryParam, currentTab])

  useEffect(() => {
    const section = searchParams.get('section')
    if (!section && settingList.length > 0) {
      const firstSection = settingList[0].value
      updateQueryParam(firstSection)
      setCurrentTab(firstSection)
    } else if (section) {
      const element = document.getElementById(section)
      if (element) {
        observerRef.current?.disconnect()
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        setTimeout(() => {
          initialScrollCompleted.current = true
          settingList.forEach((setting) => {
            const element = document.getElementById(setting.value)
            if (element) {
              observerRef.current?.observe(element)
            }
          })
        }, 1000)
      }
    }
  }, [searchParams, settingList, updateQueryParam])

  return (
    <PageContainer className="gap-6">
      {settingList.map((setting) => (
        <div 
          key={setting.value} 
          id={setting.value}
          className="flex flex-col gap-4"
        >
          <h1 className="font-bold">{setting.name}</h1>
          {setting.pageComponent}
          <Separator className="my-4" />
        </div>
      ))}
    </PageContainer>
  )
}

export default BaseSettingPage