# OmniLust - Production-Grade Travel & Hotel Listing Architecture

**OmniLust** is a robust, full-stack monolithic web application designed for seamless hotel listings, property exploration, and dynamic review ecosystems—architected with structural similarities to industry platforms like Airbnb and MakeMyTrip. 

Built entirely **from scratch without using any AI code-generation tools**, this project serves as an authentic showcase of deep core engineering principles, secure multi-party authentication, rigorous server-side data validation, and clean server-side rendering. Every single route, custom middleware, database model, and operational block was handcrafted to mirror corporate-level backend systems using fundamental engineering logic.

---

## 🚀 Key Architectural & Core Engineering Features

### 🏢 Model-View-Controller (MVC) & RESTful Design
* **Decoupled Business Logic:** Enforced a clean separation of concerns by partitioning data modeling, controller business logic, and UI layout rendering blocks into a strict **MVC Architecture**.
* **REST Compliance:** Adhered strictly to **RESTful API design principles** using proper semantic HTTP methods (`GET`, `POST`, `PUT`, `DELETE`) mapping cleanly to standard CRUD operations.

### 🛡️ Enterprise-Grade Authentication & Authorization
* **Stateful Sessions:** Implemented manual session management natively via `express-session` paired with structured cryptographic cookie handling (`cookie-parser`).
* **Secure Lifecycles:** Managed user onboarding, password hashing, and login/logout state tracking using `passport` and `passport-local` for seamless encryption and deserialization pipelines.
* **Granular RBAC Middleware:** Engineered custom **Authorization Middleware** blocks to handle asset restrictions, ensuring only verified property owners have permissions to alter or remove listings.

### 🗺️ Geocoding & Geospatial Map Integration
* **Forward Geocoding Engine:** Integrated the `@googlemaps/google-maps-services-js` backend client wrapper to programmatically convert text-based inputs into precise geographical spatial vectors.
* **GeoJSON Storage:** Persisted locations natively inside MongoDB as **GeoJSON 'Point' primitives** to enable seamless front-end interactive rendering.

### 📂 Cloud-Native Media Management & Multi-Part Forms
* **Binary File Streaming:** Configured multi-part form parsing middleware using `multer` to securely catch asset streaming directly from forms.
* **CDN Pipeline:** Integrated third-party cloud hosting pipelines using **Cloudinary** to offload image hosting, optimization, and media delivery.

### 🩺 Strict Validation & Centralized Error Hooks
* **Payload Validation Hooks:** Built strict, schema-level incoming parameter checking via **Joi** to intercept and reject malformed data arrays before hitting database models.
* **Robust Global Catch:** Configured a centralized **Express Error Handling Middleware** chain extending a custom `ExpressError` utility wrapper to elegant capture unexpected server anomalies and custom `404 Not Found` wildcards.

---

## 🛠️ The Tech Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Backend Core** | Node.js, Express.js, Express Router, Hoppscotch (API Lifecycle Testing) |
| **Database & ODM** | MongoDB Atlas, Mongoose (Models, Validations, and Deep `.populate()` Queries) |
| **Session & Auth** | Passport.js, Passport-Local, Express-Session, Cookie-Parser |
| **Frontend/Templating** | EJS (Embedded JavaScript), EJS-Mate (Layout Engine), Bootstrap 5, FontAwesome, Google Icons, Custom HTML5/CSS3/JS |
| **Storage & Services** | Cloudinary, Multer, Google Maps API, Backend-as-a-Service (BaaS) integrations |
| **Utilities & Testing** | Joi, Method-Override, Connect-Flash, Faker (Data Seeding), Figlet, Custom Logger |
| **Deployment** | Render / Production Web Service hosting |

---

## ⚡ Technical Highlights (Under the Hood)

### 1. Context Injection Middleware
Leveraged native Express request-response loops to dynamically inject operational flash banners (`success`/`error`) and logged-in user contextual data (`req.user`) straight into the global EJS layout `res.locals` object. This maintains UI state cohesion across page updates seamlessly.

### 2. Deep Relational Querying
Optimized database access patterns using Mongoose's relational parsing capabilities. Sub-document population pipelines are chain-loaded defensively to present detailed profiles securely:
```javascript
const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
```

### 3. REST Emulation over Legacy Forms
Overcame standard HTML `<form>` constraints (`GET`/`POST` limit) by leveraging `method-override` to smoothly catch `_method=PUT` or `_method=DELETE` queries, preventing route duplication in controllers.

---

## 📈 Dev Footprint & Quality Standards

* **100% Handcoded:** No AI assistants, template builders, or automated code completion tools were utilized. Every line of logic represents deliberate engineering decisions and genuine problem-solving.
* **Realistic Seeding Automation:** Engineered dedicated seeding scripts built around `faker` to programmatically load rich datasets, ensuring UI layouts, responsive breakpoints, and query speeds hold up to high asset densities.
* **Defensive Web Security:** Safeguarded the pipeline against unauthorized cross-site data injections by isolating form structures, deploying schema validations via Joi, and utilizing strict session authorization tokens.

---

### 💼 HR & Recruiting Summary
This platform demonstrates a comprehensive grip on real-world system design. I am deeply comfortable constructing model schemas, scaling stateful route middleware, managing database lookups, securing application states, and integrating cloud engines. I am ready to step onto an engineering floor on Day 1 and commit production-grade code to your pipeline.

*Feel free to explore the repository or contact me directly for a detailed technical walkthrough of the architectural source code!*
