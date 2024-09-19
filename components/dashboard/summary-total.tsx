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
                {`${weight ? `${weight} Kg` : ''} ${volume ? `${volume} cm³` : ''} ${total ? `($${total} USD)` : ''}`}
            </div>
        )
    }
    
    return (
        <div className="flex flex-col text-sm dark:text-muted-foreground gap-2 mt-3">
            <div className="flex gap-3">
                <div className="font-bold w-1/4">Weight</div>
                <div className="w-2/4 text-right">{`${weight ? weight : '0'}`}</div>
                <div className="w-1/4 text-right">Kg</div>
            </div>
            <div className="flex gap-3">
                <div className="font-bold w-1/4">Volume</div>
                <div className="w-2/4 text-right">{`${volume ? volume : '0'}`}</div>
                <div className="w-1/4 text-right">cm³</div>
            </div>
            <div className="flex gap-3">
                <div className="font-bold w-1/4">Value</div>
                <div className="w-2/4 text-right">{`${total ? total : '0'}`}</div>
                <div className="w-1/4 text-right">USD</div>
            </div>
        </div>
    )
}