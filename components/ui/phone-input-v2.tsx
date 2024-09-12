import { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const PhoneInputV2 = (props: any) => {
  const [phone, setPhone] = useState('');
  return (
    <PhoneInput
      country={'us'}
      value={phone}
      onChange={phone => setPhone(phone)}
      containerClass="!h-[40px] w-full !rounded-md"
      inputClass="!h-[40px] !w-full !rounded-md !border-2 !border-foreground/30 !bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      buttonClass="!rounded-l-lg !border-2 !border-foreground/30 !bg-background border-none hover:!bg-background"
      dropdownClass="!bg-background custom-scrollbar hover:!bg-background shadow-md border"
      enableSearch
      searchNotFound="Country not found"
      searchPlaceholder="Search Country ..."
      searchClass="!bg-background !p-0 overflow-x-hidden"
      disableSearchIcon
      {...props}
    />
  )
}

export default PhoneInputV2
