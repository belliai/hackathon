interface PageHeaderProps {
  title: string;
  actions?: React.ReactNode;
}

export default function PageHeader({ title, actions }: PageHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold">{title}</h1>
      {actions}
    </div>
  );
}
