export type VocabWord = {
  word: string;
  ipa: string;
  meaning: string;
  example: string;
};

export type Lesson = {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  description: string;
  vocabulary: VocabWord[];
  quiz: QuizQuestion[];
};

export type QuizQuestion = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
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
        vocabulary: [
          { word: "Hello", ipa: "/həˈloʊ/", meaning: "Xin chào", example: "Hello! Nice to meet you." },
          { word: "Goodbye", ipa: "/ɡʊdˈbaɪ/", meaning: "Tạm biệt", example: "Goodbye, see you tomorrow!" },
          { word: "Name", ipa: "/neɪm/", meaning: "Tên", example: "My name is Anna." },
          { word: "Nice", ipa: "/naɪs/", meaning: "Tuyệt/dễ chịu", example: "Nice to meet you." },
          { word: "Morning", ipa: "/ˈmɔːrnɪŋ/", meaning: "Buổi sáng", example: "Good morning, class!" },
        ],
        quiz: [
          { question: "How do you say 'Xin chào' in English?", options: ["Goodbye", "Hello", "Thanks", "Sorry"], answer: 1, explanation: "'Hello' là lời chào phổ biến nhất. 'Goodbye' = tạm biệt, 'Thanks' = cảm ơn, 'Sorry' = xin lỗi." },
          { question: "What does 'My name is...' mean?", options: ["Tôi là...", "Tên tôi là...", "Tôi đến từ...", "Tôi thích..."], answer: 1, explanation: "'Name' = tên, nên 'My name is...' nghĩa là 'Tên tôi là...'." },
          { question: "Choose the correct greeting in the morning:", options: ["Good night", "Good evening", "Good morning", "Goodbye"], answer: 2, explanation: "Buổi sáng dùng 'Good morning'. 'Good evening' cho buổi tối, 'Good night' khi đi ngủ." },
        ],
      },
      {
        id: "l2",
        title: "My Family",
        duration: "10 phút",
        videoUrl: SAMPLE_VIDEO,
        description: "Từ vựng về các thành viên trong gia đình.",
        vocabulary: [
          { word: "Father", ipa: "/ˈfɑːðər/", meaning: "Bố", example: "My father is a doctor." },
          { word: "Mother", ipa: "/ˈmʌðər/", meaning: "Mẹ", example: "My mother loves cooking." },
          { word: "Brother", ipa: "/ˈbrʌðər/", meaning: "Anh/em trai", example: "I have one brother." },
          { word: "Sister", ipa: "/ˈsɪstər/", meaning: "Chị/em gái", example: "My sister is 10 years old." },
          { word: "Children", ipa: "/ˈtʃɪldrən/", meaning: "Các đứa trẻ (số nhiều của child)", example: "They have three children." },
        ],
        quiz: [
          { question: "'Mother' nghĩa là gì?", options: ["Bố", "Mẹ", "Anh", "Chị"], answer: 1, explanation: "Mother = Mẹ. Bố là Father." },
          { question: "'Brother' nghĩa là gì?", options: ["Em gái", "Chị gái", "Anh/em trai", "Bố"], answer: 2, explanation: "Brother chỉ anh trai hoặc em trai. Sister = chị/em gái." },
          { question: "Số nhiều của 'child' là gì?", options: ["Childs", "Childrens", "Children", "Childes"], answer: 2, explanation: "'Child' là danh từ bất quy tắc, số nhiều là 'children' (không thêm -s)." },
        ],
      },
      {
        id: "l3",
        title: "Numbers & Colors",
        duration: "9 phút",
        videoUrl: SAMPLE_VIDEO,
        description: "Đếm số và màu sắc cơ bản.",
        vocabulary: [
          { word: "Seven", ipa: "/ˈsevən/", meaning: "Số 7", example: "I have seven books." },
          { word: "Red", ipa: "/red/", meaning: "Màu đỏ", example: "The apple is red." },
          { word: "Blue", ipa: "/bluː/", meaning: "Màu xanh dương", example: "The sky is blue." },
          { word: "Yellow", ipa: "/ˈjeloʊ/", meaning: "Màu vàng", example: "Bananas are yellow." },
          { word: "Green", ipa: "/ɡriːn/", meaning: "Màu xanh lá", example: "Leaves are green." },
        ],
        quiz: [
          { question: "Số 'seven' là số nào?", options: ["5", "6", "7", "8"], answer: 2, explanation: "seven = 7. (five=5, six=6, eight=8)." },
          { question: "'Red' nghĩa là màu gì?", options: ["Xanh", "Đỏ", "Vàng", "Tím"], answer: 1, explanation: "Red = Đỏ. Xanh = blue/green, Vàng = yellow, Tím = purple." },
          { question: "Màu của bầu trời là 'sky ___'?", options: ["green", "blue", "white", "red"], answer: 1, explanation: "Bầu trời có màu xanh dương → sky blue." },
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
        vocabulary: [
          { word: "Always", ipa: "/ˈɔːlweɪz/", meaning: "Luôn luôn", example: "She always drinks milk." },
          { word: "Usually", ipa: "/ˈjuːʒuəli/", meaning: "Thường thường", example: "I usually go to school by bus." },
          { word: "Every day", ipa: "/ˈevri deɪ/", meaning: "Mỗi ngày", example: "He studies English every day." },
          { word: "Go", ipa: "/ɡoʊ/", meaning: "Đi", example: "They go to work at 8 AM." },
          { word: "Doesn't", ipa: "/ˈdʌzənt/", meaning: "Không (dùng với he/she/it)", example: "She doesn't like coffee." },
        ],
        quiz: [
          { question: "She ___ to school every day.", options: ["go", "goes", "going", "went"], answer: 1, explanation: "Chủ ngữ 'She' (ngôi 3 số ít) ở HTĐ → động từ thêm '-es': goes." },
          { question: "Câu phủ định đúng:", options: ["He don't like tea", "He doesn't likes tea", "He doesn't like tea", "He not like tea"], answer: 2, explanation: "Ngôi 3 số ít dùng 'doesn't' + V nguyên mẫu (không thêm -s)." },
          { question: "Trạng từ KHÔNG đi với hiện tại đơn:", options: ["always", "usually", "now", "every day"], answer: 2, explanation: "'now' là dấu hiệu của Hiện tại tiếp diễn, không dùng với HTĐ." },
        ],
      },
      {
        id: "l2",
        title: "Present Continuous",
        duration: "11 phút",
        videoUrl: SAMPLE_VIDEO,
        description: "Diễn tả hành động đang xảy ra ngay lúc nói.",
        vocabulary: [
          { word: "Now", ipa: "/naʊ/", meaning: "Bây giờ", example: "I am reading now." },
          { word: "At the moment", ipa: "/æt ðə ˈmoʊmənt/", meaning: "Lúc này", example: "She is cooking at the moment." },
          { word: "Studying", ipa: "/ˈstʌdiɪŋ/", meaning: "Đang học", example: "We are studying English." },
          { word: "Listen", ipa: "/ˈlɪsən/", meaning: "Lắng nghe", example: "Listen! The teacher is speaking." },
          { word: "Watch", ipa: "/wɑːtʃ/", meaning: "Xem", example: "They are watching TV." },
        ],
        quiz: [
          { question: "I ___ studying English now.", options: ["am", "is", "are", "be"], answer: 0, explanation: "Chủ ngữ 'I' luôn đi với 'am' trong HTTD." },
          { question: "Cấu trúc đúng:", options: ["S + V-ing", "S + to be + V-ing", "S + have + V-ing", "S + will + V-ing"], answer: 1, explanation: "HTTD = S + am/is/are + V-ing." },
          { question: "Dấu hiệu thì HTTD:", options: ["yesterday", "now", "every week", "last year"], answer: 1, explanation: "'now' = ngay bây giờ, đặc trưng của HTTD. 'yesterday/last year' là quá khứ." },
        ],
      },
      {
        id: "l3",
        title: "Past Simple",
        duration: "13 phút",
        videoUrl: SAMPLE_VIDEO,
        description: "Diễn tả hành động đã xảy ra trong quá khứ.",
        vocabulary: [
          { word: "Yesterday", ipa: "/ˈjestərdeɪ/", meaning: "Hôm qua", example: "I met her yesterday." },
          { word: "Went", ipa: "/went/", meaning: "Đã đi (quá khứ của go)", example: "We went to the park." },
          { word: "Did", ipa: "/dɪd/", meaning: "Đã làm (trợ động từ QKĐ)", example: "Did you finish your homework?" },
          { word: "Ago", ipa: "/əˈɡoʊ/", meaning: "Cách đây", example: "Two years ago." },
          { word: "Last", ipa: "/læst/", meaning: "Trước đó (last week/year)", example: "Last week was fun." },
        ],
        quiz: [
          { question: "Quá khứ của 'go' là:", options: ["goed", "went", "gone", "going"], answer: 1, explanation: "'go' là động từ bất quy tắc: go → went → gone. 'gone' là V3 (dùng cho HTHT)." },
          { question: "I ___ my homework yesterday.", options: ["do", "does", "did", "done"], answer: 2, explanation: "'yesterday' là dấu hiệu QKĐ → dùng 'did' cho 'do'." },
          { question: "Câu phủ định đúng:", options: ["He didn't went", "He didn't go", "He don't go", "He not go"], answer: 1, explanation: "Sau 'didn't' phải dùng V nguyên mẫu → didn't go." },
        ],
      },
      {
        id: "l4",
        title: "Question Words",
        duration: "10 phút",
        videoUrl: SAMPLE_VIDEO,
        description: "What, Where, When, Why, How.",
        vocabulary: [
          { word: "What", ipa: "/wɒt/", meaning: "Cái gì", example: "What is your name?" },
          { word: "Where", ipa: "/wer/", meaning: "Ở đâu", example: "Where do you live?" },
          { word: "When", ipa: "/wen/", meaning: "Khi nào", example: "When is your birthday?" },
          { word: "Why", ipa: "/waɪ/", meaning: "Tại sao", example: "Why are you late?" },
          { word: "How", ipa: "/haʊ/", meaning: "Như thế nào / Bao nhiêu", example: "How old are you?" },
        ],
        quiz: [
          { question: "'___ is your name?' — My name is Anna.", options: ["Where", "What", "When", "Why"], answer: 1, explanation: "Hỏi tên → dùng 'What' (cái gì)." },
          { question: "'___ do you live?' — In Hanoi.", options: ["What", "Who", "Where", "How"], answer: 2, explanation: "Trả lời về địa điểm ('In Hanoi') → hỏi 'Where' (ở đâu)." },
          { question: "'___ old are you?'", options: ["What", "How", "Why", "When"], answer: 1, explanation: "Hỏi tuổi dùng cụm 'How old...?'." },
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
        vocabulary: [
          { word: "Passport", ipa: "/ˈpæspɔːrt/", meaning: "Hộ chiếu", example: "Don't forget your passport." },
          { word: "Book (v)", ipa: "/bʊk/", meaning: "Đặt trước", example: "I'd like to book a room." },
          { word: "Plane", ipa: "/pleɪn/", meaning: "Máy bay", example: "The plane takes off at 8." },
          { word: "Luggage", ipa: "/ˈlʌɡɪdʒ/", meaning: "Hành lý", example: "My luggage is heavy." },
          { word: "Destination", ipa: "/ˌdestɪˈneɪʃən/", meaning: "Điểm đến", example: "Paris is a popular destination." },
        ],
        quiz: [
          { question: "'Passport' nghĩa là?", options: ["Vali", "Hộ chiếu", "Vé máy bay", "Khách sạn"], answer: 1, explanation: "Passport = Hộ chiếu (giấy tờ đi nước ngoài). Vali = suitcase, vé = ticket." },
          { question: "'I'd like to book a ___' (đặt phòng)", options: ["ticket", "room", "meal", "taxi"], answer: 1, explanation: "Đặt phòng khách sạn → 'book a room'." },
          { question: "Phương tiện 'plane' là?", options: ["Tàu hoả", "Xe buýt", "Máy bay", "Tàu thuỷ"], answer: 2, explanation: "Plane (airplane) = Máy bay. Tàu = train, Tàu thuỷ = ship." },
        ],
      },
      {
        id: "l2",
        title: "Sports & Hobbies",
        duration: "10 phút",
        videoUrl: SAMPLE_VIDEO,
        description: "Nói về sở thích và thể thao yêu thích.",
        vocabulary: [
          { word: "Swimming", ipa: "/ˈswɪmɪŋ/", meaning: "Bơi lội", example: "Swimming is fun." },
          { word: "Play", ipa: "/pleɪ/", meaning: "Chơi (thể thao có bóng/dụng cụ)", example: "I play tennis." },
          { word: "Interested in", ipa: "/ˈɪntrəstɪd ɪn/", meaning: "Hứng thú với", example: "I'm interested in music." },
          { word: "Hobby", ipa: "/ˈhɑːbi/", meaning: "Sở thích", example: "Reading is my hobby." },
          { word: "Team", ipa: "/tiːm/", meaning: "Đội", example: "Our team won." },
        ],
        quiz: [
          { question: "'Swimming' là môn?", options: ["Bóng đá", "Bơi lội", "Chạy bộ", "Đua xe"], answer: 1, explanation: "Swimming = Bơi lội (từ swim = bơi)." },
          { question: "Động từ đi với 'tennis':", options: ["do", "go", "play", "make"], answer: 2, explanation: "Môn thể thao dùng bóng/dụng cụ → 'play tennis'. 'go' dùng với V-ing (go swimming)." },
          { question: "'I'm interested ___ music.'", options: ["in", "on", "at", "for"], answer: 0, explanation: "Cụm cố định: 'interested IN something' = quan tâm/hứng thú với..." },
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
        vocabulary: [
          { word: "Condition", ipa: "/kənˈdɪʃən/", meaning: "Điều kiện", example: "Under one condition..." },
          { word: "Would", ipa: "/wʊd/", meaning: "Sẽ (giả định)", example: "I would travel if I had money." },
          { word: "Unless", ipa: "/ənˈles/", meaning: "Trừ khi", example: "Unless it rains, we'll go out." },
          { word: "Boil", ipa: "/bɔɪl/", meaning: "Sôi", example: "Water boils at 100°C." },
          { word: "Rich", ipa: "/rɪtʃ/", meaning: "Giàu có", example: "If I were rich..." },
        ],
        quiz: [
          { question: "If I ___ rich, I would travel the world.", options: ["am", "was", "were", "be"], answer: 2, explanation: "Câu điều kiện loại 2 (không có thật ở hiện tại) dùng 'were' cho tất cả các ngôi." },
          { question: "Câu điều kiện loại 1: If + S +", options: ["V (HTĐ), S + will + V", "V2/ed, S + would + V", "had V3, S + would have V3", "V-ing, S + V"], answer: 0, explanation: "Loại 1 (có thể xảy ra): If + HTĐ, S + will + V." },
          { question: "If you heat water, it ___.", options: ["will boil", "boils", "would boil", "boiled"], answer: 1, explanation: "Câu điều kiện loại 0 (chân lý/sự thật) → cả hai vế đều dùng HTĐ." },
        ],
      },
      {
        id: "l2",
        title: "Passive Voice",
        duration: "13 phút",
        videoUrl: SAMPLE_VIDEO,
        description: "Câu bị động ở các thì cơ bản.",
        vocabulary: [
          { word: "Passive", ipa: "/ˈpæsɪv/", meaning: "Bị động", example: "Passive voice." },
          { word: "Build", ipa: "/bɪld/", meaning: "Xây (built - built)", example: "They build houses." },
          { word: "By", ipa: "/baɪ/", meaning: "Bởi", example: "The book was written by him." },
          { word: "Made", ipa: "/meɪd/", meaning: "Được làm (V3 của make)", example: "The cake was made yesterday." },
          { word: "Broken", ipa: "/ˈbroʊkən/", meaning: "Bị vỡ (V3)", example: "The window is broken." },
        ],
        quiz: [
          { question: "Bị động của 'They build a house':", options: ["A house is built", "A house was built", "A house build", "A house been built"], answer: 0, explanation: "Chủ động HTĐ → bị động: S + is/am/are + V3. 'a house' số ít → is built." },
          { question: "Cấu trúc bị động:", options: ["S + V + O", "S + be + V3 + by O", "S + have + V3", "S + V-ing"], answer: 1, explanation: "Công thức chuẩn: S + be + V3/ed + (by + O)." },
          { question: "'The cake ___ by Mary yesterday.'", options: ["is made", "was made", "made", "be made"], answer: 1, explanation: "'yesterday' → quá khứ. Bị động QKĐ: was/were + V3 → 'was made'." },
        ],
      },
      {
        id: "l3",
        title: "Reading Comprehension",
        duration: "18 phút",
        videoUrl: SAMPLE_VIDEO,
        description: "Kỹ năng skim, scan và đoán nghĩa từ.",
        vocabulary: [
          { word: "Skimming", ipa: "/ˈskɪmɪŋ/", meaning: "Đọc lướt ý chính", example: "Use skimming to find the topic." },
          { word: "Scanning", ipa: "/ˈskænɪŋ/", meaning: "Đọc quét tìm chi tiết", example: "Scanning helps find names." },
          { word: "Context", ipa: "/ˈkɒntekst/", meaning: "Ngữ cảnh", example: "Guess meaning from context." },
          { word: "Summarize", ipa: "/ˈsʌməraɪz/", meaning: "Tóm tắt", example: "Summarize the passage." },
          { word: "Predict", ipa: "/prɪˈdɪkt/", meaning: "Dự đoán", example: "Predict what happens next." },
        ],
        quiz: [
          { question: "Kỹ thuật đọc nhanh ý chính gọi là?", options: ["Scanning", "Skimming", "Reading aloud", "Translating"], answer: 1, explanation: "Skimming = đọc lướt để nắm ý chính/chủ đề." },
          { question: "Kỹ thuật tìm thông tin cụ thể:", options: ["Skimming", "Scanning", "Predicting", "Summarizing"], answer: 1, explanation: "Scanning = quét mắt tìm chi tiết cụ thể (số liệu, tên riêng)." },
          { question: "Để đoán nghĩa từ mới, ta dựa vào?", options: ["Từ điển", "Ngữ cảnh", "Bạn bè", "Hình ảnh"], answer: 1, explanation: "Kỹ năng quan trọng là đoán nghĩa qua NGỮ CẢNH (context) để không phụ thuộc từ điển." },
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
