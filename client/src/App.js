
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';
import html2pdf from 'html2pdf.js';

const RATE = 5.95;


function App() {
  // PDF download handler
  const handleDownloadPDF = () => {
    const monthYear = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
    const fileName = `SV Plaza Electricity Bill ${monthYear}`;
    const element = document.getElementById('bill-content');
    html2pdf().set({
      margin: 0.5,
      filename: `${fileName}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, scrollY: 0 },
      jsPDF: { unit: 'in', format: 'a3', orientation: 'landscape' },
      pagebreak: { mode: ['avoid-all'] }
    }).from(element).save();
  };
  const [clients, setClients] = useState([]);
  const [readings, setReadings] = useState({});
  const [billNetReading, setBillNetReading] = useState('');
  const [taxFuelAmount, setTaxFuelAmount] = useState('');
  const [minCharges, setMinCharges] = useState({});

  useEffect(() => {
  axios.get('https://sv-plaza-electricity-bill.onrender.com/api/clients').then(res => {
      setClients(res.data);
      // Initialize readings and minCharges
      const initialReadings = {};
      const initialMinCharges = {};
      res.data.forEach(client => {
        initialReadings[client.id] = { prev: 0, present: 0 };
        initialMinCharges[client.id] = client.minCharge || 0;
      });
      setReadings(initialReadings);
      setMinCharges(initialMinCharges);
    });
  }, []);

  // Calculation logic
  const netReadings = clients.map(client => {
    const { prev, present } = readings[client.id] || {};
    let net = Number(present) - Number(prev);
    if (client.mwh) net *= 1000;
    return net > 0 ? net : 0;
  });

  const totalNetReading = netReadings.reduce((a, b) => a + b, 0);
  const billNetReadingNum = billNetReading === '' ? 0 : Number(billNetReading);
  const lossPercent = totalNetReading ? Math.abs((totalNetReading - billNetReadingNum) / totalNetReading * 100) : 0;

  const clientLoss = netReadings.map(net => net * (lossPercent / 100));
  // Total reading = net reading + (net reading * loss percentage)
  const totalReadingRs = netReadings.map((net, i) => (net + clientLoss[i]) * RATE);
  const totalReadingSum = totalReadingRs.reduce((a, b) => a + b, 0);

  const minChargesSum = Object.values(minCharges).reduce((a, b) => a + b, 0);

  // Per-client tax/fuel (auto-calculated)
  const taxFuelPerClient = clients.map(client => {
    const percent = client.taxAndFuelCostPercent || 0;
    return taxFuelAmount === '' ? 0 : (Number(taxFuelAmount) * percent / 100);
  });
  const totalAmount = clients.map((client, i) => totalReadingRs[i] + (minCharges[client.id] || 0) + taxFuelPerClient[i]);
  const totalAmountSum = totalAmount.reduce((a, b) => a + b, 0);
  const totalTaxFuel = taxFuelPerClient.reduce((a, b) => a + b, 0);
  
    // Format number as Indian currency with rupee symbol
    function formatINR(num) {
      const rounded = Math.floor(num) + (num - Math.floor(num) > 0.5 ? 1 : 0);
      return '₹' + rounded.toLocaleString('en-IN') + '.00';
    }

  // Handlers
  const handleReadingChange = (id, field, value) => {
    setReadings(r => ({ ...r, [id]: { ...r[id], [field]: value } }));
  };
  const handleMinChargeChange = (id, value) => {
    setMinCharges(m => ({ ...m, [id]: Number(value) }));
  };
  const handleTaxFuelAmountChange = (value) => {
    setTaxFuelAmount(value);
  };

  return (
    <div style={{ 
      padding: 24, 
      fontFamily: 'sans-serif',
      background: 'linear-gradient(135deg, #f0f8f0 0%, #e8f5e8 50%, #f0f8f0 100%)',
      minHeight: '100vh',
      backgroundAttachment: 'fixed'
    }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 16 }}>
        <button onClick={handleDownloadPDF} style={{
          background: '#111',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          padding: '10px 24px',
          fontWeight: 'bold',
          fontSize: '1rem',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.10)'
        }}>
          Download as PDF
        </button>
      </div>
      <div id="bill-content">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '30px 0 20px 0' }}>
          <span style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'inherit' }}>
            SV Plaza Electricity Bill
          </span>
          <span style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'inherit', marginLeft: '18px' }}>
            {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
          </span>
        </div>
        <table border="1" cellPadding="8" style={{ 
          width: '100%', 
          marginBottom: 16, 
          background: '#fff', 
          borderRadius: 12, 
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)', 
          border: '1px solid #d0d7de',
          overflow: 'hidden'
        }}>
          <thead style={{ background: '#f0f0f0' }}>
            <tr className="peach-row">
              <th>SL No.</th>
              <th>Clients</th>
              <th>Present Reading</th>
              <th>Previous Reading</th>
              <th>Net Reading</th>
              <th>Difference in Main and Sub Meter</th>
              <th>Total Reading (A)</th>
              <th>Minimum Charges (B)</th>
              <th>Tax + Fuel Cost (C)</th>
              <th>Total Amount (A+B+C)</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, i) => (
              <tr key={client.id} className={client.name.includes('V4 Group') ? 'green-row' : client.name.includes('Park Avenue Hotel') ? 'terracotta-row' : client.name.includes('Mishwar') ? 'creme-row' : client.name.includes('Prasad Eye Hospital') ? 'lightblue-row' : client.name.includes('Common Area/Lift') ? 'steel-row' : ''}>
                <td>{i + 1}</td>
                <td>{client.name}</td>
                <td><input type="number" value={readings[client.id]?.present || ''} onChange={e => handleReadingChange(client.id, 'present', e.target.value)} /></td>
                <td><input type="number" value={readings[client.id]?.prev || ''} onChange={e => handleReadingChange(client.id, 'prev', e.target.value)} /></td>
                <td>{netReadings[i].toFixed(2)}</td>
                <td>{Math.round(clientLoss[i])}</td>
                <td>
                  {formatINR(totalReadingRs[i])}
                </td>
                <td style={{ textAlign: 'center' }}>
                  {(() => {
                    // Hardcoded values for display, matching your image
                    const minChargeLabels = [
                      '58.5 KV * ₹370 = ₹21,645',
                      '31.5 KV * ₹370 = ₹11,655',
                      '9 KV * ₹370 = ₹3,330',
                      '5 KV * ₹370 = ₹1,850',
                      '9 KV * ₹370 = ₹3,330'
                    ];
                    return minChargeLabels[i];
                  })()}
                </td>
                <td>
                  {taxFuelAmount === '' ? '' : formatINR(taxFuelPerClient[i])}
                </td>
                <td>{formatINR(totalAmount[i])}</td>
              </tr>
            ))}
          </tbody>
          <tfoot style={{ background: '#f9f9f9', fontWeight: 'bold' }}>
            <tr className="peach-row">
              <td colSpan={4}>Total</td>
              <td>{totalNetReading}</td>
              <td>{clientLoss.reduce((a, b) => a + b, 0).toFixed(2)}</td>
              <td>{formatINR(totalReadingSum)}</td>
              <td>{formatINR(minChargesSum)}</td>
              <td>{formatINR(totalTaxFuel)}</td>
              <td>{formatINR(totalAmountSum)}</td>
            </tr>
          </tfoot>
        </table>
        <div style={{ marginBottom: 16 }}>
          <label>Main Meter Reading : <input type="number" value={billNetReading} onChange={e => setBillNetReading(e.target.value)} /></label>
          <span style={{ marginLeft: 24 }}>%: <b>{lossPercent.toFixed(2)}</b></span>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Tax and Fuel Cost Amount : <input type="number" value={taxFuelAmount} onChange={e => handleTaxFuelAmountChange(e.target.value)} /></label>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 16 }}>
          <div style={{ fontSize: 16, maxWidth: '60%' }}>
            <b>Note:</b> Total load 125KVA and allotted load for<br />
            1. Park Avenue Hotel - 65 KVA<br />
            2. Mishwar - 35 KVA<br />
            3. Prasad Eye Hospital - 10 KVA<br />
            4. V4 Group - 5 KVA<br />
            5. Common Area/Lift - 10 KVA
          </div>
          <div style={{
            background: '#111',
            color: '#fff',
            borderRadius: '10px',
            padding: '18px 32px',
            fontWeight: 'bold',
            fontSize: '1.25rem',
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            border: '2px solid #000',
            minWidth: '260px',
            textAlign: 'right'
          }}>
            Total Amount: {formatINR(totalAmountSum)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
