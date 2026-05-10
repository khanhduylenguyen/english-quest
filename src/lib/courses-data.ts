export type Lesson = {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  description: string;
  quiz: QuizQuestion[];
};

export type QuizQuestion = {
  question: string;
  options: string[];
  answer: number;
};

export type Course = {
  id: string;
  title: string;
  grade: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  emoji: string;
  color: string;
  lessons: Lesson[];
};

const SAMPLE_VIDEO = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export const COURSES: Course[] = [
  {
    id: "grade-6-basics",
    title: "Lớp 6: Khởi đầu hành trình",
    grade: "Lớp 6",
    level: "Beginner",
    description: "Làm quen với tiếng Anh: chào hỏi, gia đình, trường lớp.",
    emoji: "🌱",
    color: "from-emerald-400 to-teal-500",
    lessons: [
      {
        id: "l1",
        title: "Greetings & Introductions",
        duration: "8 phút",
        videoUrl: SAMPLE_VIDEO,
        description: "Học cách chào hỏi và giới thiệu bản thân bằng tiếng Anh.",
        quiz: [
          { question: "How do you say 'Xin chào' in English?", options: ["Goodbye", "Hello", "Thanks", "Sorry"], answer: 1 },
          { question: "What does 'My name is...' mean?", options: ["Tôi là...", "Tên tôi là...", "Tôi đến từ...", "Tôi thích..."], answer: 1 },
          { question: "Choose the correct greeting in the morning:", options: ["Good night", "Good evening", "Good morning", "Goodbye"], answer: 2 },
        ],
      },
      {
        id: "l2",
        title: "My Family",
        duration: "10 phút",
        videoUrl: SAMPLE_VIDEO,
        description: "Từ vựng về các thành viên trong gia đình.",
        quiz: [
          { question: "'Mother' nghĩa là gì?", options: ["Bố", "Mẹ", "Anh", "Chị"], answer: 1 },
          { question: "'Brother' nghĩa là gì?", options: ["Em gái", "Chị gái", "Anh/em trai", "Bố"], answer: 2 },
          { question: "Số nhiều của 'child' là gì?", options: ["Childs", "Childrens", "Children", "Childes"], answer: 2 },
        ],
      },
      {
        id: "l3",
        title: "Numbers & Colors",
        duration: "9 phút",
        videoUrl: SAMPLE_VIDEO,
        description: "Đếm số và màu sắc cơ bản.",
        quiz: [
          { question: "Số 'seven' là số nào?", options: ["5", "6", "7", "8"], answer: 2 },
          { question: "'Red' nghĩa là màu gì?", options: ["Xanh", "Đỏ", "Vàng", "Tím"], answer: 1 },
          { question: "Màu của bầu trời là 'sky ___'?", options: ["green", "blue", "white", "red"], answer: 1 },
        ],
      },
    ],
  },
  {
    id: "grade-7-grammar",
    title: "Lớp 7: Ngữ pháp nền tảng",
    grade: "Lớp 7",
    level: "Beginner",
    description: "Thì hiện tại đơn, hiện tại tiếp diễn và quá khứ đơn.",
    emoji: "📘",
    color: "from-sky-400 to-blue-500",
    lessons: [
      {
        id: "l1",
        title: "Present Simple",
        duration: "12 phút",
        videoUrl: SAMPLE_VIDEO,
        description: "Cách dùng và chia động từ ở thì hiện tại đơn.",
        quiz: [
          { question: "She ___ to school every day.", options: ["go", "goes", "going", "went"], answer: 1 },
          { question: "Câu phủ định đúng:", options: ["He don't like tea", "He doesn't likes tea", "He doesn't like tea", "He not like tea"], answer: 2 },
          { question: "Trạng từ KHÔNG đi với hiện tại đơn:", options: ["always", "usually", "now", "every day"], answer: 2 },
        ],
      },
      {
        id: "l2",
        title: "Present Continuous",
        duration: "11 phút",
        videoUrl: SAMPLE_VIDEO,
        description: "Diễn tả hành động đang xảy ra ngay lúc nói.",
        quiz: [
          { question: "I ___ studying English now.", options: ["am", "is", "are", "be"], answer: 0 },
          { question: "Cấu trúc đúng:", options: ["S + V-ing", "S + to be + V-ing", "S + have + V-ing", "S + will + V-ing"], answer: 1 },
          { question: "Dấu hiệu thì HTTD:", options: ["yesterday", "now", "every week", "last year"], answer: 1 },
        ],
      },
      {
        id: "l3",
        title: "Past Simple",
        duration: "13 phút",
        videoUrl: SAMPLE_VIDEO,
        description: "Diễn tả hành động đã xảy ra trong quá khứ.",
        quiz: [
          { question: "Quá khứ của 'go' là:", options: ["goed", "went", "gone", "going"], answer: 1 },
          { question: "I ___ my homework yesterday.", options: ["do", "does", "did", "done"], answer: 2 },
          { question: "Câu phủ định đúng:", options: ["He didn't went", "He didn't go", "He don't go", "He not go"], answer: 1 },
        ],
      },
      {
        id: "l4",
        title: "Question Words",
        duration: "10 phút",
        videoUrl: SAMPLE_VIDEO,
        description: "What, Where, When, Why, How.",
        quiz: [
          { question: "'___ is your name?' — My name is Anna.", options: ["Where", "What", "When", "Why"], answer: 1 },
          { question: "'___ do you live?' — In Hanoi.", options: ["What", "Who", "Where", "How"], answer: 2 },
          { question: "'___ old are you?'", options: ["What", "How", "Why", "When"], answer: 1 },
        ],
      },
    ],
  },
  {
    id: "grade-8-vocab",
    title: "Lớp 8: Mở rộng từ vựng",
    grade: "Lớp 8",
    level: "Intermediate",
    description: "Chủ đề du lịch, thể thao, công nghệ và môi trường.",
    emoji: "🚀",
    color: "from-violet-400 to-purple-500",
    lessons: [
      {
        id: "l1",
        title: "Travel & Holidays",
        duration: "12 phút",
        videoUrl: SAMPLE_VIDEO,
        description: "Từ vựng và mẫu câu khi đi du lịch.",
        quiz: [
          { question: "'Passport' nghĩa là?", options: ["Vali", "Hộ chiếu", "Vé máy bay", "Khách sạn"], answer: 1 },
          { question: "'I'd like to book a ___' (đặt phòng)", options: ["ticket", "room", "meal", "taxi"], answer: 1 },
          { question: "Phương tiện 'plane' là?", options: ["Tàu hoả", "Xe buýt", "Máy bay", "Tàu thuỷ"], answer: 2 },
        ],
      },
      {
        id: "l2",
        title: "Sports & Hobbies",
        duration: "10 phút",
        videoUrl: SAMPLE_VIDEO,
        description: "Nói về sở thích và thể thao yêu thích.",
        quiz: [
          { question: "'Swimming' là môn?", options: ["Bóng đá", "Bơi lội", "Chạy bộ", "Đua xe"], answer: 1 },
          { question: "Động từ đi với 'tennis':", options: ["do", "go", "play", "make"], answer: 2 },
          { question: "'I'm interested ___ music.'", options: ["in", "on", "at", "for"], answer: 0 },
        ],
      },
    ],
  },
  {
    id: "grade-9-exam",
    title: "Lớp 9: Luyện thi vào 10",
    grade: "Lớp 9",
    level: "Advanced",
    description: "Tổng ôn ngữ pháp, đọc hiểu và viết lại câu.",
    emoji: "🏆",
    color: "from-orange-400 to-red-500",
    lessons: [
      {
        id: "l1",
        title: "Conditional Sentences",
        duration: "15 phút",
        videoUrl: SAMPLE_VIDEO,
        description: "Câu điều kiện loại 0, 1, 2, 3.",
        quiz: [
          { question: "If I ___ rich, I would travel the world.", options: ["am", "was", "were", "be"], answer: 2 },
          { question: "Câu điều kiện loại 1: If + S +", options: ["V (HTĐ), S + will + V", "V2/ed, S + would + V", "had V3, S + would have V3", "V-ing, S + V"], answer: 0 },
          { question: "If you heat water, it ___.", options: ["will boil", "boils", "would boil", "boiled"], answer: 1 },
        ],
      },
      {
        id: "l2",
        title: "Passive Voice",
        duration: "13 phút",
        videoUrl: SAMPLE_VIDEO,
        description: "Câu bị động ở các thì cơ bản.",
        quiz: [
          { question: "Bị động của 'They build a house':", options: ["A house is built", "A house was built", "A house build", "A house been built"], answer: 0 },
          { question: "Cấu trúc bị động:", options: ["S + V + O", "S + be + V3 + by O", "S + have + V3", "S + V-ing"], answer: 1 },
          { question: "'The cake ___ by Mary yesterday.'", options: ["is made", "was made", "made", "be made"], answer: 1 },
        ],
      },
      {
        id: "l3",
        title: "Reading Comprehension",
        duration: "18 phút",
        videoUrl: SAMPLE_VIDEO,
        description: "Kỹ năng skim, scan và đoán nghĩa từ.",
        quiz: [
          { question: "Kỹ thuật đọc nhanh ý chính gọi là?", options: ["Scanning", "Skimming", "Reading aloud", "Translating"], answer: 1 },
          { question: "Kỹ thuật tìm thông tin cụ thể:", options: ["Skimming", "Scanning", "Predicting", "Summarizing"], answer: 1 },
          { question: "Để đoán nghĩa từ mới, ta dựa vào?", options: ["Từ điển", "Ngữ cảnh", "Bạn bè", "Hình ảnh"], answer: 1 },
        ],
      },
    ],
  },
];

export function getCourse(id: string) {
  return COURSES.find((c) => c.id === id);
}

export function getLesson(courseId: string, lessonId: string) {
  const course = getCourse(courseId);
  if (!course) return null;
  const idx = course.lessons.findIndex((l) => l.id === lessonId);
  if (idx === -1) return null;
  return {
    course,
    lesson: course.lessons[idx],
    index: idx,
    next: course.lessons[idx + 1] ?? null,
    prev: course.lessons[idx - 1] ?? null,
  };
}
