# SV Plaza Electricity Bill

A comprehensive full-stack web application for calculating and managing electricity bills among multiple clients in SV Plaza including V4 group. The application provides real-time calculations, interactive dashboard, and professional bill generation with support for both MWH and KWH readings.

## 🚀 Features

### Core Functionality
- **Client Management**: Handles 5 clients with individual electricity meters
- **Real-time Calculations**: Live updates for net readings, losses, charges, and totals
- **Multiple Unit Support**: Both MWH and KWH meter readings
- **Loss Calculation**: Automatic calculation of difference between main and sub meters
- **Tax and Fuel Costs**: Individual tax and fuel cost inputs for each client
- **Professional Dashboard**: Clean, responsive table-based interface

### Advanced Features
- **Currency Formatting**: Indian Rupee (₹) formatting with proper comma separation
- **Color-coded Rows**: Different background colors for easy client identification
- **Monthly Billing**: Automatic month/year display from device calendar
- **Minimum Charges**: Pre-configured minimum charges based on KVA allocation
- **Total Calculations**: Comprehensive totals with breakdown of all components

### Client Details
1. **Park Avenue Hotel (MWH)** - 65 KVA - Terracotta background
2. **Mishwar (MWH)** - 35 KVA - Creme background
3. **Prasad Eye Hospital (KWH)** - 10 KVA - Blue background
4. **V4 Group (KWH)** - 5 KVA - Green background
5. **Common Area/Lift (KWH)** - 10 KVA - Silver background

## 🛠️ Technology Stack

### Frontend
- **React 18+**: Modern functional components with hooks
- **CSS3**: Custom styling with responsive design
- **Axios**: HTTP client for API communication
- **JavaScript ES6+**: Modern syntax and features

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **JSON**: Data storage for client information
- **CORS**: Cross-origin resource sharing

## � Architecture Overview

### Backend Responsibilities
The Node.js/Express backend serves as the data layer and API provider:

- **Data Management**: Stores and serves client information from `clients.json`
- **API Endpoints**: Provides RESTful API at `/api/clients` to fetch client data
- **Static Data Serving**: Delivers client names, MWH/KWH flags, and minimum charges
- **CORS Configuration**: Enables cross-origin requests from the React frontend
- **Server Management**: Runs on port 5000 and handles HTTP requests
- **JSON Processing**: Reads and parses client configuration data
- **Error Handling**: Manages server-side errors and API responses

### Frontend Responsibilities
The React frontend handles all user interactions and business logic:

- **User Interface**: Renders the electricity bill calculator dashboard
- **Input Management**: Handles all user inputs (present/previous readings, tax/fuel costs)
- **Real-time Calculations**: Performs all mathematical computations client-side
- **State Management**: Maintains application state using React hooks
- **API Communication**: Fetches client data from backend via Axios
- **Dynamic Rendering**: Updates UI automatically based on user input
- **Formatting Logic**: Handles currency formatting and number display
- **Color Coding**: Applies conditional styling based on client names
- **Responsive Design**: Ensures proper display across different screen sizes
- **Date Handling**: Displays current month/year from device calendar

### Data Flow
1. **Backend**: Serves client configuration data (names, types, minimum charges)
2. **Frontend**: Fetches client data on application load
3. **Frontend**: Handles all user inputs and calculations
4. **Frontend**: Displays results in real-time without backend interaction

## �📁 Project Structure

```
sv/
├── client/                 # React frontend
│   ├── public/
│   │   ├── index.html     # HTML template with custom favicon
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── index.js       # React entry point
│   │   ├── styles.css     # Custom CSS styles
│   │   └── setupProxy.js  # Development proxy setup
│   └── package.json       # Frontend dependencies
├── server/                 # Node.js backend
│   ├── clients.json       # Client data and minimum charges
│   ├── index.js          # Express server
│   └── package.json      # Backend dependencies
└── README.md             # Project documentation
```

