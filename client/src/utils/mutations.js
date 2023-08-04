export const PROCESS_VIDEO = `
    mutation ProcessVideo($url: String!, $name: String!) {
        processVideo(url: $url, name: $name) {
            url
        }
    }
`;