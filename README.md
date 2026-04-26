# 🌄 Vanvaas

Vanvaas is a full-stack web application designed to help users discover, create, and manage camping destinations across India. Inspired by YelpCamp, the platform is adapted for localized use cases and focuses on community-driven exploration of offbeat travel locations.

---

## 🚀 Features

* 🏕️ **Campground Management**

  * Create, view, and delete campground listings
  * Each listing includes title, image, price, description, and location

* ⭐ **Review System**

  * Users can add and delete reviews
  * Ratings help others evaluate campgrounds

* 🔽 **Sorting Functionality**

  * Sort campgrounds by price (Low → High / High → Low)

* 🤖 **AI Review Summarization**

  * Generates concise summaries of user reviews using an external AI API

* 🔐 **Authentication**

  * Session-based login system using `express-session`

---

## 🛠️ Tech Stack

### **Frontend**

* EJS (Embedded JavaScript Templates)
* Bootstrap
* JavaScript

### **Backend**

* Node.js
* Express.js

### **Database**

* MongoDB
* Mongoose

### **Authentication & Security**

* express-session
* bcrypt (for password hashing)

---

## 🧪 Testing

* **TestNG** – Used for unit testing application logic
* **XSLT + Apache ANT** – Used to convert XML test results into HTML reports
* **Selenium WebDriver** – Used for automated browser testing

---

## 📂 Project Structure

```
Vanvaas/
├── models/
├── routes/
├── views/
├── utils/
├── tests/
│   └── VanvaasTesting/
├── public/
├── app.js
├── package.json
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```
git clone https://github.com/bkanishka004/Vanvaas.git
cd Vanvaas
```

### 2. Install dependencies

```
npm install
```

### 3. Setup environment variables

Create a `.env` file and add:

```
MONGO_URI=your_mongodb_connection
GEMINI_API_KEY=your_api_key
SESSION_SECRET=your_secret
```

### 4. Run the application

```
node app.js
```

or (for development):

```
nodemon app.js
```

---

## 🌐 Usage

* Open browser and go to:

```
http://localhost:3000
```

* Register/Login
* Add campgrounds
* Explore listings
* Add reviews
* View AI-generated summaries

