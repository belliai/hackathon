import { BookUserIcon, HandshakeIcon, UserRoundCogIcon } from "lucide-react"

import { DataFieldsTab } from "../components/datafields-page-template"
import PartnerCode from "../partner-code"
import PartnerPrefix from "../partner-prefix"
import PartnerType from "../partner-type"

export const tabs: DataFieldsTab[] = [
  {
    name: "Partner Prefix",
    component: <PartnerPrefix />,
    icon: UserRoundCogIcon,
    tooltipId: "aircraft-settings-partner-prefix",
  },
  {
    name: "Partner Code",
    component: <PartnerCode />,
    icon: BookUserIcon,
    tooltipId: "aircraft-settings-partner-code",
  },
  {
    name: "Partner Type",
    component: <PartnerType />,
    icon: HandshakeIcon,
    tooltipId: "aircraft-settings-partner-type",
  },
]
