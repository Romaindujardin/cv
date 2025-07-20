export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  isVideo?: boolean;
}

export interface Skill {
  id: string;
  name: string;
  icon: string;
}

export interface TimelineItem {
  id: string;
  title: string;
  period: string;
  description: string;
  direction: "l" | "r" | "lb" | "rb";
}
