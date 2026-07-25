import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { getCourse } from "@/lib/courses-data";

export default defineTool({
  name: "get_course",
  title: "Get course details",
  description:
    "Get details of a course by its id, including the list of lessons (id, title, duration, description).",
  inputSchema: {
    courseId: z.string().min(1).describe("The course id, e.g. 'grade-7-grammar'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ courseId }) => {
    const course = getCourse(courseId);
    if (!course) {
      return { content: [{ type: "text", text: `Course not found: ${courseId}` }], isError: true };
    }
    const payload = {
      id: course.id,
      title: course.title,
      grade: course.grade,
      level: course.level,
      description: course.description,
      lessons: course.lessons.map((l) => ({
        id: l.id,
        title: l.title,
        duration: l.duration,
        description: l.description,
      })),
    };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: { course: payload },
    };
  },
});
