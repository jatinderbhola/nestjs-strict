export default () => ({
  documentation: {
    enabled: true,
    definition: {
      openapi: '3.1.0',
      info: {
        title: 'Ms-shippingxp API',
        version: '1.0.0',
        contact: {
          name: 'Argonauts',
          url: 'https://ssense.slack.com/archives/C01N4PP65EG',
        },
      },
      servers: [
        {
          url: 'http://localhost:5033',
          description: 'Local server in docker container',
        },
        {
          url: 'http://localhost:8080',
          description: 'Local server development',
        },
        {
          url: 'https://internal-edge-qa.ssense.com/ms-shippingxp',
          description: 'QA server',
        },
        {
          url: 'https://internal-edge.ssense.com/ms-shippingxp',
          description: 'Production server',
        },
      ],
    },
    openApiDocsPath: 'docs/openAPI/api.yaml',
  },
});
