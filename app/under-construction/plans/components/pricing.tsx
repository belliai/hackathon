import { Paywall, SubscribeIntentionType } from "@stigg/react-sdk"

const PricingSection = () => {
    return (
        <div>
          <Paywall
            onPlanSelected={({ plan, intentionType }) => {
              switch (intentionType) {
                case SubscribeIntentionType.START_TRIAL:
                  // TODO: provision trial subscription
                  break
                case SubscribeIntentionType.REQUEST_CUSTOM_PLAN_ACCESS:
                  // TODO: redirect to contact us form
                  break
                case SubscribeIntentionType.UPGRADE_PLAN:
                case SubscribeIntentionType.DOWNGRADE_PLAN:
                  // TODO: show checkout experience
                  break
              }
            }}
          />
        </div>
      )
}

export default PricingSection