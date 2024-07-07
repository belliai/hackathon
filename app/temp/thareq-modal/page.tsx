import { Button } from "@/components/ui/button"
import NewOrderModal from "@/components/dashboard/new-order-modal-v2"
import PageContainer from "@/components/layout/PageContainer"

export default function Page() {
  return (
    <PageContainer>
      <NewOrderModal>
        <Button variant={"button-primary"}>New Order</Button>
      </NewOrderModal>
    </PageContainer>
  )
}
