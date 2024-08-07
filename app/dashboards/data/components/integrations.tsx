"use client"

import Image from "next/image"
import { Loader } from "lucide-react"

import { useParagonGlobal } from "@/lib/hooks/paragon"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { DataFieldsTab } from "@/app/data-fields/components/datafields-page-template"

export default function DataIntegrations() {
  const {
    token,
    paragon,
    user,
    query: { isLoading },
  } = useParagonGlobal()

  return (
    <>
      <h1 className="text-xl font-semibold">Integrations</h1>
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {paragon &&
            paragon.getIntegrationMetadata().map((integration) => {
              const integrationEnabled = user?.authenticated
                ? user.integrations &&
                  user.integrations[integration.type]?.enabled
                : false

              return (
                <Card key={integration.type} className="h-full">
                  <CardHeader className="items-center py-6">
                    <Image
                      src={integration.icon}
                      width={64}
                      height={64}
                      alt={integration.name}
                      className="h-14 w-auto"
                    />
                  </CardHeader>
                  <Separator />
                  <CardContent className="h-14 px-3 py-2">
                    <div className="flex h-full w-full items-center justify-between gap-5">
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                          <p className="text-xs font-semibold">
                            {integration.name}
                          </p>
                        </div>
                      </div>
                      {integrationEnabled ? (
                        <Button variant="button-primary" disabled size="sm">
                          Enabled
                        </Button>
                      ) : (
                        <Button
                          variant="button-primary"
                          size="sm"
                          onClick={() => {
                            paragon.connect(integration.type, {
                              onSuccess: () => {
                                console.log("Connected to", integration.type)
                              },
                              onError: (error) => {
                                console.error(
                                  "Failed to connect to",
                                  integration.type,
                                  error
                                )
                              },
                            })
                          }}
                        >
                          Connect
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
        </div>
      )}
    </>
  )
}
