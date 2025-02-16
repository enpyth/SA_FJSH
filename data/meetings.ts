export interface Meeting {
  id: string;
  title: string;
  date: string;
  time?: string;
  summary?: string;
}

export const meetings: Meeting[] = [
  {
    id: "1",
    title: "2025年第一季度理事会",
    date: "2025-03-15",
    time: "14:00-16:00",
    summary: "将讨论2025年度第一季度工作计划和预算执行情况。"
  },
  {
    id: "2",
    title: "2024年度特别理事会",
    date: "2024-04-20",
    time: "09:30-11:30",
    summary: "讨论新会员发展策略和社区活动计划。"
  },
  {
    id: "3",
    title: "2023年第四季度理事会",
    date: "2023-12-15",
    summary: "讨论了2024年度计划和预算分配。通过了新会员申请审核流程。"
  },
  {
    id: "4",
    title: "2023年第三季度理事会",
    date: "2023-09-20",
    summary: "审议通过了年度财务报告，讨论了会员服务改进方案。"
  },
  {
    id: "5",
    title: "2023年中期战略会议",
    date: "2023-06-30",
    summary: "制定了未来三年发展规划，确定了重点项目投资方向。"
  }
];

export function getMeetings() {
  const currentDate = new Date();
  
  return {
    upcomingMeetings: meetings.filter(meeting => new Date(meeting.date) > currentDate),
    pastMeetings: meetings.filter(meeting => new Date(meeting.date) <= currentDate)
  };
}
