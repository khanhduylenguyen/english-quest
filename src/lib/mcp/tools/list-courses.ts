import { defineTool } from "@lovable.dev/mcp-js";
import { COURSES } from "@/lib/courses-data";

export default defineTool({
  name: "list_courses",
  title: "List courses",
  description: "List all English learning courses available on EngQuest, including grade, level, and lesson count.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const summary = COURSES.map((c) => ({
      id: c.id,
      title: c.title,
      grade: c.grade,
      level: c.level,
      description: c.description,
      lessonCount: c.lessons.length,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(summary, null, 2) }],
      structuredContent: { courses: summary },
    };
  },
});
