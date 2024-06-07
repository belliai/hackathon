import CreateFormTemplate, {
  CreateFormTemplateProps,
} from "@/app/organize/masters/components/CreateFormTemplate";
import PageContainer from "../layout/PageContainer";
import PageHeader from "../layout/PageHeader";
import { Separator } from "../ui/separator";

interface CreateFormPageTemplateProps extends CreateFormTemplateProps {
  heading: string;
}

export default function CreateFormPageTemplate({
  heading,
  hookForm,
  formFields,
  sectionedFormFields,
  customDialogContent,
  sectionsType,
  className,
}: CreateFormPageTemplateProps) {
  return (
    <PageContainer className="flex flex-col gap-4">
      <PageHeader title={heading} />
      <Separator />
      <CreateFormTemplate
        hookForm={hookForm}
        formFields={formFields}
        sectionedFormFields={sectionedFormFields}
        customDialogContent={customDialogContent}
        sectionsType={sectionsType}
        className={className}
      />
    </PageContainer>
  );
}
