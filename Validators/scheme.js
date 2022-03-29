const addValidator = (req, res, next) => {
    const { title, description, category, mode, link, state } = req.body;

    if (!title) {
        return res.json({ status: "error", error: "Title is required" });
    }
    if (!description) {
        return res.json({ status: "error", error: "Description is required" });
    }
    if (!category) {
        return res.json({ status: "error", error: "Category is required" });
    }
    if (
        category != "general" &&
        category != "women" &&
        category != "student" &&
        category != "pc" &&
        category != "farmer"
    ) {
        return res.json({
            status: "error",
            error: "Invalid category type. Valid values: general, women, student, pc, farmer",
        });
    }
    if (!mode) {
        return res.json({
            status: "error",
            error: "Applying mode is required",
        });
    }
    if (mode != "offline" && mode != "online") {
        return res.json({
            status: "error",
            error: "Invalid applying mode. Valid values: offline, online",
        });
    }
    if (!link) {
        return res.json({
            status: "error",
            error: "Scheme's info link is required",
        });
    }
    if (!state) {
        return res.json({
            status: "error",
            error: "State is required. Valid values: central or state name",
        });
    }
    next();
};

const updateValidator = (req, res, next) => {
    const { schemeId, category, mode } = req.body;

    if (!schemeId) {
        return res.json({
            status: "error",
            error: "schemeId is required",
        });
    }

    if (
        category &&
        category != "general" &&
        category != "women" &&
        category != "student" &&
        category != "pc" &&
        category != "farmer"
    ) {
        return res.json({
            status: "error",
            error: "Invalid category type. Valid values: general, women, student, pc, farmer",
        });
    }

    if (mode && mode != "offline" && mode != "online") {
        return res.json({
            status: "error",
            error: "Invalid applying mode. Valid values: offline, online",
        });
    }
    next();
};

const deleteValidator = (req, res, next) => {
    const { schemeId } = req.body;

    if (!schemeId) {
        return res.json({
            status: "error",
            error: "schemeId is required",
        });
    }
    next();
};

const getValidator = (req, res, next) => {
    const { schemeId } = req.body;

    if (!schemeId) {
        return res.json({
            status: "error",
            error: "schemeId is required",
        });
    }
    next();
};

const getAllValidator = (req, res, next) => {
    const { category } = req.body;

    if (
        category &&
        category != "general" &&
        category != "women" &&
        category != "student" &&
        category != "pc" &&
        category != "farmer"
    ) {
        return res.json({
            status: "error",
            error: "Invalid category type. Valid values: general, women, student, pc, farmer",
        });
    }

    next();
};

module.exports = {
    addValidator,
    updateValidator,
    deleteValidator,
    getValidator,
    getAllValidator,
};
