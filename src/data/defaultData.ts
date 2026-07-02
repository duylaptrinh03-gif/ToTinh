export const defaultData = {
  profile: {
    yourName: "Chàng Trai",
    herName: "Cô Gái",
  },
  settings: {
    themeColor: "#ff4d6d",
    backgroundColor: "#fff0f3",
  },
  memories: [
    {
      id: "1",
      title: "Lần đầu gặp gỡ",
      description: "Ánh mắt đầu tiên đã làm trái tim anh lỡ nhịp.",
      date: "2023-01-01",
      image: "/images/memory-2.png",
    },
    {
      id: "2",
      title: "Quán ăn đầu tiên cùng nhau",
      description: "Cùng nhau nắm tay đi khắp thế gian.",
      date: "2023-06-15",
      image: "/images/memory-1.png",
    },
  ],
  gallery: [
    "/images/gallery-1.svg",
    "/images/gallery-2.svg",
    "/images/gallery-3.svg",
    "/images/gallery-4.svg",
    "https://www.w3schools.com/html/mov_bbb.mp4"
  ],
  funnyMoments: [
    {
      id: "1",
      image: "/images/funny-1.svg",
      caption: "Mặt em lúc giận dỗi nhìn cưng xỉu lun 😂",
    }
  ],
  videos: [
    {
      id: "1",
      url: "/videos/7949682719301.mp4",
      title: "Khoảnh khắc đáng nhớ nhất của chúng mình ✨",
      description: "Nhìn lại những giây phút tuyệt vời này nhé..."
    }
  ],
  messages: [
    "Anh thích nụ cười của em...",
    "Thích cách em nhõng nhẽo...",
    "Và thích tất cả mọi thứ thuộc về em ❤️",
    "Có em, mỗi ngày trôi qua đều là một ngày nắng đẹp.",
    "Cảm ơn em vì đã đến bên anh."
  ],
  proposal: {
    title: "Làm người yêu anh nhé? ❤️",
    acceptButton: "Đồng ý",
    rejectButton: "Không bao giờ",
  },
  puzzle: {
    image: "/images/memory-3.jpg",
    title: "Phép màu Tình yêu ✨",
    description: "Ấn vào để xem phép thuật gom lại những mảnh ghép kỷ niệm của chúng mình nhé!",
    buttonText: "Ấn vào sẽ có điều bất ngờ! 🪄"
  },
  unlockConfig: {
    firstChatDate: "17-01-2026", // Format: DD-MM-YYYY
    maxAttempts: 7,
    hints: [
      { attempts: 3, text: "Là vào cuối tuần." },
      { attempts: 5, text: "Tháng đó trời khá lạnh." },
      { attempts: 7, text: "Anh đã nhắn trước 😆" }
    ],
    errorMessages: [
      "Hình như chưa đúng rồi...",
      "Hint nhỏ nhé ❤️",
      "Anh nhớ là hôm đó mình nhắn tới khuya luôn đó.",
      "Thử nhớ lại xem.",
      "Không sao, thử thêm lần nữa nhé.",
      "Ngày đó rất đặc biệt với anh."
    ],
    unlockAnimationDuration: 3000
  },
  firstMessageDate: "17/01/2026", // Deprecated: keeping for backwards compatibility momentarily
  startDate: "2026-01-17T00:00:00Z" // ISO string
};

export type DefaultData = typeof defaultData;
