import { CustomerPortal, Paywall } from "@stigg/react-sdk"

const SubscriptionsSection = () => {
    return (
        <div>
          <CustomerPortal
            theme={{ backgroundColor: "transparent", planNameColor: "white" }}
            onContactSupport={() => {}}
            paywallComponent={
              <Paywall onPlanSelected={() => {}} productId="product-belli" />
            }
          />
        </div>
      )
}

export default SubscriptionsSection;