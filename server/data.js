const data = {
  ranking: [
    {
      username: 'Ahyoung',
      score: '100',
      time: {
        minutes: 20,
        seconds: 10,
      },
      isPrivate: false,
    },
  ],
  badge: [
    {
      badgeRasterizedContentUrl: 'Ahyoung badge',
      badgeEncodedContent: 'Ahyoung badge encoded content',
      badgeUploadFile: 'Ahyoung upload',
      badgeRequirementsAccuracy: 5,
    },
  ],
  certificate: [
    {
      certificateRasterizedContentUrl: 'Ahyoung certificate',
      certificateEncodedContent: 'Ahyoung certificate encoded',
      certificateUploadFile: 'Ahyoung certi upload',
      certificateRequirementsAccuracy: 2,
    },
  ],
  platform: [
    {
      platformName: 'sample Ahyoung platform',
      platformDescription: 'dummy Ahyoung platform description',
      platformImage: 'dummy platform image',
      quizId: 'ownedQuizzes Object Id',
      createdDate: Date.now(),
    },
  ],
  creator: [
    {
      platformId: 'platform Object Id',
      creatorImage: 'sample creator image',
      selfIntroduction: 'hello, this is Ahyoung',
      creatorUsername: 'AhyoungOh',
      creatorEmail: 'ahyoung.oh@gmail.com',
    },
  ],
  consumer: [
    {
      consumerDescription: 'consumer description',
      consumerImage: 'consumer dummy image',
      consumerUsername: 'Ahyoung',
      consumerEmail: 'ahyoung.oh@stonybrook.edu',
      password: 'password',
      consumerIsPrivate: false,
    },
  ],
};

export default data;
