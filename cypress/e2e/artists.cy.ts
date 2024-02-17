

describe('API Students Endpoint Tests', () => {
  const supabaseUrl = Cypress.env('https://tpvfeqapgwpnunytzfzs.supabase.co');
  const apiKey = Cypress.env('NEXT_PUBLIC_SUPABASE_ANON_KEY');

  it('fetches students', () => {
    cy.request({
      method: 'GET',
      url: `${supabaseUrl}/rest/v1/students`,
      headers: {
        'apikey': apiKey,
      },
    })
    .then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });
});
