export const SITE = {
  website: "https://howardzhao.com/", // replace this with your deployed domain
  author: "HowardZhao",
  profile: "https://howardzhao.com/",
  desc: "HowardZhao's Website.",
  title: "HowardZhao",
  ogImage: "stardust.jpg",
  lightAndDarkMode: true,
  postPerIndex: 10,
  postPerPage: 20,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "Edit page",
    url: "https://github.com/howardzhao/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/shanghai", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
