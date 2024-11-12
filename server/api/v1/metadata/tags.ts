export default defineCachedEventHandler(async (event) => {
  const tags = [
    {
      id: "love",
      color: "ed87cb",
      emoji: "💖",
      text: "LOVE",
      textColor: "841937",
      description: "my lovely wife",
    },
    {
      id: "cute",
      color: "77cec8",
      emoji: "💓",
      text: "CUTE",
      textColor: "0f4f68",
      description: "very cute!!!",
    },
    {
      id: "emi",
      color: "a295d8",
      emoji: "💜",
      text: "EMI",
      textColor: "5e2277",
      description: "my love for ever and ever",
    },
    {
      id: "verified",
      color: "8bd67c",
      emoji: "✔️",
      text: "VERIFIED",
      textColor: "266619",
      description: "verified user",
    },
  ];

  return tags;
});
