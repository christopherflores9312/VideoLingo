export const PROCESS_VIDEO = `
    mutation ProcessVideo($url: String!) {
        processVideo(url: $url) {
            url
        }
    }
`;
