# DBuilder Control Panel 🛠️

**DBuilder Control Panel** is a specialized web-based configuration tool designed for the precision drawing and customization of garage doors. Unlike standard image-based configurators, this project utilizes high-performance **HTML5 Canvas** rendering to dynamically draw door components based on exact coordinates and user-defined parameters.

---

## 🛠️ Tech Stack

* **Frontend:** JavaScript (ES5), HTML5, CSS3
* **Rendering Engine:** **HTML5 Canvas API** (Core logic for coordinate-based drawing)
* **Backend:** Python with **Flask Framework** (API services)
* **Database:** **MongoDB** (To store door configurations and coordinate sets)
* **Environment:** `python-dotenv` for configuration management

---

## ✨ Key Features

* **Coordinate-Based Drawing:** Precisely renders garage door panels, tracks, and hardware using dynamic canvas coordinates.
* **Real-time Configuration:** Adjust dimensions, panel counts, and styles with instant visual updates on the canvas.
* **Interactive Control Panel:** A dedicated UI to manipulate the properties of the drawn objects.
* **Export/Save Capability:** Save specific door configurations to MongoDB for future retrieval or manufacturing reference.
* **Responsive Canvas:** The drawing area scales to accommodate different screen sizes while maintaining coordinate accuracy.

---

## 🚀 Getting Started

### 1. Prerequisites
* Python 3.10+
* MongoDB (Local or Atlas)
* A modern web browser with Canvas support

### 2. Installation
Clone the repository:
```bash
git clone https://github.com/Sundaraj0828/DBuilder_control_panel.git
cd DBuilder_control_panel
```

### 3. Setup Environment
Create a `.env` file in the root directory:
```env
MONGO_URI=mongodb://localhost:27017/dbuilder_db
FLASK_APP=app.py
FLASK_ENV=development
```

### 4. Install Dependencies
```bash
pip install -r requirements.txt
```

### 5. Run the Application
```bash
flask run
```
Access the control panel at `http://127.0.0.1:5000/`.

---

## 📁 Project Structure

```text
DBuilder_control_panel/
├── static/
│   ├── js/              # Core Drawing Logic
│   │   ├── canvas_logic.js  # Coordinate calculations & Canvas API calls
│   │   └── ui_controls.js   # Event listeners for the control panel
│   ├── css/             # Control panel styling
├── templates/           # HTML structure containing the <canvas> element
├── app.py               # Flask backend for saving/loading configs
├── requirements.txt     # Backend dependencies
└── README.md            # Documentation
```

---

## 📊 How It Works: Canvas Rendering
The project translates numerical data points into a visual representation of a garage door. 



1.  **Input:** User selects door height and width via the control panel.
2.  **Calculation:** JavaScript calculates the (x, y) coordinates for each panel and hinge.
3.  **Draw:** The `CanvasRenderingContext2D` methods (like `rect()` and `lineTo()`) render the shapes based on those calculated coordinates.

---

## 📄 License
This project is licensed under the MIT License.

---

**Developed with ❤️ by [Sundaraj0828]**
