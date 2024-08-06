"use client"

import React, { useState } from "react"
import PageContainer from "@/components/layout/PageContainer";
import { Separator } from "@/components/ui/separator"

type ListProps = {
  name: string;
  value: string;
  pageComponent: React.ReactNode;
}

interface BaseSettingPageProps {
  settingList: ListProps[],
}

const BaseSettingPage: React.FC<BaseSettingPageProps> = ({ settingList }) => {
  return (
    <PageContainer className="gap-6">
      {settingList.map(setting => (
        <div key={setting.value} className="flex flex-col gap-4">
          <h1 className="font-bold">{setting.name}</h1>
          {setting.pageComponent}
          <Separator className="my-4" />
        </div>
      ))}
    </PageContainer>
  )
}

export default BaseSettingPage
