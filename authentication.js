const authentication = {
    type: 'oauth2',
    oauth2Config: {
      authorizeUrl: {
        method: 'GET',
        url: 'https://github.com/login/oauth/authorize',
        params: {
          client_id: '{{process.env.CLIENT_ID}}',
          scope: 'repo',
          state: '{{bundle.inputData.state}}',
        },
      },
      getAccessToken: {
        method: 'POST',
        url: 'https://github.com/login/oauth/access_token',
        body: {
          client_id: '{{process.env.CLIENT_ID}}',
          client_secret: '{{process.env.CLIENT_SECRET}}',
          code: '{{bundle.inputData.code}}',
          state: '{{bundle.inputData.state}}',
        },
        headers: {
          Accept: 'application/json',
        },
      },
      scope: 'repo',
      autoRefresh: false, 
    },
    test: {
      url: 'https://api.github.com/user',
    },
    connectionLabel: '{{json.login}}',
  };
  
  module.exports = authentication;
  