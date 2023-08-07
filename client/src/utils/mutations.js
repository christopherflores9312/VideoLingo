export const PROCESS_VIDEO = `
    mutation ProcessVideo($url: String!, $name: String!, $userId: ID!) {
        processVideo(url: $url, name: $name, userId: $userId) {
            url
        }
    }
`;

export const DELETE_VIDEO = `
  mutation DeleteVideo($id: ID!) {
    deleteVideo(id: $id) {
      _id
    }
  }
`;
