
const perform = async (z, bundle) => {
    // Prepare the request URL with dynamic repository owner and name
    const owner = bundle.inputData.owner;
    const repo = bundle.inputData.repo;
    const url = `https://api.github.com/repos/${owner}/${repo}/issues`;
  
    // Prepare the parameters
    const params = {
      state: 'all', // Change to 'open' if you only want open issues
      since: bundle.meta.last_poll || new Date(0).toISOString(),
      per_page: 100, // GitHub's maximum per page
    };
  
    // Make the API request
    const response = await z.request({
      url: url,
      params: params,
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });
  
    if (response.status !== 200) {
      throw new Error(`Unexpected status code ${response.status}: ${response.content}`);
    }
  
    const issues = response.data;
  
    // Map the issues to the expected format
    return issues.map(issue => {
      return {
        id: issue.id,
        title: issue.title,
        body: issue.body,
        state: issue.state,
        url: issue.html_url,
        user_login: issue.user.login,
        user_id: issue.user.id,
        created_at: issue.created_at,
        updated_at: issue.updated_at,
      };
    });
  };
  
  module.exports = {
    key: 'new_issue',
    noun: 'Issue',
  
    display: {
      label: 'New Issue',
      description: 'Triggers when a new issue is created in GitHub.',
    },
  
    operation: {
      inputFields: [
        { key: 'owner', label: 'Repository Owner', required: true, type: 'string' },
        { key: 'repo', label: 'Repository Name', required: true, type: 'string' },
      ],
      perform,
      sample: {
        id: 1,
        title: 'Sample Issue Title',
        body: 'This is a sample issue body.',
        state: 'open',
        url: 'https://github.com/USERNAME/REPO_NAME/issues/1',
        user_login: 'sampleuser',
        user_id: 123456,
        created_at: '2023-10-01T12:34:56Z',
        updated_at: '2023-10-01T12:34:56Z',
      },
      outputFields: [
        { key: 'id', label: 'Issue ID', type: 'integer' },
        { key: 'title', label: 'Title', type: 'string' },
        { key: 'body', label: 'Body', type: 'string' },
        { key: 'state', label: 'State', type: 'string' },
        { key: 'url', label: 'URL', type: 'string' },
        { key: 'user_login', label: 'User Login', type: 'string' },
        { key: 'user_id', label: 'User ID', type: 'integer' },
        { key: 'created_at', label: 'Created At', type: 'datetime' },
        { key: 'updated_at', label: 'Updated At', type: 'datetime' },
      ],
    },
  };
  