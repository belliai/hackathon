"use client"

import { useMemo, type CSSProperties } from "react"

import { Sheet } from "./components/Sheet"
import { Tooltip } from "./components/Tooltip"

import "./sheet-styles.css"

import {
  ClientSideSuspense,
  RoomProvider,
  useCanRedo,
  useCanUndo,
  useHistory,
  useSelf,
} from "@liveblocks/react/suspense"
import { Loader } from "lucide-react"

import { cn } from "@/lib/utils"

import {
  COLUMN_HEADER_WIDTH,
  COLUMN_INITIAL_WIDTH,
  GRID_INITIAL_COLUMNS,
  GRID_INITIAL_ROWS,
  GRID_MAX_COLUMNS,
  GRID_MAX_ROWS,
  ROW_INITIAL_HEIGHT,
} from "./constants"
import {
  AddColumnAfterIcon,
  AddRowAfterIcon,
  RedoIcon,
  UndoIcon,
} from "./icons"
import styles from "./index.module.css"
import { useSpreadsheet } from "./spreadsheet/react"
import { createInitialStorage } from "./spreadsheet/utils"
import { appendUnit } from "./utils/appendUnit"

const AVATARS_MAX = 3

function Example() {
  const spreadsheet = useSpreadsheet()
  const history = useHistory()
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()
  const self = useSelf()

  if (spreadsheet == null) {
    return <Loader className="size-5 animate-spin text-muted-foreground" />
  }

  const { users, columns, rows, insertColumn, insertRow } = spreadsheet

  return (
    <main
      className={cn(styles.container, "spreadsheet")}
      style={
        {
          "--column-header-width": appendUnit(COLUMN_HEADER_WIDTH),
          "--column-width": appendUnit(COLUMN_INITIAL_WIDTH),
          "--row-height": appendUnit(ROW_INITIAL_HEIGHT),
          "--accent": self?.info.color,
        } as CSSProperties
      }
    >
      <div className={styles.banner}>
        <div className={styles.banner_content}>
          <div className={styles.buttons}>
            <div className={styles.button_group} role="group">
              <button
                className={styles.button}
                disabled={rows.length >= GRID_MAX_ROWS}
                onClick={() => insertRow(rows.length, ROW_INITIAL_HEIGHT)}
              >
                <AddRowAfterIcon />
                <span>Add Row</span>
              </button>
              <button
                className={styles.button}
                disabled={columns.length >= GRID_MAX_COLUMNS}
                onClick={() =>
                  insertColumn(columns.length, COLUMN_INITIAL_WIDTH)
                }
              >
                <AddColumnAfterIcon />
                <span>Add Column</span>
              </button>
            </div>
            <div className={styles.button_group} role="group">
              <Tooltip content="Undo">
                <button
                  className={styles.button}
                  onClick={() => history.undo()}
                  disabled={!canUndo}
                >
                  <UndoIcon />
                </button>
              </Tooltip>
              <Tooltip content="Redo">
                <button
                  className={styles.button}
                  onClick={() => history.redo()}
                  disabled={!canRedo}
                >
                  <RedoIcon />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      <Sheet {...spreadsheet} />
    </main>
  )
}

const initialStorage = createInitialStorage(
  { length: GRID_INITIAL_COLUMNS, width: COLUMN_INITIAL_WIDTH },
  { length: GRID_INITIAL_ROWS, height: ROW_INITIAL_HEIGHT },
  [
    ["🔢 Entries", "👀 Results", ""],
    ["3", "=A2*3", ""],
    ["1234", "=(A2*A3+A4)/2", ""],
    ["-8", "=B3%2", ""],
    ["", "", ""],
  ]
)

export default function Page() {
  const roomId = "belli:spreadsheet"

  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        selectedCell: null,
        cursor: null,
      }}
      initialStorage={initialStorage}
    >
      <ClientSideSuspense
        fallback={
          <Loader className="size-5 animate-spin text-muted-foreground" />
        }
      >
        <Example />
      </ClientSideSuspense>
    </RoomProvider>
  )
}
