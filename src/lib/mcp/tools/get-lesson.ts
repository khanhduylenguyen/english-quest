import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { getLesson } from "@/lib/courses-data";

export default defineTool({
  name: "get_lesson",
  title: "Get lesson",
  description:
    "Get a single lesson (with quiz questions and answers) from a course by course id and lesson id.",
  inputSchema: {
    courseId: z.string().min(1).describe("The course id, e.g. 'grade-7-grammar'."),
    lessonId: z.string().min(1).describe("The lesson id within the course, e.g. 'l1'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ courseId, lessonId }) => {
    const result = getLesson(courseId, lessonId);
    if (!result) {
      return {
        content: [{ type: "text", text: `Lesson not found: ${courseId}/${lessonId}` }],
        isError: true,
      };
    }
    const { course, lesson, index, next, prev } = result;
    const payload = {
      courseId: course.id,
      courseTitle: course.title,
      lesson,
      index,
      nextLessonId: next?.id ?? null,
      prevLessonId: prev?.id ?? null,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
