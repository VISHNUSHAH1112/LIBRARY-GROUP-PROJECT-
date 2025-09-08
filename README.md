
# 📖 Library Management Project

## 🚀 Introduction

This project is a **Library Management System** designed with two roles – **Admin** and **Normal User**.

---

## 🔐 Login System

* If a user tries to access without logging in, an alert will appear: *“Please login first”*.
* **Normal User** → Can only view the data (read-only access).
* **Admin** → Has full control with **CRUD operations**.

---

## 👨‍💻 Admin Role (Full Access)

* Manage **Members** (Add / Edit / Delete).
* Manage **Issues** (track which book is issued to which member).
* Manage **Fines** (apply or update fines).

---

## 👤 User Role (Limited Access)

* Can only **view the data**.
* Cannot perform any changes.

---

## 🛠️ Technologies Used

* **Frontend:** React.js
* **State Management:** Redux Toolkit (all data stored in the Redux store).
* **Backend:** JSON Server / API (for fetching and updating data).

---

## 🔄 Project Flow

1. User/Admin → Login.
2. Role is verified.
3. If **User** → Only view data.
4. If **Admin** → Full access to manage Members, Issues, and Fines.
5. **Redux** → Handles global state, making data accessible across all components.

---

## 🔮 Future Improvements

* Implement secure authentication system (JWT or similar).
* Add search and filter functionality.


