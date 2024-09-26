interface FlightContentProps {
  title: string;
  content: React.ReactNode;
}

const FlightContent: React.FC<FlightContentProps> = ({ title, content }) => {
  return (
    <div className="flex flex-col gap-1">
      <text className="text-xs text-muted-foreground">{title}</text>
      {content}
    </div>
  )
}

export { FlightContent }
