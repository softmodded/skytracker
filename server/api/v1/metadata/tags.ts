export default defineCachedEventHandler(async (event) => {
  const tags = [
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
