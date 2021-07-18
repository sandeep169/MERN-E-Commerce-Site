export const getAdminHomeController = (req, res) => {
    const role = req.user ? req.user.group : req.userRole;
    res.send(`yoo..its admin!\nrole: ${role}`);
};

export const getUserHomeController = (req, res) => {
    const role = req.user ? req.user.group : req.userRole;
    res.send(`yoo..its user!\nrole: ${role}`);
};

export const getGuestHomeController = (req, res) => {
    const role = req.userRole || 'guest';
    res.send(`yoo..its guest!<br>role: ${role}`);
};

