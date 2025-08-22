# 📝 Quora – Backend Project  

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

---

## 🚀 Features  

- 👤 **User Management** – Registration, Login (JWT), Profile View & Update  
- ❓ **Questions** – Create, Read, Update, Delete (CRUD) with Tags & Filters  
- 💬 **Answers** – Post, Edit, Delete answers (with authorization checks)  
- 🔒 **Authentication & Authorization** – Secure routes with JWT Bearer tokens  
- ⭐ **Credit Score System** –  
  - +200 credits for posting an answer  
  - -100 credits for posting a question  
  - No negative credits (user can’t post if credits = 0)  
- 📅 **Timestamps & Sorting** – Questions & answers sorted by recency  
- 🛠 **Postman Collection** for API Testing  

---

## 🏗️ Tech Stack  

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose ODM)  
- **Authentication:** JWT (Bearer Token)  
- **Security:** Bcrypt (Password Hashing)  
- **Testing Tool:** Postman  


✅ **Success Response**
```json
{
  "status": true,
  "data": { ... }
}
