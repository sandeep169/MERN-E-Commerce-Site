// show admin-panel home

export const getAdminPanelController = (req, res) => {
    const group = req.user ? req.user.group : req.userRole;
    res.send(`yoo..its admin panel!\nrole: ${group}`);
};