## 🎨 UI Features

### Design Elements
- **Subtle Energy Theme**: Greenish gradient background for pleasing aesthetics
- **Professional Table**: White background with enhanced shadows and borders
- **Color-coded Rows**: Each client has a unique background color
- **Responsive Design**: Works on desktop and mobile devices
- **Clean Typography**: Easy-to-read fonts and proper spacing

### Calculation Logic
- **Net Reading**: Present Reading - Previous Reading
- **Loss Calculation**: Configurable percentage for meter differences
- **Total Reading**: Net Reading + Loss Amount
- **Rate Calculation**: Total Reading × ₹5.95 per unit
- **Final Amount**: Rate + Minimum Charges + Tax/Fuel

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sv
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Start the Backend Server**
   ```bash
   cd ../server
   npm start
   ```
   Server runs on: `http://localhost:4000`

5. **Start the Frontend Application**
   ```bash
   cd ../client
   npm start
   ```
   Application runs on: `http://localhost:3000`

## 📊 Usage

### Input Data
1. **Present Reading**: Enter current meter reading for each client
2. **Previous Reading**: Enter previous month's meter reading
3. **Tax/Fuel Cost**: Add individual tax and fuel charges per client
4. **Main Meter Reading**: Enter the main meter reading for loss calculation

### Automatic Calculations
- Net readings are calculated automatically
- Loss percentage is computed based on main vs sub-meter difference
- Total amounts include all components (reading charges + minimum charges + tax/fuel)
- Grand totals are displayed at the bottom

### Output
- Professional electricity bill format
- Individual client breakdowns
- Color-coded rows for easy identification
- Formatted currency display in Indian Rupees
- Monthly/yearly billing period

## 🔧 Configuration

### Client Data (`server/clients.json`)
```json
[
  {
    "id": 1,
    "name": "Park Avenue Hotel (MWH)",
    "mwh": true,
    "minCharge": 21645
  }
  // ... other clients
]
```

### Minimum Charges (KVA-based)
- Park Avenue Hotel: 58.5 KV × ₹370 = ₹21,645
- Mishwar: 31.5 KV × ₹370 = ₹11,655
- Prasad Eye Hospital: 9 KV × ₹370 = ₹3,330
- V4 Group: 5 KV × ₹370 = ₹1,850
- Common Area/Lift: 9 KV × ₹370 = ₹3,330

## 🎯 Development

### Available Scripts

**Frontend (`/client`)**
- `npm start`: Development server
- `npm build`: Production build
- `npm test`: Run tests

**Backend (`/server`)**
- `npm start`: Start Express server
- `npm dev`: Development mode with nodemon

### API Endpoints
- `GET /api/clients`: Fetch all client data including minimum charges

## 🌟 Key Features Explanation

### Real-time Calculations
All calculations update automatically as you type, providing immediate feedback on billing amounts.

### Color-coded Interface
Each client has a unique background color making it easy to visually distinguish between different accounts.

### Professional Formatting
- Currency amounts are formatted with ₹ symbol and Indian comma notation
- Calculations show the formula (e.g., "0.00 * 5.95 = 0.00")
- Minimum charges display KVA allocation details

### Responsive Design
The application works seamlessly on both desktop and mobile devices with proper touch-friendly input fields.

## 📝 Notes

- Total load capacity: 125 KVA
- Individual client allocations are predefined
- Loss calculations help identify meter discrepancies
- Monthly billing cycle with automatic date detection
- All financial calculations rounded to 2 decimal places

## 🔮 Future Enhancements

- PDF bill generation
- Historical data storage
- Email bill delivery
- Advanced reporting and analytics
- User authentication and role management
- Backup and restore functionality

## 📄 License

This project is developed for SV Plaza electricity bill management and is proprietary software.

## 🤝 Support

For support and questions regarding the SV Plaza Electricity Bill Calculator, please contact the development team.
