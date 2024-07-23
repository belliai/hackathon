import { Checkout } from "@stigg/react-sdk"

const CheckoutSection = () => {
return (
    <div>
    {/* to render this need to integrate Billing solution First
    https://docs.stigg.io/docs/checkout#prerequisites
    
    */}
    {/* <Checkout
      planId="plan-belli-starter"
      onCheckoutCompleted={({ success, error }) => {
        // TODO: handle checkout completion
        return Promise.resolve()
      }}
    /> */}
  </div>
)
}

export default CheckoutSection


