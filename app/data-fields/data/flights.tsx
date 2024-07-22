import { ALargeSmall, Hash, TextCursorInput } from "lucide-react";
import { DataFieldsTab } from "../components/datafields-page-template";
import DisplaySettings from "../display";
import DefaultTimezone from "../default-timezone";

export const flightsTabs: DataFieldsTab[] = [
    {
        name: "Display",
        icon: ALargeSmall,
        component: <DisplaySettings/>,
        tooltipId: "flights-display"
    },
    {
        name: "Entry Types" as any,
        icon: TextCursorInput,
        disabled: true,
        component: <div>Entry Types</div>,
        tooltipId: "flights-entry-types"
    },
    {
        name: "Number Format" as any,
        icon: Hash,
        disabled: true,
        component: <div>Number Format</div>,
        tooltipId: "flights-number-format"
    },
    {
        name: "Default Timezone" as any,
        icon: Hash,
        component: <DefaultTimezone />,
        tooltipId: "flights-number-format"
    },
]