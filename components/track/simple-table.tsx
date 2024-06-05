import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


type PropHeader = {
    id: string, title: string
}

type PropsTable = {
    headers: Array<PropHeader>
    data: Array<any>
}


export function SimpleTable(props: PropsTable) {
    const { headers, data } = props
    return (
        <Table className="w-80">
            <TableHeader>
                <TableRow className="bg-zinc-700">
                    {headers.map((header: PropHeader, id) => {
                        return <TableHead key={id}  className="w-20 " >{header.title}</TableHead>
                    })}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item, id) => {
                    return (
                        <TableRow key={id}>
                            {headers.map((header,id) => {
                                return <TableCell key={id} className="font-medium">{item[header.id]}</TableCell>
                            })}
                        </TableRow>
                    )}
                )}
            </TableBody>
        </Table>
    )
}
