# PocketWriter

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/kartik3yaS/PocketWriter.git
```

### 2. Install Dependencies

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd ..
cd server
npm install
```

### 3. Create a `.env` file in the `server` directory with the following variables

```bash
PORT=5000
MONGO_URI=mongodb+srv://PocketWriter:LavVuWpUisSKfKrj@cluster0.lnvzawa.mongodb.net/pocket_writer?retryWrites=true&w=majority&appName=Cluster0
```

### 4. Start the development server

#### Backend

```bash
cd ..
cd server
npm run dev
```

#### Frontend (Run in a Separate Terminal)

```bash
cd client
npm start
```

### 5. Localhost URL (Open it in the browser)

```bash
http://localhost:3000
```

## Technologies Used

### Frontend
- **React.js**
- **CSS**

### Backend
- **Node.js**
- **Express.js**

### Database
- **MongoDB**
