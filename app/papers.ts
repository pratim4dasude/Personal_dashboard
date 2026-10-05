export type Glance = { k: string; v: string };

export type Paper = {
  slug: string;
  title: string;
  authors: string[];
  venue: string;
  venueShort: string;
  publisher: string;
  date: string; // ISO date
  pages: string;
  citations: number;
  topic: string;
  ieeeUrl: string;
  doi: string;
  scholarUrl: string;
  abstract: string;
  /** Facts taken directly from the abstract. Nothing here goes beyond what the abstract states. */
  glance: Glance[];
};

// Source: Google Scholar profile (citations, venues) and OpenAlex (full abstracts, DOIs), checked 2026-10-06.
export const scholar = {
  name: "Pratim Mangaldas Dasude",
  profile: "https://scholar.google.com/citations?user=Hll9_4oAAAAJ&hl=en",
  citations: 9,
  hIndex: 3,
  i10Index: 0,
  asOf: "Oct 2026",
};

export const authorName = "Pratim Mangaldas Dasude";

const scholarView = (id: string) =>
  `https://scholar.google.com/citations?view_op=view_citation&hl=en&user=Hll9_4oAAAAJ&citation_for_view=Hll9_4oAAAAJ:${id}`;

export const papers: Paper[] = [
  {
    slug: "speech-emotion-recognition",
    title:
      "Investigating Deep Learning Architectures for Robust Speech Emotion Recognition: A Study of LSTM, CNN, and CLSTM Models",
    authors: ["Pratim Mangaldas Dasude", "Utkarsh Anand", "Amlan Nayak", "Debapam Pal"],
    venue: "2024 International Conference on Intelligent Computing and Emerging Communication Technologies (ICEC)",
    venueShort: "ICEC 2024",
    publisher: "IEEE",
    date: "2024-11-23",
    pages: "1-6",
    citations: 3,
    topic: "Speech / Audio",
    ieeeUrl: "https://ieeexplore.ieee.org/abstract/document/10837169/",
    doi: "10.1109/ICEC59683.2024.10837169",
    scholarUrl: scholarView("u-x6o8ySG0sC"),
    abstract:
      "A key step in affective computing and interaction between humans and computers is speech emotion recognition (SER). Deep learning architectures have demonstrated promising performance in a variety of natural language processing applications, including voice emotion identification. In this paper, we investigate the efficacy of three deep learning architectures are Long Short-Term Memory (LSTM), Convolutional Neural Network (CNN), and Convolutional LSTM (CLSTM) for robust voice emotion identification. We run studies on publically available speech emotion datasets, using pre-processing techniques like feature extraction and normalization. To examine the resilience of each model, we train and evaluate its performance across multiple emotion classes and environmental situations. In addition, we look into how hyperparameter tweaking and model architectural changes affect each model's recognition accuracy and computing efficiency. Our findings shed light on the merits and limits of each architecture, as well as recommendations for selecting the best deep learning strategy for robust voice emotion identification applications. Overall, this work advances the technology in speech emotion recognition and enables the creation of more effective human-computer interaction systems capable of effectively interpreting and responding to users' emotional states.",
    glance: [
      { k: "Task", v: "Speech emotion recognition" },
      { k: "Data", v: "Publicly available speech emotion datasets" },
      { k: "Models", v: "LSTM, CNN, Convolutional LSTM (CLSTM)" },
      { k: "Preprocessing", v: "Feature extraction and normalization" },
      { k: "Evaluated on", v: "Multiple emotion classes and environmental conditions; accuracy and computing efficiency" },
    ],
  },
  {
    slug: "stress-detection-bert-mlp",
    title: "Leveraging BERT-Enhanced MLP Classifier for Automated Stress Detection in Social Media Articles",
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
    ieeeUrl: "https://ieeexplore.ieee.org/abstract/document/10743857/",
    doi: "10.1109/ACROSET62108.2024.10743857",
    scholarUrl: scholarView("u5HHmVD_uO8C"),
    abstract:
      "The surge in stress-related content on social media platforms has sparked concerns over the mental well-being of online community members. This study addresses the detection of stress from social media articles, focusing on data gathered from platforms such as Reddit and Twitter. Through the application of machine learning techniques, our objective is to create automated tools capable of identifying stress-inducing content and tracking mental health trends in online discourse. To achieve this, we compiled a dataset comprising over 8000 social media articles from Reddit and Twitter, each labeled as stress-inducing or non-stress-inducing. Our analysis began with exploratory data analysis to uncover insights into the dataset's characteristics, followed by preprocessing steps to clean and prepare the text data for modeling. Experiments using various machine learning models, including Logistic Regression, Gaussian Processes Classifier, and BERT-Enhanced MLP Classifier, were then conducted. The latter leverages BERT embeddings to capture contextualized representations of the text data, resulting in superior classification performance. The results demonstrate the BERT-Enhanced MLP Classifier's effectiveness, achieving an accuracy of 0.95 and surpassing baseline models. This study contributes to the advancement of automated tools for mental health monitoring and support in online communities, potentially aiding in timely interventions for individuals at risk.",
    glance: [
      { k: "Task", v: "Stress detection in social media text" },
      { k: "Data", v: "Over 8,000 Reddit and Twitter articles, labeled stress-inducing or not" },
      { k: "Models", v: "Logistic Regression, Gaussian Processes Classifier, BERT-Enhanced MLP" },
      { k: "Best result", v: "BERT-Enhanced MLP, accuracy 0.95, ahead of the baselines" },
    ],
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
    ieeeUrl: "https://ieeexplore.ieee.org/abstract/document/10616322/",
    doi: "10.1109/ICICET59348.2024.10616322",
    scholarUrl: scholarView("d1gkVwhDpl0C"),
    abstract:
      "With the increased use of digital communication, the battle against spam has gotten more fierce. It highlights how important spam identification is to systems like social media moderation, email filtering, and comment spam avoidance. Machine learning algorithms must always be enhanced in order to stay ahead of newly developed spamming techniques and provide a safe online environment. This study uses a Kaggle dataset that was originally meant for spam detection. To conduct multilingual spam detection in French, German, and English, the data required some transformations and transitions. Thorough preparation, such as stop-word removal, tokenization, and category classification according to language, improves the dataset's flexibility for investigating intricate spam patterns in multilingual settings. To achieve the desired outcomes, a variety of machine learning algorithms like Multinomial NB, XGBoost, LSTM and BERT were appropriately applied. Among the models tested, Multinomial Naive Bayes exhibited superior performance with a remarkable combined accuracy of 98.1%, positioning it as a reliable choice for spam detection. With rigorous data cleaning, exploration, and model evaluation as a foundation, the work offers useful insights for spam detection on a variety of language datasets.",
    glance: [
      { k: "Task", v: "SMS spam detection in French, German and English" },
      { k: "Data", v: "A Kaggle spam dataset, transformed for multilingual use" },
      { k: "Preprocessing", v: "Stop-word removal, tokenization, categorization by language" },
      { k: "Models", v: "Multinomial Naive Bayes, XGBoost, LSTM, BERT" },
      { k: "Best result", v: "Multinomial Naive Bayes, 98.1% combined accuracy" },
    ],
  },
];

export function getPaper(slug: string) {
  return papers.find((p) => p.slug === slug);
}

const initials = (full: string) => {
  const parts = full.split(" ");
  const last = parts[parts.length - 1];
  return `${parts
    .slice(0, -1)
    .map((n) => `${n[0]}.`)
    .join(" ")} ${last}`;
};

/** IEEE-style reference string built from the paper data. */
export function ieeeCitation(p: Paper) {
  const year = p.date.slice(0, 4);
  const month = new Date(p.date).toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });
  return `${p.authors.map(initials).join(", ")}, "${p.title}," in ${p.venue}, ${p.publisher}, ${month}. ${year}, pp. ${p.pages.replace("-", "–")}, doi: ${p.doi}.`;
}
