# EduCade – Modular ERP Platform for Educational Institutions 🚀

EduCade is a scalable, role-based ERP system designed for schools and colleges.  
It enables institutions to onboard digitally, activate required modules on demand, and manage academic operations through a structured, permission-controlled system.

---

## 📌 Problem Statement

Educational institutions often use fragmented tools for attendance, results, fees, and communication.  
These disconnected systems create:

- Data inconsistency
- Manual administrative overhead
- Lack of modular flexibility
- Poor user experience for students and faculty

EduCade solves this by providing a **centralized, modular, pay-per-feature ERP system**.

---

## 💡 Solution Overview

EduCade follows a structured 4-phase lifecycle:

1. Institutional onboarding
2. Academic structure setup
3. Module-based activation (SaaS model)
4. Role-based operational management

It supports **dynamic hierarchy creation, module dependency logic, role-based access control, and scalable dashboards**.

---

## 🏗️ System Architecture Flow

### Phase 1 – Institutional Onboarding
- Organisation registers via minimal details
- Email/OTP verification
- Auto-creation of Admin role
- Guided setup wizard for:
  - Organisation type (School / College)
  - Academic year
  - Working hours
  - Attendance preference

---

### Phase 2 – Core Infrastructure Setup

#### Academic Hierarchy Creator
- School: Class → Division
- College: Department → Year → Division

#### Faculty Onboarding
- Bulk upload via CSV/Excel
- Manual entry option
- Invitation-based password setup

#### Student Onboarding
- Bulk upload
- Self-registration via organisation code
- Admin approval system
- Auto-generated credentials

---

### Phase 3 – Modular Marketplace (Pay-Per-Module SaaS Model)

Available Modules:
- Timetable
- Attendance
- Fees
- Results
- Counselling
- Notices
- Analytics

Features:
- Toggle-based module activation
- Dependency enforcement (e.g., Attendance requires Timetable)
- Free + trial-based subscription model
- Upgrade / downgrade flexibility
- Per-module pricing logic

---

### Phase 4 – Role-Based Operations

#### Role-Based Access Control (RBAC)
- Admin
- Coordinator / Counsellor
- Faculty
- Student

Strict permission boundaries enforced across modules.

---

### Core Functional Flows

#### Timetable System
- Slot creation
- Faculty-subject assignment
- Conflict detection
- Draft → Preview → Publish workflow

#### Attendance System
- Active lecture-based attendance button
- Admin-controlled back-dated access
- Proxy faculty assignment

#### Fees Module
- Fee structure definition
- Controlled visibility
- Student dashboard access

#### Results Module
- Faculty mark entry
- Coordinator review
- Admin publish flow

#### Counselling Module
- Slot-based booking
- Controlled chat access
- Queue-based management

#### Notices
- Multi-channel delivery (App / Email / SMS)
- Institution-wide visibility

---

## 📊 Dashboards

- Student: Timetable, attendance, notices
- Faculty: Active lecture actions
- Admin: Usage analytics, billing overview, attendance insights

---

## 🛠️ Tech Stack

Frontend:
- React.js
- HTML5
- CSS3

State Management:
- React Hooks

Database:
- MongoDB

Architecture Concept:
- Modular SaaS Model
- Role-Based Access Control (RBAC)
- Dependency-Driven Module Activation

---

## 🎯 Key Highlights

- Designed as a scalable SaaS product
- Modular marketplace-based architecture
- Dynamic academic hierarchy builder
- Conflict detection logic
- Strict role-based permission model
- Trial + subscription-based module system

---

## 🚀 Future Enhancements

- Full backend integration
- Payment gateway integration
- Cloud deployment (AWS / GCP)
- Mobile app version
- AI-based attendance analytics

---

## 👤 Author

Dhaval Prajapati  
GitHub: https://github.com/Dhaval-0511  
LinkedIn: https://linkedin.com/in/dhaval-prajapati-a62401292
