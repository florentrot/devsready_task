# Ecommerce App Setup

<img width="975" height="529" alt="image-1" src="https://github.com/user-attachments/assets/fd68afd8-3d84-496d-9e4f-a802aa31db62" />

## Versions
- **JDK:** 17  
- **Spring Boot:** 3.5.7  
- **React:** 19.2  

---

## 1. MySQL Database Setup

1. **Create database:**
```sql
CREATE SCHEMA `ecommerce_devsready`;
```
**Create app user and grant privileges:**
```sql
CREATE USER 'ecommerce_app'@'%' IDENTIFIED BY '12345678';
GRANT ALL PRIVILEGES ON ecommerce_devsready.* TO 'ecommerce_app'@'%';
FLUSH PRIVILEGES;
```
---

## 2. Backend (Spring Boot) Setup**

<img width="975" height="502" alt="image-2" src="https://github.com/user-attachments/assets/0cbf2532-94a5-4cdf-b658-8a43d75c8639" />

**VM Options**:
```bash
-Dspring.datasource.username=ecommerce_app
-Dspring.datasource.password=12345678
```

**Run and Test:**

- **Test Swagger**:
http://localhost:8080/swagger-ui.html

- **Check if products table was populated**:
```sql
select * from ecommerce_devsready.products;
```
---

## 3. Frontend Setup
**Open project in VS Code, Intellij Idea or your favourite IDE**

**Step 1: Open terminal**

**Step 2: Install dependencies**
```bash
npm install
```

**Stept 3: Check if node_modules appear in the project**

<img width="303" height="83" alt="image-4" src="https://github.com/user-attachments/assets/60f3e1c0-55f5-426b-84ec-e14764473e32" />

**Step 4: Start the application:**
```bash
npm run dev
```
*You should see something like this in terminal*

<img width="456" height="195" alt="image-3" src="https://github.com/user-attachments/assets/66d67b14-6aa0-46c8-ab2a-80415efc74ff" />

**Step 5: Open application in browser**:
Test the application

## Additional Features

*Product table additional fields*:

- Created timestamp
- Updated timestamp

**Other Features**:

- Delete product
- Swagger integration
- TailwindCSS
