"use client"

import { useCurrencies } from "@/lib/hooks/currencies"

interface SummaryTotalProps {
    weight: string | number
    volume: string | number
    total: string | number
    currencyId: string
    type: 'header' | 'sidebar'
}

export default function SummaryTotal(props: SummaryTotalProps) {
    const { weight, volume, currencyId, total, type = 'header' } = props
    // const { data: currencies } = useCurrencies()

    // const selectedCurrency = currencies?.find(item => item.ID === currencyId)

    if (type === 'header') {
        return (
            <div className="text-lg font-semibold leading-none tracking-tight text-white">
                {`${weight ? `${weight}Kg` : ''} ${volume ? `${volume}m3` : ''} ${total ? `($${total} USD)` : ''}`}
            </div>
        )
    }
    
    return (
        <div className="flex flex-col text-sm text-muted-foreground gap-2 mt-3">
            <div className="flex gap-3">
                <div className="font-bold w-1/4">Weight</div>
                <div>{`${weight ? weight : '0'}Kg`}</div>
            </div>
            <div className="flex gap-3">
                <div className="font-bold w-1/4">Volume</div>
                <div>{`${volume ? volume : '0'}m3`}</div>
            </div>
            <div className="flex gap-3">
                <div className="font-bold w-1/4">Total</div>
                <div>{`$${total ? total : '0'} USD`}</div>
            </div>
        </div>
    )
}