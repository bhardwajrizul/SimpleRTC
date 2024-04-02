export const configuration = {
  iceServers: [
    {
      urls: "stun:stun.relay.metered.ca:80",
    },
    {
      urls: "turn:global.relay.metered.ca:80",
      username: "2b3679332f705b918630f3d3",
      credential: "E/+wr3zCuEZMM8s3",
    },
    {
      urls: "turn:global.relay.metered.ca:80?transport=tcp",
      username: "2b3679332f705b918630f3d3",
      credential: "E/+wr3zCuEZMM8s3",
    },
    {
      urls: "turn:global.relay.metered.ca:443",
      username: "2b3679332f705b918630f3d3",
      credential: "E/+wr3zCuEZMM8s3",
    },
    {
      urls: "turns:global.relay.metered.ca:443?transport=tcp",
      username: "2b3679332f705b918630f3d3",
      credential: "E/+wr3zCuEZMM8s3",
    },
  ],
};
