export type Publication = {
  slug: string;
  title: string;
  authors: string[];
  venue: string;
  venueShort: string;
  publisher: string;
  date: string; // ISO date from Google Scholar
  pages: string;
  citations: number;
  topic: string;
  url: string; // IEEE Xplore
};

// Source: Google Scholar profile, checked 2026-10-06.
export const scholar = {
  name: "Pratim Mangaldas Dasude",
  profile: "https://scholar.google.com/citations?user=Hll9_4oAAAAJ&hl=en",
  citations: 9,
  hIndex: 3,
  i10Index: 0,
  asOf: "Oct 2026",
};

export const authorName = "Pratim Mangaldas Dasude";

export const publications: Publication[] = [
  {
    slug: "speech-emotion-recognition",
    title:
      "Investigating deep learning architectures for robust speech emotion recognition: A study of LSTM, CNN, and CLSTM models",
    authors: ["Pratim Mangaldas Dasude", "Utkarsh Anand", "Amlan Nayak", "Debapam Pal"],
    venue: "2024 International Conference on Intelligent Computing and Emerging Communication Technologies (ICEC)",
    venueShort: "ICEC 2024",
    publisher: "IEEE",
    date: "2024-11-23",
    pages: "1-6",
    citations: 3,
    topic: "Speech / Audio",
    url: "https://ieeexplore.ieee.org/abstract/document/10837169/",
  },
  {
    slug: "stress-detection-bert-mlp",
    title: "Leveraging BERT-enhanced MLP classifier for automated stress detection in social media articles",
    authors: [
      "Amlan Nayak",
      "Amiya Ranjan Panda",
      "Debapam Pal",
      "Sudatta Jana",
      "Pratim Mangaldas Dasude",
      "Utkarsh Anand",
    ],
    venue:
      "2024 International Conference on Advances in Computing Research on Science Engineering and Technology (ACROSET)",
    venueShort: "ACROSET 2024",
    publisher: "IEEE",
    date: "2024-09-27",
    pages: "1-6",
    citations: 3,
    topic: "NLP",
    url: "https://ieeexplore.ieee.org/abstract/document/10743857/",
  },
  {
    slug: "multilingual-sms-spam",
    title: "Multilingual SMS Spam Detection using BERT and LSTM",
    authors: [
      "Amlan Nayak",
      "Rina Kumari",
      "Debapam Pal",
      "Sudatta Jana",
      "Aniket Bhardwaj",
      "Pratim Mangaldas Dasude",
    ],
    venue: "2024 International Conference on Innovations and Challenges in Emerging Technologies (ICICET)",
    venueShort: "ICICET 2024",
    publisher: "IEEE",
    date: "2024-06-07",
    pages: "1-6",
    citations: 3,
    topic: "NLP",
    url: "https://ieeexplore.ieee.org/abstract/document/10616322/",
  },
];
