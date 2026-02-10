const axios = require('axios');

const BASE = process.env.BASE_URL || 'http://localhost:3000';

const run = async () => {
  try {
    console.log('Health:');
    const h = await axios.get(`${BASE}/health`);
    console.log(h.data);

    console.log('\nFibonacci (7):');
    const f = await axios.post(`${BASE}/bfhl`, { fibonacci: 7 });
    console.log(f.data);

    console.log('\nPrime filter [2,4,7,9,11]:');
    const p = await axios.post(`${BASE}/bfhl`, { prime: [2,4,7,9,11] });
    console.log(p.data);

    console.log('\nLCM [12,18,24]:');
    const l = await axios.post(`${BASE}/bfhl`, { lcm: [12,18,24] });
    console.log(l.data);

    console.log('\nHCF [24,36,60]:');
    const hcf = await axios.post(`${BASE}/bfhl`, { hcf: [24,36,60] });
    console.log(hcf.data);

    console.log('\nAI fallback (if no API key):');
    const ai = await axios.post(`${BASE}/bfhl`, { AI: 'What is the capital of Haryana?' });
    console.log(ai.data);

  } catch (err) {
    if (err.response) console.error(err.response.data);
    else console.error(err.message);
    process.exit(1);
  }
};

run();
