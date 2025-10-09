module.exports = function checkRole(roles = []) {
    return (req, res, next) => {
      try {
        if (!req.user) {
          return res.status(401).json({ message: "Unauthorized" });
        }
  
        if (!roles.includes(req.user.role)) {
          return res.status(403).json({ message: "Forbidden: Not enough permissions" });
        }
  
        next();
      } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
      }
    
    };
  };
