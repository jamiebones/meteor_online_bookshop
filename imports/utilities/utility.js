export const isAdmin = (roles) => {
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].role._id === "admin") {
        return true;
      }
    }
    return false;
  };