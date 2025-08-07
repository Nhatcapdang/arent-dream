type TabsContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

type TabsProps = {
  defaultTab: string;
  children: ReactNode;
  className?: string;
};

type TabListProps = {
  children: ReactNode;
  className?: string;
};

type TabProps = {
  value: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
};

type TabPanelsProps = {
  children: ReactNode;
  className?: string;
};

type TabPanelProps = {
  value: string;
  children: ReactNode;
  className?: string;
};
