# SV Plaza Electricity Bill

A comprehensive full-stack web application for calculating and managing electricity bills among multiple clients in SV Plaza including V4 group. The application provides real-time calculations, interactive dashboard, professional bill generation with support for both MWH and KWH readings, PDF export functionality, and calendar-based month/year selection.

## 🚀 Features

### Core Functionality
- **Client Management**: Handles 5 clients with individual electricity meters
- **Real-time Calculations**: Live updates for net readings, losses, charges, and totals
- **Multiple Unit Support**: Both MWH and KWH meter readings
- **Loss Calculation**: Automatic calculation of difference between main and sub meters
- **Tax and Fuel Costs**: Automatic percentage-based tax and fuel cost calculation
- **Professional Dashboard**: Clean, responsive table-based interface
- **PDF Export**: High-quality PDF generation with landscape A3 format
- **Calendar Selection**: Month and year picker for flexible billing periods

### Advanced Features
- **Currency Formatting**: Indian Rupee (₹) formatting with proper comma separation
- **Color-coded Rows**: Different background colors for easy client identification
- **Percentage-based Tax Calculation**: Automatic distribution of total tax amount based on predefined percentages
- **Calendar Picker**: User-selectable month and year with dropdown interface
- **PDF Generation**: Professional PDF export with html2pdf.js library
- **Responsive Design**: Optimized for both screen viewing and PDF printing
- **Total Summary Box**: Highlighted total amount display in black box design

### Client Details & Tax Percentages
1. **Park Avenue Hotel (MWH)** - 65 KVA - Terracotta background - **51.76% tax share**
2. **Mishwar (MWH)** - 35 KVA - Creme background - **26.54% tax share**
3. **Prasad Eye Hospital (KWH)** - 10 KVA - Blue background - **8.84% tax share**
4. **V4 Group (KWH)** - 5 KVA - Green background - **4.42% tax share**
5. **Common Area/Lift (KWH)** - 10 KVA - Silver background - **8.44% tax share**

## 🛠️ Technology Stack

### Frontend
- **React 18+**: Modern functional components with hooks
- **CSS3**: Custom styling with responsive design
- **Axios**: HTTP client for API communication
- **html2pdf.js**: PDF generation library for bill export
- **JavaScript ES6+**: Modern syntax and features

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **JSON**: Data storage for client information with tax percentages
- **CORS**: Cross-origin resource sharing

##  Architecture Overview

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
- **Input Management**: Handles user inputs (present/previous readings, main meter, tax amount)
- **Real-time Calculations**: Performs all mathematical computations client-side
- **Tax Distribution**: Automatically calculates individual tax amounts based on percentages
- **State Management**: Maintains application state using React hooks
- **API Communication**: Fetches client data from backend via Axios
- **Dynamic Rendering**: Updates UI automatically based on user input
- **Formatting Logic**: Handles currency formatting and number display
- **Color Coding**: Applies conditional styling based on client names
- **Responsive Design**: Ensures proper display across different screen sizes
- **Calendar Management**: Month/year selection with dropdown interface
- **PDF Generation**: Creates professional PDF bills with landscape A3 format
- **PDF Optimization**: Hides interactive elements during PDF export

### Data Flow
1. **Backend**: Serves client configuration data (names, types, minimum charges, tax percentages)
2. **Frontend**: Fetches client data on application load
3. **Frontend**: Handles all user inputs and calculations
4. **Frontend**: Distributes tax amounts automatically based on percentages
5. **Frontend**: Displays results in real-time without backend interaction
6. **PDF Export**: Generates professional bills with selected month/year

## 📁 Project Structure

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
- **Calendar Interface**: Dropdown selectors for month and year
- **PDF Export Button**: Prominent download button in top-right corner
- **Total Amount Box**: Highlighted black box with total amount display
- **Responsive Design**: Works on desktop and optimized for PDF export
- **Clean Typography**: Easy-to-read fonts and proper spacing

### Calculation Logic
- **Net Reading**: Present Reading - Previous Reading
- **Loss Calculation**: Configurable percentage for meter differences
- **Total Reading**: (Net Reading + Loss Amount) × ₹5.95 per unit
- **Tax Distribution**: Total tax amount × individual percentage = client tax
- **Final Amount**: Total Reading + Minimum Charges + Tax/Fuel Cost

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

4. **Install Frontend Dependencies**
   ```bash
   cd ../client
   npm install
   npm install html2pdf.js
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
3. **Main Meter Reading**: Enter the main meter reading for loss calculation
4. **Tax and Fuel Cost Amount**: Enter total tax amount (automatically distributed by percentage)
5. **Month/Year Selection**: Choose billing period using calendar dropdowns

### Automatic Calculations
- Net readings are calculated automatically
- Loss percentage is computed based on main vs sub-meter difference
- Tax amounts are distributed automatically based on predefined percentages
- Total amounts include all components (reading charges + minimum charges + tax/fuel)
- Grand totals are displayed at the bottom

### Output
- Professional electricity bill format
- Individual client breakdowns with percentage-based tax distribution
- Color-coded rows for easy identification
- Formatted currency display in Indian Rupees
- User-selected monthly/yearly billing period
- High-quality PDF export with landscape A3 format

## 🔧 Configuration

### Client Data (`server/clients.json`)
```json
[
  {
    "id": 1,
    "name": "Park Avenue Hotel (MWH)",
    "mwh": true,
    "minCharge": 21645,
    "taxAndFuelCostPercent": 51.76
  }
  // ... other clients with their respective percentages
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

### Percentage-based Tax Distribution
Enter a single tax amount and it's automatically distributed among clients based on predefined percentages:
- Park Avenue Hotel: 51.76%
- Mishwar: 26.54%
- Prasad Eye Hospital: 8.84%
- V4 Group: 4.42%
- Common Area/Lift: 8.44%

### Calendar-based Billing
Use dropdown selectors to choose any month and year for billing periods. The selected date appears in the title and PDF filename.

### Professional PDF Export
- High-quality PDF generation using html2pdf.js
- Landscape A3 format for optimal table display
- Automatic hiding of interactive elements (calendar, buttons) in PDF
- Filename includes selected month and year
- Professional formatting with all calculations visible

### Color-coded Interface
Each client has a unique background color making it easy to visually distinguish between different accounts.

### Professional Formatting
- Currency amounts are formatted with ₹ symbol and Indian comma notation
- Calculations show the formula (e.g., "269.00 * ₹5.95 = ₹1,600.55")
- Minimum charges display KVA allocation details
- Total amount highlighted in black box design

### Responsive Design
The application works seamlessly on desktop and generates print-ready PDFs.

## 📝 Notes

- Total load capacity: 125 KVA
- Individual client allocations are predefined
- Loss calculations help identify meter discrepancies
- Calendar-based billing with user-selectable month/year
- Percentage-based tax distribution for fair allocation
- PDF export functionality for professional bill delivery
- All financial calculations rounded to 2 decimal places

## 🔮 Future Enhancements

- Email bill delivery integration
- Historical data storage and reporting
- Multi-property support
- Advanced analytics and reporting

## 📄 License

This project is developed for SV Plaza and is proprietary software.

## 🤝 Support

For support and questions regarding the SV Plaza Electricity Bill Calculator, please contact the development team.
