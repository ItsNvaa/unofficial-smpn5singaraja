type TNews = {
  news: [
    {
      id: string;
      title: string;
      author: string;
      body: string;
      description: string;
      picture: string;
      createdAt: Date;
      updatedAt: Date;
    }
  ];
  status: string;
};

export default TNews;
