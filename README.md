# GeM AI-Audit Enterprise Suite

AI-powered platform for automated Government e-Marketplace (GeM) bid compliance verification, statutory document audit, dynamic L1 Winner allocation, and multi-vendor comparison.

## Architecture
- backend/: FastAPI, PyMuPDF, Pytesseract, Luhn Mod-36 GSTIN checksum engine.
- frontend/: React, Vite, Tailwind CSS (Jet Black, Cerulean & Neon Rose Theme), interactive SVG charts & live compliance meter.

## 12 Statutory Audit Criteria
1. Turnover Verification (CA Audited Thresholds)
2. EMD / MSME Exemption Check
3. Technical Specifications Compliance
4. ISO & Statutory Certifications
5. Past Experience Credentials
6. Document Completeness Audit
7. Financial Eligibility & Solvency
8. Product Specs & Make in India (Class-1/Class-2)
9. Warranty Scope & OEM Backing
10. Document Validity & Expiry Timeline
11. Cross-Document Data Mismatch Detection
12. Final Gate-1 Eligibility Determination

## Running Locally
Start Backend: ./start_backend.sh
Start Frontend: ./start_frontend.sh
