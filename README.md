# Ecommerce App Setup
![alt text](image-1.png)

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
![alt text](image-2.png)
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

![alt text](image-4.png)

**Step 4: Start the application:**
```bash
npm run dev
```
*You should see something like this in terminal*

![alt text](image-3.png)

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