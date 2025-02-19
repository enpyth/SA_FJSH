export interface Meeting {
  id: string;
  title: string;
  date: string;
  time?: string;
  summary?: string;
  address?: string;
  file?: string;
}

export const meetings: Meeting[] = [
  {
    id: "1",
    title: "2025年第一季度理事会",
    date: "2025-02-24 (星期一)",
    time: "18:00",
    address: "Suite 2, Level 1, 61-63 Grote Street, Adelaide.",
    file: "./meetings/2025年第一次常务理事会议.md"
  },
  {
    id: "2",
    title: "2024年度特别理事会",
    date: "2024-04-20",
    time: "09:30-11:30",
    address: "Suite 2, Level 1, 61-63 Grote Street, Adelaide.",
    file: "./meetings/2025年第一次常务理事会议.md"
  },
  {
    id: "3",
    title: "2023年第四季度理事会",
    date: "2023-12-15",
    address: "Suite 2, Level 1, 61-63 Grote Street, Adelaide.",
    file: "./meetings/2025年第一次常务理事会议.md"
  },
  {
    id: "4",
    title: "2023年第三季度理事会",
    date: "2023-09-20",
    address: "Suite 2, Level 1, 61-63 Grote Street, Adelaide.",
    file: "./meetings/2025年第一次常务理事会议.md"
  },
  {
    id: "5",
    title: "2023年中期战略会议",
    date: "2023-06-30",
    address: "Suite 2, Level 1, 61-63 Grote Street, Adelaide.",
    file: "./meetings/2025年第一次常务理事会议.md"
  }
];

export function getMeetings() {
  const currentDate = new Date();
  
  return {
    upcomingMeetings: meetings.filter(meeting => new Date(meeting.date) > currentDate),
    pastMeetings: meetings.filter(meeting => new Date(meeting.date) <= currentDate)
  };
}
