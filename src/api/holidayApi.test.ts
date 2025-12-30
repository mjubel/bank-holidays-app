import { fetchBankHolidays } from './holidayApi';


global.fetch = jest.fn() as jest.Mock;

describe('API Fetching', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns a list of holidays on success', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        "england-and-wales": { 
          events: [{ title: 'Test Holiday', date: '2025-12-25' }] 
        },
        "scotland": { events: [] },
        "northern-ireland": { events: [] }
      })
    });

    const result = await fetchBankHolidays();
    expect(Array.isArray(result)).toBe(true);
  });

  it('handles 500 server errors', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500
    });

    // Hide console.error output during test
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    try {
      await fetchBankHolidays();
    } catch (err: any) {
      expect(err.message).toContain('500');
    }

    spy.mockRestore();
  });
});