# API Configuration

## How to Switch Between Local and Production Backend

Open `api.config.js` and change the `BACKEND_MODE` variable:

### For Local Development:
```javascript
const BACKEND_MODE = 'local'; // Uses http://localhost:5000
```

### For Production:
```javascript
const BACKEND_MODE = 'production'; // Uses https://talentboardx.onrender.com
```

That's it! The entire frontend will automatically use the selected backend URL.

## Files Using This Configuration:
- `src/utils/api.js` - Main API client (all API calls)
- `src/pages/jobseeker/ApplicationDetail.jsx` - Resume download links
