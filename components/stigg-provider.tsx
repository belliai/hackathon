"use client"
import { StiggProvider, Theme } from "@stigg/react-sdk"
const stiggApiKey = process.env.NEXT_PUBLIC_STIGG_API_KEY

const dummyUserId = "customer-belli"
const theme : Theme = {  
  palette: {
    backgroundSection: "transparent",
    primary: '#FB5727',  
    backgroundPaper: '#27272A',  
    backgroundHighlight: '#49494f',//'#FB5727',  
    outlinedHoverBackground: '#ff875e',
    text: {
      primary: '#E6E6E8',
    },
  },  
  layout: {  
    planMinWidth: '300px',  
    planMaxWidth: '300px',  
    ctaAlignment: 'center',  
    headerAlignment: 'left',  
    descriptionAlignment: 'center',  
  },  
  typography: {
    fontFamily: 'custom-font, DM Sans, sans-serif',
    h1: {
      fontSize: '32px',
      fontWeight: 'bold',
    },
    h2: {
      fontSize: '24px',
      fontWeight: 'normal',
    },
    h3: {
      fontSize: '16px',
      fontWeight: 'normal',
    },
    body: {
      fontSize: '14px',
      fontWeight: 'normal',
    },
  }
};

export default function StiggProviderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  
  return <StiggProvider apiKey={stiggApiKey as string} customerId={dummyUserId} theme={theme}>{children}</StiggProvider>
}
