import { defineMcp } from "@lovable.dev/mcp-js";
import listCoursesTool from "./tools/list-courses";
import getCourseTool from "./tools/get-course";
import getLessonTool from "./tools/get-lesson";

export default defineMcp({
  name: "engquest-mcp",
  title: "EngQuest MCP",
  version: "0.1.0",
  instructions:
    "Tools for EngQuest — an English learning platform for Vietnamese middle-school students (grades 6–9). Use `list_courses` to browse courses, `get_course` to inspect a course's lessons, and `get_lesson` to read a lesson and its quiz.",
  tools: [listCoursesTool, getCourseTool, getLessonTool],
});
